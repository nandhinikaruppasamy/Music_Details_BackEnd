const mongoose = require('mongoose');
const Playlist = require('./Playlist');

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  playlist_id:{
        type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist'
  },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  duration: { type: String, required: true },
  url: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Song', SongSchema);
