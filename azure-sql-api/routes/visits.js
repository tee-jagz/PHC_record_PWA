const express = require('express');
const router = express.Router();
const { sql } = require('../db.js');

router.get('/', async (req, res) => {
    try {
        const request = new sql.Request(pool);
        const result = await request.query('SELECT * FROM visits');
    
        res.status(200).json(result.recordset);
      } catch (err) {
        console.error('Error getting visits:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.post('/sync', async (req, res) => {
    try {
        const records = req.body.records;
        const request = new sql.Request(pool);
    
        for (const record of records) {
          const query = `INSERT INTO visits (patientId, doctorId, facilityId, appointmentDate, appointmentTime, reason, status, conditionId, dateOfDiagnosis, dateOfRecovery, visitNotes)
                         VALUES (@patientId, @doctorId, @facilityId, @appointmentDate, @appointmentTime, @reason, @status, @conditionId, @dateOfDiagnosis, @dateOfRecovery, @visitNotes)`;
    
          request.input('patientId', sql.Int, record.patientId);
          request.input('doctorId', sql.Int, record.doctorId);
          request.input('facilityId', sql.Int, record.facilityId);
          request.input('appointmentDate', sql.Date, record.appointmentDate);
          request.input('appointmentTime', sql.Time, record.appointmentTime);
          request.input('reason', sql.NVarChar, record.reason);
          request.input('status', sql.NVarChar, record.status);
          request.input('conditionId', sql.Int, record.conditionId);
          request.input('dateOfDiagnosis', sql.Date, record.dateOfDiagnosis);
          request.input('dateOfRecovery', sql.Date, record.dateOfRecovery);
          request.input('visitNotes', sql.NVarChar, record.visitNotes);
    
          await request.query(query);
        }
    
        res.status(200).json({ message: 'Visits synced successfully' });
      } catch (err) {
        console.error('Error syncing visits:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports = router;
