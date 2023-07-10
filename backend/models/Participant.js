const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Participant = mongoose.model('Participant', ParticipantSchema);

module.exports = Participant;
