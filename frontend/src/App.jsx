import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [surname, setSurname] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [sex, setSex] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [classSection, setClassSection] = useState("");

  const [editingStudentId, setEditingStudentId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/students").then((response) => {
      setStudents(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newStudent = {
      id: students.length + 1,
      studentID: studentId,
      surname: surname,
      middleName: middleName,
      firstName: firstName,
      sex: sex,
      birthdate: birthdate,
      address: address,
      emailAddress: emailAddress,
      schoolYear: schoolYear,
      classSection: classSection,
    };

    axios
      .post("http://localhost:3001/students", newStudent)
      .then((response) => {
        setStudents([...students, newStudent]);
        setStudentId("");
        setSurname("");
        setMiddleName("");
        setFirstName("");
        setSex("");
        setBirthdate("");
        setAddress("");
        setEmailAddress("");
        setSchoolYear("");
        setClassSection("");
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/students/${id}`).then((response) => {
      console.log(response);
    });
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  const handleEdit = (student) => {
    setEditingStudentId(student.id);
    setStudentId(student.studentID);
    setSurname(student.surname);
    setMiddleName(student.middleName);
    setFirstName(student.firstName);
    setSex(student.sex);
    setBirthdate(student.birthdate);
    setAddress(student.address);
    setEmailAddress(student.emailAddress);
    setSchoolYear(student.schoolYear);
    setClassSection(student.classSection);

    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  const handleStudentId = (event) => {
    setStudentId(event.target.value);
  };
  const handleSurname = (event) => {
    setSurname(event.target.value);
  };
  const handleMiddleName = (event) => {
    setMiddleName(event.target.value);
  };
  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const HandleSex = (event) => {
    setSex(event.target.value);
  };
  const handleBirthdate = (event) => {
    setBirthdate(event.target.value);
  };
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleEmailAddress = (event) => {
    setEmailAddress(event.target.value);
  };
  const handleSchoolYear = (event) => {
    setSchoolYear(event.target.value);
  };
  const handleClassSection = (event) => {
    setClassSection(event.target.value);
  };

  return (
    <div>
      <h1>Student Information</h1>
      <form onSubmit={handleSubmit}>
        <label>Student ID:</label>
        <input value={studentId} onChange={handleStudentId} required />
        <br />
        <label>Surname:</label>
        <input value={surname} onChange={handleSurname} required />
        <br />
        <label>Middle Name:</label>
        <input value={middleName} onChange={handleMiddleName} required />
        <br />
        <label>First Name:</label>
        <input value={firstName} onChange={handleFirstName} required />
        <br />
        <label>Sex:</label>
        <select onChange={HandleSex} value={sex} required>
          <option value="">--Please select--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <br />
        <label>Birthdate:</label>
        <input
          type="date"
          value={birthdate}
          onChange={handleBirthdate}
          required
        />
        <br />
        <label>Address:</label>
        <input value={address} onChange={handleAddress} required />
        <br />
        <label>Email Address:</label>
        <input value={emailAddress} onChange={handleEmailAddress} required />
        <br />
        <label>School Year:</label>
        <input value={schoolYear} onChange={handleSchoolYear} required />
        <br />
        <label>Class Section:</label>
        <input value={classSection} onChange={handleClassSection} required />
        <br />
        {/* <button type="submit">Submit</button> */}
        <button type="submit">{editingStudentId ? "Update" : "Submit"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Surname</th>
            <th>Middle Name</th>
            <th>First Name</th>
            <th>Sex</th>
            <th>Birthdate</th>
            <th>Address</th>
            <th>Email Address</th>
            <th>School Year</th>
            <th>Class Section</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.studentID}</td>
              <td>{student.surname}</td>
              <td>{student.middleName}</td>
              <td>{student.firstName}</td>
              <td>{student.sex}</td>
              <td>{student.birthdate}</td>
              <td>{student.address}</td>
              <td>{student.emailAddress}</td>
              <td>{student.schoolYear}</td>
              <td>{student.classSection}</td>
              <td>
                <button type="button" onClick={() => handleEdit(student)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
