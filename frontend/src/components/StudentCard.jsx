import React, { useEffect, useState, useRef } from 'react';
import Barcode from 'react-barcode';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const StudentCard = ({ studentId }) => {
  const [data, setData] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/students/card/${studentId}`)
      .then(res => setData(res.data))
      .catch(err => console.error("Error fetching student data", err));
  }, [studentId]);

  const handleDownload = () => {
    if (!data || !cardRef.current) return;
    html2pdf().from(cardRef.current).save(`${data.student.vName}_IDCard.pdf`);
  };

  if (!data) return <div className="text-center mt-10 text-red-600">Loading...</div>;

  const { student, qr } = data;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      {/* ID CARD */}
      <div
        ref={cardRef}
        className="w-[700px] h-[240px] bg-white rounded-lg shadow-lg border border-gray-300 flex overflow-hidden"
      >
        {/* FRONT SIDE */}
        <div className="w-1/2 p-4 border-r border-gray-200 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <img
              src="/logo.png"
              alt="TIET Logo"
              className="w-14 h-14 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/48";
              }}
            />
            <div className="w-14 h-14 bg-gray-200 rounded border border-gray-400" />
          </div>
          <div className="text-center">
            <h2 className="text-red-700 font-bold text-sm">
              THAPAR INSTITUTE OF ENGINEERING & TECHNOLOGY
            </h2>
            <p className="text-xs text-gray-600">(Deemed to be University)</p>
          </div>
          <div className="text-sm space-y-1 text-black">
            <p><strong>Name:</strong> {student.vName}</p>
            <p><strong>Roll No:</strong> {student.vRollNo}</p>
            <p><strong>Program:</strong> {student.vProgram}</p>
            <p><strong>Branch:</strong> {student.vBranch}</p>
            <p><strong>DOB:</strong> {new Date(student.vDOB).toLocaleDateString()}</p>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="w-1/2 p-4 flex flex-col justify-between">
          <div className="text-sm space-y-1 text-black">
            <p><strong>Father:</strong> {student.vFather}</p>
            <p><strong>Blood Group:</strong> {student.vBloodGroup}</p>
            <p><strong>Mobile:</strong> {student.vMobile}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Valid Upto:</strong> {new Date(student.vExpiry).toLocaleDateString()}</p>
          </div>
          <div className="text-sm text-black">
            <p><strong>Address:</strong></p>
            <p>{student.vAddress1},</p>
            <p>{student.vCity}, {student.vState} - {student.vPIN}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <img src={qr} alt="QR Code" className="w-20 h-20 border border-gray-300 rounded" />
            <Barcode value={student.aStudentId} width={1.2} height={40} fontSize={12} />
          </div>
        </div>
      </div>

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={handleDownload}
        className="mt-5 px-6 py-2 rounded-md bg-red-700 text-white text-sm font-semibold shadow-md hover:bg-red-800 transition"
      >
        Download ID Card
      </button>
    </div>
  );
};

export default StudentCard;
