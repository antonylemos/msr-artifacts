import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Container,
  Col,
  ListGroup,
  Row,
  Tab,
  Tabs,
  Button,
} from 'react-bootstrap';
import { getList } from '../../services/list';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../Loading';

function List() {
  const [list, setList] = useState([]);
  const [tabSelect, setTabSelect] = useState('active');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function listFetch(tab) {
    setLoading(true);
    getList(tab)
      .then((resolve) => {
        setList(resolve);
      })
      .catch((erro) => console.log(erro))
      .finally(() => setLoading(false));
  }

  function handleLIst() {
    return (
      <ListGroup>
        {loading ? (
          <Loading />
        ) : (
          list.map((item, index) => (
            <ListGroup.Item key={index} action variant="light">
              {item.name}
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    );
  }

  useEffect(() => {
    listFetch(tabSelect);
  }, [tabSelect]);

  return (
    <Container>
      <Row>
        <h2 className="mt-4">List</h2>
      </Row>
      <Row xs={1} md={12} className="mb-3">
        <Col className="p-2 mt-2">
          <Tabs
            defaultActiveKey="active"
            id="List-tab"
            className="mb-3"
            onSelect={(keyTab) => setTabSelect(keyTab)}
          >
            <Tab eventKey="active" title="Active">
              {handleLIst()}
            </Tab>
            <Tab eventKey="disabled" title="Disabled">
              {handleLIst()}
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Button variant="primary" onClick={() => navigate('register')}>
            Open Modal Register
          </Button>
        </Col>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
}

export default List;
