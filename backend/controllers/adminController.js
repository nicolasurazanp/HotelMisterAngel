const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  const users = await User.find({}, '-password');
  res.json(users);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  delete updateData.password;

  const updated = await User.findByIdAndUpdate(id, updateData, { new: true });
  res.json(updated);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ msg: 'Usuario eliminado' });
};
