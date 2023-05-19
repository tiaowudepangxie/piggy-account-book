import React, { useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'

export default function Panel({records}) {
  // const [credit, setCredit] = useState(0);
  // const [debit, setDebit] = useState(0);
  // const [balance, setBalance] = useState(0);

  let credit = 0;
  let debit = 0;
  let balance = 0;

  records.forEach(element => {
    if (element.type === "Debit") {
      debit += parseFloat(element.amount);
    } else if (element.type === "Credit") {
      credit += parseFloat(element.amount);
    }
  });

  balance = credit - debit;

  return (
    <Row>
      <Col md={4}>
        <Card
          bg="primary"
          text="white"
          className="mb-2"
        >
          <Card.Header>Credit</Card.Header>
          <Card.Body>
          <Card.Text>
              {credit.toFixed(2)}
          </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card
          bg="secondary"
          text="white"
          className="mb-2"
        >
          <Card.Header>Debit</Card.Header>
          <Card.Body>
          <Card.Text>
            {debit.toFixed(2) }
          </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card
          bg="danger"
          text="white"
          className="mb-2"
        >
          <Card.Header>Balance</Card.Header>
          <Card.Body>
          <Card.Text>
            {balance.toFixed(2)}
          </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>

  )
}
