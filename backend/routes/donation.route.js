const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donation.controller');

router.get('/', donationController.getDonations);
router.get('/:id', donationController.getDonationById);
router.post('/', donationController.createDonation);
router.delete('/:id', donationController.deleteDonation);

module.exports = router;
