import { useState } from 'react';
import { Container, Col, Card, Button, Dropdown, Form, Alert } from 'react-bootstrap';

function App() {
  const [formData, setFormData] = useState({
    name: 'Kumar Aditya',
    email: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light py-5">
      <Col md={6} lg={4}>
        <div className="d-flex flex-column gap-4">

          {/* Card 1: Educational Title */}
          <Card className="border-0 shadow-sm text-center p-3">
            <Card.Body>
              <h5 className="mb-1 text-primary fw-bold">Learning Bootstrap</h5>
              <div className="text-dark">Project by <b>Kumar Aditya</b></div>
            </Card.Body>
          </Card>

          {/* Card 2: Simple Form */}
          <Card className="border-0 shadow-sm p-4">
            <Card.Body>
              <Card.Title className="text-center mb-4 fw-bold">Contact Form</Card.Title>
              {showSuccess && <Alert variant="success">Message Sent!</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label className="small fw-bold">Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="small fw-bold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label className="small fw-bold">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    required
                  />
                </Form.Group>

                <div className="d-grid mt-4">
                  <Button variant="primary" type="submit">
                    Send Message
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Card 3: Dropdown & Exploration */}
          <Card className="border-0 shadow-sm text-center p-3">
            <Card.Body>
              <Card.Title className="small text-muted mb-3">Explore More</Card.Title>
              <Dropdown className="d-grid">
                <Dropdown.Toggle variant="info" id="dropdown-learning" className="text-white">
                  Bootstrap Resources
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100 text-center">
                  <Dropdown.Item href="#docs">Documentation</Dropdown.Item>
                  <Dropdown.Item href="#themes">Themes</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#learning-path">Learning Path</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Card>

        </div>
      </Col>
    </Container>
  );
}

export default App;
