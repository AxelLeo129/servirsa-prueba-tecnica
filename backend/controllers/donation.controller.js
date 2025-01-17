const Donation = require('../models/donation.model');

exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.findAll();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving donations', error });
  }
};

exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findByPk(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving donation', error });
  }
};

exports.createDonation = async (req, res) => {
  try {
    const { date, donor, amount, budget_item_id, project_id } = req.body;
    const donation = await Donation.create({ date, donor, amount, budget_item_id, project_id });
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating donation', error });
  }
};

exports.deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByPk(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    await donation.destroy();
    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting donation', error });
  }
};
