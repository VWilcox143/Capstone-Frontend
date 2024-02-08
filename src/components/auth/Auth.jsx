import React from 'react'
import Signup from './signup/Signup'
import { Col, Container, Row } from 'reactstrap';
import Login from './login/Login';

export default function Auth(props) {

    return (
      <>
        <Container>
            <Row>
                <Col md='6'>
                    <Signup updateToken={props.updateToken}/>
                </Col>
            </Row>
            <Row>
                <Col md='6'>
                    <Login 
                    updateToken={props.updateToken}/>
                </Col>
            </Row>
        </Container>
      </>
    )
  }


