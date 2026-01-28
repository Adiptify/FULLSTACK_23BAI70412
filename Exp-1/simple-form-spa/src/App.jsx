import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submissions, setSubmissions] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmissions((prev) => [...prev, formData])
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="container">
      <h1>Simple Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {submissions.length > 0 && (
        <div className="results">
          <h2>Submitted Data List</h2>
          {submissions.map((data, index) => (
            <div key={index} className="result-item">
              <p><strong>Name:</strong> {data.name}</p>
              <p><strong>Email:</strong> {data.email}</p>
              <p><strong>Message:</strong> {data.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
