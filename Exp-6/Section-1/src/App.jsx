import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    skills: {
      softwareDeveloper: false,
      designer: false,
      fullstackDeveloper: false,
      mobileDeveloper: false
    },
    address: '',
    state: ''
  })

  const states = ['Andhra Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Other']

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        skills: { ...prev.skills, [name]: checked }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const calculateAge = (dob) => {
    if (!dob) return 0
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const age = calculateAge(formData.dob)
    const selectedSkills = getSelectedSkills(formData.skills)

    const details = `
--- User Details ---
Name: ${formData.firstName} ${formData.lastName}
Gender: ${formData.gender}
Age: ${age} years
Date of Birth: ${formData.dob}
Skills: ${selectedSkills}
Address: ${formData.address}
State: ${formData.state}
    `
    alert(details)
  }

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      skills: {
        softwareDeveloper: false,
        designer: false,
        fullstackDeveloper: false,
        mobileDeveloper: false
      },
      address: '',
      state: ''
    })
  }

  const getSelectedSkills = (skills) => {
    const labels = {
      softwareDeveloper: 'Software Developer',
      designer: 'Designer',
      fullstackDeveloper: 'Fullstack Developer',
      mobileDeveloper: 'Mobile Developer'
    }
    return Object.keys(skills)
      .filter(key => skills[key])
      .map(key => labels[key])
      .join(', ') || 'None'
  }

  return (
    <div className="container">
      <div className="card-wrapper">
        <form className="modern-form" onSubmit={handleSubmit}>
          <h2>User Registration</h2>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter first name"
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter last name"
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              <label><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} required /> Male</label>
              <label><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female</label>
              <label><input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} /> Other</label>
            </div>
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="form-group">
            <label>Skills</label>
            <div className="checkbox-grid">
              <label><input type="checkbox" name="softwareDeveloper" checked={formData.skills.softwareDeveloper} onChange={handleChange} /> Software Developer</label>
              <label><input type="checkbox" name="designer" checked={formData.skills.designer} onChange={handleChange} /> Designer</label>
              <label><input type="checkbox" name="fullstackDeveloper" checked={formData.skills.fullstackDeveloper} onChange={handleChange} /> Fullstack Developer</label>
              <label><input type="checkbox" name="mobileDeveloper" checked={formData.skills.mobileDeveloper} onChange={handleChange} /> Mobile Developer</label>
            </div>
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter your address"
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <select name="state" value={formData.state} onChange={handleChange} required>
              <option value="">Select State</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="button-group">
            <button type="submit" className="btn-submit">Submit</button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default App
