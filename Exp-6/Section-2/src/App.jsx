import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    const passwordRegex = /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;

    if (!emailRegex.test(formData.Email)) {
      alert("Invalid Email! Please ensure you include a valid domain (e.g., .com, .org, etc.) and all the emails have to be in lower case");
      return;
    }

    if (!passwordRegex.test(formData.Password)) {
      alert("Invalid Password! It must start with a capital letter, be at least 8 characters long, and include an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

    alert(`Success!\nEmail: ${formData.Email}\nLogin recorded.`);
  };

  return (
    <div className="container">
      <div className="card-wrapper">
        <div className="modern-form">
          <h1>Exp-6 Section-2</h1>
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email (e.g. user@domain.com)"
                  value={formData.Email}
                  onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.Password}
                  onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
                  required
                />
              </div>
              <div className="button-group">
                <button type="submit" className="btn-submit">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
