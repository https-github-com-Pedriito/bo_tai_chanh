const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');

// API pour récupérer les items du menu
router.get('/', async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});

// API pour créer un nouvel item
router.post('/', async (req, res) => {
  const newItem = new MenuItem(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

// API pour modifier un item
router.put('/:id', async (req, res) => {
  const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedItem);
});

// API pour supprimer un item
router.delete('/:id', async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;