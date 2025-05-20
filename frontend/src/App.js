import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    gender: "",
    skills: [],
    profilePic: null,
  });
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState([]);

  const skills = ["java", "HTML", "CSS", "NODEJS"];
  const genderList = ["Female", "Male", "Other"];
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("candidates")) || [];
    setSubmitted(savedData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGender = (e) => {
    setData((prev) => ({ ...prev, gender: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setData((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter((skill) => skill !== value),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prev) => ({
          ...prev,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const err = {};
    if (!data.name.trim()) err.name = "Full name is required";
    if (!data.email.includes("@")) err.email = "Email should include '@'";
    if (data.mobilenumber.length !== 10)
      err.mobilenumber = "Mobile number should contain exactly 10 digits";
    if (data.skills.length < 2) err.skills = "Select at least 2 skills";
    if (!data.gender) err.gender = "Please select gender";
    if (!data.profilePic) err.profilePic = "Please upload a profile picture";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    setError({});
    setSubmitted((prev) => {
      const newEntry = { ...data };
      const updated = [...prev, newEntry];
      localStorage.setItem("candidates", JSON.stringify(updated));
      return updated;
    });
    setData({
      name: "",
      email: "",
      mobilenumber: "",
      gender: "",
      skills: [],
      profilePic: null,
    });
  };

  const handleDelete = (index) => {
    const updated = [...submitted];
    updated.splice(index, 1);
    setSubmitted(updated);
    localStorage.setItem("candidates", JSON.stringify(updated));
  };

  return (
    <div className="App">
      <h1>Candidate Registration App</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={data.name}
            placeholder="Enter Full Name"
            onChange={handleChange}
            name="name"
          />
          {error.name && <div className="error">{error.name}</div>}

          <input
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={handleChange}
            name="email"
          />
          {error.email && <div className="error">{error.email}</div>}

          <input
            type="text"
            value={data.mobilenumber}
            placeholder="Enter mobile number"
            onChange={handleChange}
            name="mobilenumber"
          />
          {error.mobilenumber && (
            <div className="error">{error.mobilenumber}</div>
          )}

          <label>Gender</label>
          <div>
            {genderList.map((item) => (
              <label key={item} className="gender-label">
                <input
                  type="radio"
                  value={item}
                  onChange={handleGender}
                  checked={data.gender === item}
                  name="gender"
                />
                {item}
              </label>
            ))}
          </div>
          {error.gender && <div className="error">{error.gender}</div>}

          <label>Select Skills:</label>
          <div>
            {skills.map((skill) => (
              <label key={skill} className="skill-label">
                <input
                  type="checkbox"
                  value={skill}
                  onChange={handleCheckboxChange}
                  checked={data.skills.includes(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
          {error.skills && <div className="error">{error.skills}</div>}

          <input type="file" name="file" onChange={handleFileChange} />
          {error.profilePic && <div className="error">{error.profilePic}</div>}
        </div>
        {/* Preview before submission */}
        {data.profilePic && (
          <div className="preview">
            <h4>Profile Preview:</h4>
            <img src={data.profilePic} alt="Preview" width="100" />
          </div>
        )}

        <button type="submit">Submit</button>
      </form>

      <h1>Registration Details</h1>
      {submitted.map((data, index) => (
        <div key={index} className="submitted-data">
          <div className="submitted-content">
            <p>
              {data.profilePic ? (
                <img src={data.profilePic} alt="Profile" width="100" />
              ) : (
                "No file uploaded"
              )}
            </p>
            <p>
              <b>Name:</b> {data.name}
            </p>
            <p>
              <b>Email:</b> {data.email}
            </p>
            <p>
              <b>Mobile Number: </b>
              {data.mobilenumber}
            </p>
            <p>
              <b>Gender:</b> {data.gender}
            </p>
            <p>
              <b>Skills: </b>
              {data.skills.join(", ")}
            </p>
            <button onClick={() => handleDelete(index)} className="btn">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
