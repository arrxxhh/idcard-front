const Student = require('../models/Student');
const { encrypt } = require('../utils/crypto');
const QRCode = require('qrcode');

const getStudentCard = async (req, res) => {
  try {
    const student = await Student.findOne({ aStudentId: req.params.id });
    if (!student) return res.status(404).json({ error: "Student not found" });

    const payload = JSON.stringify({ id: student.aStudentId, ts: Date.now() });
    const encrypted = encrypt(payload);
    const qr = await QRCode.toDataURL(encrypted);

    res.json({ student, qr });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { getStudentCard };
