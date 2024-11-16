// src/routes/tables.js
const express = require('express');
const router = express.Router();

// Example controller for table operations
const TableController = {
    reserveTable: (req, res) => {
        const { tableId, visitors, date, time } = req.body;
        // Logic to reserve a table
        res.send(`Reserve table ${tableId} for ${visitors} visitors on ${date} at ${time}`);
    },
    deleteReservation: (req, res) => {
        const { reservationId } = req.params;
        // Logic to delete a reservation
        res.send(`Delete reservation with ID: ${reservationId}`);
    }
};

// Define routes
router.post('/tables/reserve', TableController.reserveTable);
router.delete('/tables/reservation/:reservationId', TableController.deleteReservation);

module.exports = router;