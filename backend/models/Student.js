const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  aStudentId: { type: String, required: true, unique: true },
  vRollNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  vLibraryCode: String,
  vName: String,
  vProgram: String,
  vBranch: String,
  vDOB: Date,
  vBloodGroup: String,
  vMobile: String,
  vFather: String,
  vAddress1: String,
  vAddress2: String,
  vCity: String,
  vState: String,
  vPIN: String,
  vExpiry: Date,
  encryptedQR: { type: String }, 
  dtCreatedOn: { type: Date, default: Date.now },
  dtUpdatedOn: { type: Date, default: Date.now },
  tokens: [{
    token: { type: String, required: true }
  }]
});

studentSchema.methods.generateAuthToken = async function () {
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({ _id: this._id.toString(), role: 'student' }, process.env.JWT_SECRET);
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

module.exports = mongoose.model('Student', studentSchema);
