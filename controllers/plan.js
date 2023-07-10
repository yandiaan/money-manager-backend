const PlanSchema = require("../models/PlanModel");

exports.addPlan = async (req, res) => {
  const { category, amount } = req.body;

  const plan = new PlanSchema({
    category,
    amount,
    userId: req.user.userId
  });

  try {
    // Validasi
    if (!category || !amount) {
      return res.status(400).json({ message: 'Category and amount are required!' });
    }

    await plan.save();
    res.status(200).json({ message: 'Plan added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await PlanSchema.find({ userId: req.user.userId });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.deletePlan = async (req, res) => {
  const { id } = req.params;
  PlanSchema.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: 'Plan deleted' });
    })
    .catch(() => {
      res.status(500).json({ message: 'Server Error' });
    });
};
