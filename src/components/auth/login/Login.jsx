import React, { useRef } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { baseURL } from '../../../environment';
import { useNavigate } from 'react-router-dom';

function Login({updateToken}) {

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(emailRef)
        // console.log(passwordRef)

        const body = JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value
        })

        const url = `${baseURL}/user/login`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: body
            });

            const data = await response.json();
            console.log(data.results);



            if(data.results.message === 'Login Successful') {
                updateToken(data.results.token)
                navigate('/tasks')
            } else {
                alert(data.message)
            }

        } catch (err) {
            console.error(err.message)
        }    }

  return (
    <>
    <h2>Log In</h2>
    <Form onSubmit={handleSubmit}>
        <FormGroup>
            <Label>E-mail:</Label>
            <Input 
                placeholder='Your E-mail'
                type='email'
                innerRef={emailRef}
                autoComplete={'off'}
            />
        </FormGroup>
        <FormGroup>
            <Label>Password:</Label>
            <Input 
                placeholder='Password'
                type='password'
                innerRef={passwordRef}
                autoComplete={'off'}
            />
        </FormGroup>
            <Button type='submit'>Log In</Button>
    </Form>
    </>
  )
}

export default Login