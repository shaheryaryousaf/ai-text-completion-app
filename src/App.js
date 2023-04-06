import { useState } from "react";

// Import Bootstrap
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import axios from "axios";

const App = () => {
  const [input, setInput] = useState("");
  const [completedText, setCompletedText] = useState("");

  const fetchData = async (input) => {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: `Complete this sentence: "${input}"`,
        model: "text-davinci-002",
        max_tokens: 100,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
      }
    );
    return response.data.choices[0].text;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const completedSentence = await fetchData(input);
    setCompletedText(completedSentence);
  };

  return (
    <Container>
      <Row>
        <Col md={8} className="m-auto">
          <h1>AI Text Completion App</h1>
          <p>
            You can add your text here, and AI will automatically complete the
            text for you. This app is powered by <b>ChatGPT</b>.
          </p>
          <Form onSubmit={onSubmit}>
            <div className="mb-3">
              <Form.Control
                placeholder="Enter your text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <Button variant="primary" type="submit">
              Complete Text
            </Button>
          </Form>
          {completedText && (
            <div className="response p-4 mt-3">{completedText}</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
