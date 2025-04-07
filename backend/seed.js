const mongoose = require('mongoose');
const Student = require('./models/Student'); // Adjust path if needed
const { encrypt } = require('./utils/crypto'); // Your encryption module

require('dotenv').config();

const sampleStudents = [
  {
    aStudentId: '102203176',
    vRollNo: 'BT22CSE102',
    email: 'arshpreet@thapar.edu',
    vLibraryCode: 'LIB12345',
    vName: 'Arshpreet Singh',
    vProgram: 'B.Tech',
    vBranch: 'Computer Science',
    vDOB: new Date('2003-05-14'),
    vBloodGroup: 'B+',
    vMobile: '9876543210',
    vFather: 'Sukhdev Singh',
    vAddress1: '123, Sector 17',
    vAddress2: 'Near Lake',
    vCity: 'Patiala',
    vState: 'Punjab',
    vPIN: '147001',
    vExpiry: new Date('2026-06-30'),
  },
  {
    aStudentId: '102203177',
    vRollNo: 'BT22CSE103',
    email: 'shivbajaj@thapar.edu',
    vLibraryCode: 'LIB12346',
    vName: 'Shiv Bajaj',
    vProgram: 'B.Tech',
    vBranch: 'Computer Science',
    vDOB: new Date('2003-07-22'),
    vBloodGroup: 'O+',
    vMobile: '9876543211',
    vFather: 'Ravinder Bajaj',
    vAddress1: '221B, Baker Street',
    vAddress2: '',
    vCity: 'Patiala',
    vState: 'Punjab',
    vPIN: '147002',
    vExpiry: new Date('2026-06-30'),
  }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("📦 Connected to MongoDB");

    await Student.deleteMany({});
    console.log("🧹 Cleared old student data");

    for (const student of sampleStudents) {
      const encryptedQR = encrypt(JSON.stringify({
        aStudentId: student.aStudentId,
        vRollNo: student.vRollNo,
        email: student.email
      }));

      const newStudent = new Student({
        ...student,
        tokens: [],
        dtCreatedOn: new Date(),
        dtUpdatedOn: new Date(),
        encryptedQR
      });

      await newStudent.save();
      console.log(`✅ Inserted: ${student.vName}`);
    }

    console.log("🌱 Database seeding complete");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  }
}

seedDB();
