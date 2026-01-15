import { Navbar, Nav, Container, Card, Button, Form, Row, Col } from 'react-bootstrap';

function App() {
  const randomTexts = [
    "Exploring creative horizons with code and design.",
    "Building scalable solutions for modern web challenges.",
    "Innovating one component at a time with passion."
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Never Expand Navbar (Fixed hamburger menu) */}
      <Navbar bg="dark" variant="dark" expand={false} className="shadow-sm">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold">Exp-4: Kumar Aditya</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Collapse id="offcanvasNavbar">
            <Nav className="ms-auto p-3">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
              <Nav.Link href="#settings">Settings</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content: Multiple Cards */}
      <Container className="flex-grow-1 py-5">
        <h2 className="text-center mb-5 fw-bold text-primary">Experiment-4 Showcase</h2>

        <Row className="justify-content-center g-4">
          {/* Card 1: Features with Checkboxes */}
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100 p-3 text-center">
              <Card.Body>
                <Card.Title className="fw-bold mb-4">Project Scope</Card.Title>
                <div className="text-start mb-4">
                  <Form.Check
                    type="checkbox"
                    label="Responsive 'Never Expand' Navbar"
                    checked
                    readOnly
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Perfectly Centered Bootstrap Card"
                    checked
                    readOnly
                  />
                </div>
                <Button variant="outline-primary" className="w-100 mt-auto">Verify Tasks</Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2: Random Content A */}
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100 p-3 text-center text-white bg-primary">
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title className="fw-bold mb-3">Portfolio Insight</Card.Title>
                <p className="small mb-4">{randomTexts[0]}</p>
                <Button variant="light" className="text-primary fw-bold mt-auto">View Details</Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 3: Random Content B */}
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100 p-3 text-center">
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title className="fw-bold mb-3">Future Roadmap</Card.Title>
                <p className="text-muted small mb-4">{randomTexts[1]}</p>
                <Button variant="secondary" className="mt-auto">Stay Updated</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-white text-dark text-center py-3 mt-auto shadow-sm border-top">
        <Container>
          <div className="small fw-bold">Made by Kumar Aditya</div>
        </Container>
      </footer>
    </div>
  );
}

export default App;
