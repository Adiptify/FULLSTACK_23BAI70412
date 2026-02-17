import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-container fade-in">
            <h2>Get in Touch</h2>
            <p className="contact-subtitle">Have questions about AI/ML or my projects? Drop a message!</p>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Your Name" />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="example@college.edu" />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea placeholder="Your message here..."></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;
