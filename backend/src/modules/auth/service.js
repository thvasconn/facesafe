const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, ActiveSession } = require('../../models');

const MAX_SESSIONS = Number(process.env.MAX_ACTIVE_SESSIONS_PER_USER || 3);

function signAccessToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, clinic: user.clinic },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
  );
}

function signRefreshToken(user, sessionId) {
  return jwt.sign(
    { id: user._id, sessionId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
  );
}

async function register({ name, email, password, professionalCredentials }) {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('E-mail já cadastrado');
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    passwordHash,
    professionalCredentials,
    status: 'pending_verification', // credencial profissional ainda não verificada
  });

  return user;
}

/**
 * Login: cria uma ActiveSession, respeitando o limite de sessões simultâneas
 * (seção 6.2 do levantamento — anti-scraping / controle de acesso).
 * Se o limite for excedido, revoga a sessão mais antiga.
 */
async function login({ email, password, deviceInfo, ip }) {
  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user) {
    const err = new Error('Credenciais inválidas');
    err.status = 401;
    throw err;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    const err = new Error('Credenciais inválidas');
    err.status = 401;
    throw err;
  }

  const activeSessions = await ActiveSession.find({ user: user._id, revokedAt: null }).sort({
    lastActivityAt: 1,
  });

  if (activeSessions.length >= MAX_SESSIONS) {
    const oldest = activeSessions[0];
    oldest.revokedAt = new Date();
    await oldest.save();
  }

  // cria a sessão primeiro pra ter o sessionId, depois assina o refresh token com ele
  const session = await ActiveSession.create({
    user: user._id,
    deviceInfo,
    ip,
    refreshTokenHash: 'pending',
  });

  const refreshToken = signRefreshToken(user, session._id);
  session.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  await session.save();

  const accessToken = signAccessToken(user);

  user.lastLoginAt = new Date();
  await user.save();

  return { accessToken, refreshToken, user };
}

/**
 * Recebe um refresh token, valida contra o hash guardado na sessão,
 * e emite um novo access token. Não gira o refresh token por padrão
 * (rotação pode ser adicionada depois se quiser mais segurança).
 */
async function refresh({ refreshToken }) {
  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    const e = new Error('Refresh token inválido ou expirado');
    e.status = 401;
    throw e;
  }

  const session = await ActiveSession.findOne({
    _id: payload.sessionId,
    user: payload.id,
    revokedAt: null,
  }).select('+refreshTokenHash');

  if (!session) {
    const err = new Error('Sessão revogada ou inexistente');
    err.status = 401;
    throw err;
  }

  const matches = await bcrypt.compare(refreshToken, session.refreshTokenHash);
  if (!matches) {
    const err = new Error('Refresh token inválido');
    err.status = 401;
    throw err;
  }

  const user = await User.findById(payload.id);
  session.lastActivityAt = new Date();
  await session.save();

  return { accessToken: signAccessToken(user) };
}

async function logout({ refreshToken }) {
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    await ActiveSession.findByIdAndUpdate(payload.sessionId, { revokedAt: new Date() });
  } catch (err) {
    // token já inválido/expirado — não há o que revogar, segue o jogo
  }
}

module.exports = { register, login, refresh, logout };
