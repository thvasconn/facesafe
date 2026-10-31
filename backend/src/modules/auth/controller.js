const authService = require('./service');

async function register(req, res, next) {
  try {
    const { name, email, password, professionalCredentials } = req.body;
    const user = await authService.register({ name, email, password, professionalCredentials });
    return res.status(201).json({
      id: user._id,
      email: user.email,
      status: user.status,
    });
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const deviceInfo = req.headers['user-agent'];
    const ip = req.ip;

    const { accessToken, refreshToken, user } = await authService.login({
      email,
      password,
      deviceInfo,
      ip,
    });

    return res.json({
      accessToken,
      refreshToken, // o app guarda isso em secure storage (Keychain/Keystore), não em cookie
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    return next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    const { accessToken } = await authService.refresh({ refreshToken });
    return res.json({ accessToken });
  } catch (err) {
    return next(err);
  }
}

async function logout(req, res, next) {
  try {
    const { refreshToken } = req.body;
    await authService.logout({ refreshToken });
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = { register, login, refresh, logout };
