const express = require('express');
const mongoose = require('mongoose'); 
const Playlist = require('../models/Playlist');
const Song = require('../models/Song');

const router = express.Router();

router.get('/read', async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('songs'); 
    res.json(playlists);
  } catch (err) {
    console.error('Error fetching playlists:', err);
    res.status(500).send('Server error');
  }
});

router.post('/add', async (req, res) => {
  const { name, description, songIds } = req.body;
  try {
    const playlist = new Playlist({
      name,
      description,
      songs: songIds,
    });

    await playlist.save();
    res.json(playlist);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, songIds } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid playlist ID' });
  }
  try {
    let playlist = await Playlist.findById(id);
    if (!playlist) {
      return res.status(404).json({ msg: 'Playlist not found' });
    }

    playlist = await Playlist.findByIdAndUpdate(
      id,
      { $set: { name, description, songs: songIds } },
      { new: true }
    );

    res.json(playlist);
  } catch (err) {
    console.error('Error updating playlist:', err); 
    res.status(500).send('Server error');
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ msg: 'Playlist not found' });
    }
    await playlist.remove();
    res.json({ msg: 'Playlist removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
