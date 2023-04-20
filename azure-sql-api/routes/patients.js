const express = require('express');
const router = express.Router();
const { sql } = require('../db.js');

router.get('/', async (req, res) => {
  try {
    const request = new sql.Request(pool);
    const result = await request.query('SELECT * FROM patients');
    res.json(result.recordset);
    } catch (err) {
    console.error('Error fetching patients:', err);
    res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/sync', async (req, res) => {
    console.log(req.body.records)
    try {
        const records = req.body.records;
        console.log(records);

        for (const record of records) {
          console.log(record);
            const request = new sql.Request(pool);
            const query = `INSERT INTO patients (firstName, lastName, gender, dob, address, phoneNo, email, maritalStatus, occupation, bloodGroup, genotype, nextOfKin, facilityID)
                        VALUES (@firstName, @lastName, @gender, @dob, @address, @phoneNo, @email, @maritalStatus, @occupation, @bloodGroup, @genotype, @nextOfKin, @facilityID)`;

            request.input('firstName', sql.NVarChar, record.firstName);
            request.input('lastName', sql.NVarChar, record.lastName);
            request.input('gender', sql.NVarChar, record.gender);
            request.input('dob', sql.Date, record.dob);
            request.input('address', sql.NVarChar, record.address);
            request.input('phoneNo', sql.NVarChar, record.phoneNo);
            request.input('email', sql.NVarChar, record.email);
            request.input('maritalStatus', sql.NVarChar, record.maritalStatus);
            request.input('occupation', sql.NVarChar, record.occupation);
            request.input('bloodGroup', sql.NVarChar, record.bloodGroup);
            request.input('genotype', sql.NVarChar, record.genotype);
            request.input('nextOfKin', sql.NVarChar, record.nextOfKin);
            request.input('facilityID', sql.Int, record.facilityID);

            try {
                await request.query(query);
            } catch (err) {
                console.error('Error syncing a patient record:', err, 'Record:', record);
                throw err;
            }
        }

        res.status(200).json({ message: 'Patients synced successfully' });
    } catch (err) {
        console.error('Error syncing patients:', err);
        res.status(500).json({ error: 'Internal Server Error', errorMessage: err.message || err.toString() });
    }
});

module.exports = router;
