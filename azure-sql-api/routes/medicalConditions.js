const express = require('express');
const router = express.Router();
const { sql } = require('../db.js');

router.get('/', async (req, res) => {
    try {
        const request = new sql.Request(pool);
        const result = await request.query('SELECT * FROM medicalConditions');
    
        res.status(200).json(result.recordset);
      } catch (err) {
        console.error('Error getting medical conditions:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.post('/sync', async (req, res) => {
    try {
        const records = req.body.records;
        const request = new sql.Request(pool);
    
        for (const record of records) {
          const query = `INSERT INTO medicalConditions (name, description, severity, treatment)
                         VALUES (@name, @description, @severity, @treatment)`;
    
          request.input('name', sql.NVarChar, record.name);
          request.input('description', sql.NVarChar, record.description);
          request.input('severity', sql.NVarChar, record.severity);
          request.input('treatment', sql.NVarChar, record.treatment);
    
          await request.query(query);
        }
    
        res.status(200).json({ message: 'Medical Conditions synced successfully' });
      } catch (err) {
        console.error('Error syncing medical conditions:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports = router;
