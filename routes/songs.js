const express = require('express');
const mongoose = require('mongoose'); 
const Song = require('../models/Song');
const Playlist = require('../models/Playlist'); 

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { title, playlist_id, artist, album, duration, url } = req.body;

    const playlist = await Playlist.findById(playlist_id);
    if (!playlist) {
      return res.status(400).json({ msg: 'Playlist not found' });
    }
    const song = new Song({ title, playlist_id, artist, album, duration, url });
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/read', async (req, res) => {
  try {
     const pid=req.query.pid;
     if(!pid)

{
  return res.status(400).json({ msg: 'Playlist ID is required' });

}   else{   const songs = await Song.find({playlist_id:pid});
    res.json(songs);}
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid song ID' });
  }

  try {
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ msg: 'Song not found' });
    }
    await song.remove();
    res.json({ msg: 'Song removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

 module.exports = router;
