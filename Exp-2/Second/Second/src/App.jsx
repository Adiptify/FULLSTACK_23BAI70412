import { Container, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';

function App() {
  return (
    <Container className="py-5 bg-light min-vh-100">
      <header className="mb-5 text-center px-3">
        <h1 className="fw-bold text-primary display-4">Kumar Aditya</h1>
        <p className="lead text-muted">AI Engineer Intern | GenAI & RAG Specialist</p>
      </header>

      <Row className="g-4">
        {/* Profile Card */}
        <Col lg={12}>
          <Card className="border-0 shadow-sm p-3">
            <Card.Body>
              <Card.Title className="fw-bold text-dark h4 mb-3 border-bottom pb-2">Professional Summary</Card.Title>
              <Card.Text className="text-muted" style={{ lineHeight: '1.8' }}>
                AI-focused engineering student with hands-on experience designing Generative AI systems using
                Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG). Experienced in building
                document-grounded LLM applications, semantic retrieval pipelines, and private inference systems.
                Interested in system-oriented AI roles involving LLM integration, knowledge grounding, and scalable deployment.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Experience Card */}
        <Col md={12}>
          <Card className="border-0 shadow-sm h-100 p-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3 border-bottom pb-2">
                <Card.Title className="fw-bold text-dark h4 m-0">Experience</Card.Title>
                <Badge bg="info" className="text-white px-3 py-2">Sep 2025 – Feb 2026</Badge>
              </div>
              <h5 className="text-primary fw-bold">AI Engineer Intern, Mendygo (Remote)</h5>
              <ListGroup variant="flush" className="mt-3">
                <ListGroup.Item className="border-0 ps-0 text-muted">
                  • Designed and implemented RAG-based AI systems for enterprise document understanding.
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0 text-muted">
                  • Selected retrieval-based grounding over fine-tuning to support dynamic data and reduce retraining overhead.
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0 text-muted">
                  • Built semantic retrieval pipelines using dense embeddings and FAISS.
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0 text-muted">
                  • Integrated local LLM inference via Ollama for low-latency, privacy-preserving deployment.
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0 text-muted">
                  • Improved answer relevance through chunking strategy refinement and retrieval-aware prompting.
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Projects Heading */}
        <Col lg={12}>
          <h2 className="fw-bold text-dark mt-4 border-bottom pb-2">Projects</h2>
        </Col>

        {/* Project 1: Adiptify */}
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100 p-3">
            <Card.Body>
              <Card.Title className="fw-bold text-primary h5 border-bottom pb-2">Adiptify – GenAI Adaptive Learning Platform</Card.Title>
              <ListGroup variant="flush" className="mt-3">
                <ListGroup.Item className="border-0 ps-0 small text-muted">
                  • Designed an adaptive learning platform using a RAG-based GenAI architecture.
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0 small text-muted">
                  • Enabled curriculum-aware tutoring by grounding LLM responses in indexed learning content.
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0 small text-muted">
                  • Integrated DeepSeek-RV470B model via Ollama for reasoning and explanation tasks.
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0 small text-muted">
                  • Implemented semantic search using FAISS and deployed services on Microsoft Azure.
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Project 2: RAG Knowledge System */}
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100 p-3">
            <Card.Body>
              <Card.Title className="fw-bold text-primary h5 border-bottom pb-2">RAG-Based AI Knowledge System (LangChain)</Card.Title>
              <ListGroup variant="flush" className="mt-3">
                <ListGroup.Item className="border-0 ps-0 small text-muted">
                  • Built a document intelligence system for querying unstructured enterprise data.
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0 small text-muted">
                  • Implemented ingestion pipelines for PDF, DOCX, TXT, and Markdown files.
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0 small text-muted">
                  • Designed chunking, embedding, indexing, and retrieval pipelines.
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0 small text-muted">
                  • Orchestrated retrieval and generation using LangChain and FAISS.
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <footer className="mt-5 pt-4 text-center text-muted border-top border-2">
        <p className="small mb-0 fw-bold">Developed by Kumar Aditya | Experiment-2 Portfolio</p>
      </footer>
    </Container>
  );
}

export default App;
