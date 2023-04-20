const express = require('express');
const router = express.Router();
const { sql } = require('../db.js');

router.get('/', async (req, res) => {
    try {
        const request = new sql.Request(pool);
        const result = await request.query('SELECT * FROM staff');
    
        res.status(200).json(result.recordset);
      } catch (err) {
        console.error('Error getting staff:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.post('/sync', async (req, res) => {
    try {
        const records = req.body.records;
        const request = new sql.Request(pool);
    
        for (const record of records) {
          const query = `INSERT INTO staff (username, password, firstName, lastName, gender, email, role, facilityID)
                         VALUES (@username, @password, @firstName, @lastName, @gender, @email, @role, @facilityID)`;
    
          request.input('username', sql.NVarChar, record.username);
          request.input('password', sql.NVarChar, record.password);
          request.input('firstName', sql.NVarChar, record.firstName);
          request.input('lastName', sql.NVarChar, record.lastName);
          request.input('gender', sql.NVarChar, record.gender);
          request.input('email', sql.NVarChar, record.email);
          request.input('role', sql.NVarChar, record.role);
          request.input('facilityID', sql.Int, record.facilityID);
    
          await request.query(query);
        }
    
        res.status(200).json({ message: 'Staff synced successfully' });
      } catch (err) {
        console.error('Error syncing staff:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports = router;
