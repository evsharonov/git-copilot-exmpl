// src/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../path/to/your/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-database-name.firebaseio.com'
});

const db = admin.firestore();

module.exports = db;

// src/routes/tables.js
const express = require('express');
const router = express.Router();
const db = require('../firebase');

const TableController = {
    reserveTable: async (req, res) => {
        const { tableId, visitors, date, time } = req.body;
        try {
            const reservation = {
                tableId,
                visitors,
                date,
                time
            };
            const docRef = await db.collection('reservations').add(reservation);
            res.status(201).send(`Reserved table ${tableId} for ${visitors} visitors on ${date} at ${time} with reservation ID: ${docRef.id}`);
        } catch (error) {
            res.status(500).send('Error reserving table');
        }
    },
    deleteReservation: async (req, res) => {
        const { reservationId } = req.params;
        try {
            await db.collection('reservations').doc(reservationId).delete();
            res.status(200).send(`Deleted reservation with ID: ${reservationId}`);
        } catch (error) {
            res.status(500).send('Error deleting reservation');
        }
    }
};

// Define routes
router.post('/tables/reserve', TableController.reserveTable);
router.delete('/tables/reservation/:reservationId', TableController.deleteReservation);

module.exports = router;