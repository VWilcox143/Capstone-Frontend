import React, {useState} from 'react'
import Signup from './signup/Signup'
import { Button, Col, Container, Row } from 'reactstrap';
import Login from './login/Login';

export default function Auth(props) {

    const [ button, setButton ] = useState('Signup');

    const swapForm = () => {
        button === 'Login'?
            setButton('Signup') :
            setButton('Login')
    }

    const displayForm = () => {
        return (
            button === 'Login' ?
                <Container>
                    <Row>
                <Col md='6'>
                    <Signup updateToken={props.updateToken}/>
                </Col>
                    </Row>
                </Container> : 
                <Container>
                        <Row>
                            <Col md='6'>
                                <Login 
                                updateToken={props.updateToken}/>
                            </Col>
                        </Row>
                </Container>
        )
    }

    return (
      <>
      <Button onClick = {swapForm}
            color='dark'>
                {button}
            </Button>
        {displayForm()}
      </>
    )
  }


