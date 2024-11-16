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

        // Input validation
        if (!tableId || !visitors || !date || !time) {
            return res.status(400).send('Missing required fields');
        }

        // Additional validation for input types
        if (typeof tableId !== 'string' || typeof visitors !== 'number' || typeof date !== 'string' || typeof time !== 'string') {
            return res.status(400).send('Invalid input types');
        }

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

        // Input validation
        if (!reservationId) {
            return res.status(400).send('Missing reservation ID');
        }

        try {
            await db.collection('reservations').doc(reservationId).delete();
            res.status(200).send(`Deleted reservation with ID: ${reservationId}`);
        } catch (error) {
            res.status(500).send('Error deleting reservation');
        }
    }
};
updateReservation: async (req, res) => {
    const { reservationId } = req.params;
    const { tableId, visitors, date, time } = req.body;
    
    // Validate visitors count
    if (visitors < 1 || visitors > 9) {
        return res.status(400).send('Visitors count must be between 1 and 9');
    }

    // Validate time format and range
    const timeRegex = /^([0-9]{2}):([0-9]{2})$/;
    if (!timeRegex.test(time)) {
        return res.status(400).send('Invalid time format');
    }
    // Validate time slots (30-minute intervals)
    if (minutes !== 0 && minutes !== 30) {
        return res.status(400).send('Time must be in 30-minute intervals');
    }
    const [hours, minutes] = time.split(':').map(Number);
    if (hours < 8 || (hours === 21 && minutes > 30) || hours > 21) {
        return res.status(400).send('Time must be between 08:00 AM and 09:30 PM');
    }
    // Input validation
    if (!reservationId || !tableId || !visitors || !date || !time) {
        return res.status(400).send('Missing required fields');
    }

    // Additional validation for input types
    if (typeof reservationId !== 'string' || typeof tableId !== 'string' || typeof visitors !== 'number' || typeof date !== 'string' || typeof time !== 'string') {
        return res.status(400).send('Invalid input types');
    }

    try {
        const reservation = {
            tableId,
            visitors,
            date,
            time
        };
        await db.collection('reservations').doc(reservationId).update(reservation);
        res.status(200).send(`Updated reservation with ID: ${reservationId}`);
    } catch (error) {
        res.status(500).send('Error updating reservation');
    }
}

// Define routes
router.post('/tables/reserve', TableController.reserveTable);
router.delete('/tables/reservation/:reservationId', TableController.deleteReservation);

module.exports = router;