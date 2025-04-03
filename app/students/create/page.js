"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import InputField from "@/app/components/InputField";
import { jsPDF } from "jspdf";

const supabase = createClient(
  "https://lgsgvgahwuytqcyeehbm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxnc2d2Z2Fod3V5dHFjeWVlaGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODQ4NTIsImV4cCI6MjA1OTE2MDg1Mn0.1seb4O5pkQKtqjDyUdoHp-zpi3wf5gHRC4D2H5xl8mQ"
);

export default function CreateStudent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [usn, setUsn] = useState("");
  const [studentData, setStudentData] = useState(null);

  const handleSubmit = async () => {
    if (!usn || !name || !email || !phone || !address || !gender || !age) {
      alert("All fields are mandatory");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("student")
        .insert([{ name, usn, phone, email, address, gender, age }])
        .select();

      if (error) throw error;

      setStudentData(data[0]); // Store retrieved student data
      alert("Student Profile Created Successfully");
    } catch (e) {
      alert(`Error: ${JSON.stringify(e)}`);
    }
  };

  const generatePDF = () => {
    if (!studentData) return;

    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text("Student Resume", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${studentData.name}`, 20, 40);
    doc.text(`USN: ${studentData.usn}`, 20, 50);
    doc.text(`Age: ${studentData.age}`, 20, 60);
    doc.text(`Gender: ${studentData.gender}`, 20, 70);
    doc.text(`Email: ${studentData.email}`, 20, 80);
    doc.text(`Phone: ${studentData.phone}`, 20, 90);
    doc.text(`Address: ${studentData.address}`, 20, 100);

    doc.save("student_resume.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold text-blue-500">
        Create Student Profile
      </h1>

      <InputField
        type="text"
        value={name}
        placeholder="Student Name"
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        type="number"
        value={age}
        placeholder="Student Age"
        onChange={(e) => setAge(e.target.value)}
      />
      <InputField
        type="email"
        value={email}
        placeholder="Student Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="text"
        value={phone}
        placeholder="Student Phone"
        onChange={(e) => setPhone(e.target.value)}
      />
      <InputField
        type="text"
        value={address}
        placeholder="Student Address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <InputField
        type="text"
        value={gender}
        placeholder="Student Gender"
        onChange={(e) => setGender(e.target.value)}
      />
      <InputField
        type="text"
        value={usn}
        placeholder="Student USN"
        onChange={(e) => setUsn(e.target.value)}
      />

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Create Student
      </button>

      {studentData && (
        <div className="mt-6 p-4 border rounded-lg shadow-lg bg-white w-2/3">
          <h2 className="text-xl font-bold text-center">Student Resume</h2>
          <p>
            <strong>Name:</strong> {studentData.name}
          </p>
          <p>
            <strong>USN:</strong> {studentData.usn}
          </p>
          <p>
            <strong>Age:</strong> {studentData.age}
          </p>
          <p>
            <strong>Gender:</strong> {studentData.gender}
          </p>
          <p>
            <strong>Email:</strong> {studentData.email}
          </p>
          <p>
            <strong>Phone:</strong> {studentData.phone}
          </p>
          <p>
            <strong>Address:</strong> {studentData.address}
          </p>

          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={generatePDF}
          >
            Download Resume
          </button>
        </div>
      )}
    </div>
  );
}