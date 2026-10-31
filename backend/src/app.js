const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./modules/auth/routes');
const regionsRoutes = require('./modules/regions/routes');
const contentRoutes = require('./modules/content/routes');
const documentsRoutes = require('./modules/documents/routes');
const consentRecordsRoutes = require('./modules/documents/consentRoutes');
const subscriptionsRoutes = require('./modules/billing/subscriptionsRoutes');
const webhooksRoutes = require('./modules/billing/webhooksRoutes');
const paymentsRoutes = require('./modules/billing/paymentsRoutes');
const sosRoutes = require('./modules/sos/routes');
const adminRoutes = require('./modules/admin/routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/auth', authRoutes);
app.use('/regions', regionsRoutes);
app.use('/content', contentRoutes);
app.use('/documents', documentsRoutes);
app.use('/consent-records', consentRecordsRoutes);
app.use('/subscriptions', subscriptionsRoutes);
app.use('/webhooks', webhooksRoutes);
app.use('/payments', paymentsRoutes);
app.use('/sos', sosRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandler);

module.exports = app;
