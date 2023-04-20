const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const { connect } = require('./db.js');
const patientsRoutes = require('./routes/patients');
const visitsRoutes = require('./routes/visits');
const medicalConditionsRoutes = require('./routes/medicalConditions');
const staffRoutes = require('./routes/staff');
const facilitiesRoutes = require('./routes/facilities');

connect()
  .then(() => {
    app.use(cors());
    app.use(express.json());

    // Serve your static files
    app.use(express.static(path.join(__dirname, 'public')));

    // Fallback to serve index.html for non-API routes
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.use('/api/patients', patientsRoutes);
    app.use('/api/visits', visitsRoutes);
    app.use('/api/medicalConditions', medicalConditionsRoutes);
    app.use('/api/staff', staffRoutes);
    app.use('/api/facilities', facilitiesRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
  });
