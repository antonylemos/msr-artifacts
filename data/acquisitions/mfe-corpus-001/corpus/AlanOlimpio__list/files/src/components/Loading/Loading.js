import React from 'react';

import { Col, Row, Spinner } from 'react-bootstrap';

import './Loading.css';

function Loading() {
  return (
    <Row>
      <Col className="d-flex justify-content-center align-items-center min-height">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    </Row>
  );
}

export default Loading;
