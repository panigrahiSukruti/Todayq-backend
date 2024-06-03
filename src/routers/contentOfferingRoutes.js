const express = require('express');
const router = express.Router();
const ContentOffering = require('../models/ContentOffering.js');

// Create a new content offering
router.post('/', async (req, res) => {
  try {
    const newContentOffering = new ContentOffering(req.body);
    const savedContentOffering = await newContentOffering.save();
    res.status(201).json(savedContentOffering);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all content offerings
router.get('/', async (req, res) => {
  try {
    const contentOfferings = await ContentOffering.find();
    res.status(200).json(contentOfferings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific content offering by ID
router.get('/:id', async (req, res) => {
  try {
    const contentOffering = await ContentOffering.findById(req.params.id);
    if (!contentOffering) return res.status(404).json({ message: 'Content offering not found' });
    res.status(200).json(contentOffering);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a content offering by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedContentOffering = await ContentOffering.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedContentOffering) return res.status(404).json({ message: 'Content offering not found' });
    res.status(200).json(updatedContentOffering);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a content offering by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedContentOffering = await ContentOffering.findByIdAndDelete(req.params.id);
    if (!deletedContentOffering) return res.status(404).json({ message: 'Content offering not found' });
    res.status(200).json({ message: 'Content offering deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
