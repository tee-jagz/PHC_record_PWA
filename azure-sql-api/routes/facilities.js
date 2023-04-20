const express = require('express');
const router = express.Router();
const { sql } = require('../db.js');

router.get('/', async (req, res) => {
    try {
        const request = new sql.Request(pool);
        const result = await request.query('SELECT * FROM facility');
    
        res.status(200).json(result.recordset);
      } catch (err) {
        console.error('Error getting facilities:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.post('/sync', async (req, res) => {
    try {
        const records = req.body.records;
        const request = new sql.Request(pool);
    
        for (const record of records) {
          const query = `INSERT INTO facility (Name, State, LGA, Street, Email)
                         VALUES (@Name, @State, @LGA, @Street, @Email)`;
    
          request.input('Name', sql.NVarChar, record.Name);
          request.input('State', sql.NVarChar, record.State);
          request.input('LGA', sql.NVarChar, record.LGA);
          request.input('Street', sql.NVarChar, record.Street);
          request.input('Email', sql.NVarChar, record.Email);
    
          await request.query(query);
        }
    
        res.status(200).json({ message: 'Facilities synced successfully' });
      } catch (err) {
        console.error('Error syncing facilities:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports = router;
