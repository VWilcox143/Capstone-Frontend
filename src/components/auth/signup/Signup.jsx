import React, { useState, useRef } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { baseURL } from '../../../environment'
import { useNavigate } from 'react-router-dom';

function Signup({updateToken}) {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        

        const firstName = firstNameRef.current.value
        const lastName = lastNameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value

        let bodyObj = JSON.stringify({
            first: firstName, last: lastName, email, password
        })

        
        const url = `${baseURL}/user/signup` ;
        const headers = new Headers();
        headers.append("Content-type", "application/json");

        const requestOptions = {
            headers, 
            body: bodyObj,
            method: 'POST'
        }

        try {
            
            const response = await fetch(url, requestOptions)
            const data = await response.json();
            console.log(data)
            
            if(data.results.message === `User has been registered.`) {
                updateToken(data.token)
                navigate('/tasks')

            } else {
                alert(data.results.message)
            }

        } catch (err) {
            console.error(err.message)
        }

    }

  return (
    <>
        <h2>New User Register</h2>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>First Name:</Label>
                <Input 
                    innerRef={firstNameRef}
                    autoComplete={'off'}
                />
            </FormGroup>
            <FormGroup>
                <Label>Last Name:</Label>
                <Input 
                    innerRef={lastNameRef}
                    autoComplete={'off'}
                />
            </FormGroup>
            <FormGroup>
                <Label>E-mail:</Label>
                <Input 
                    innerRef={emailRef}
                    autoComplete={'off'}
                />
            </FormGroup>
            <FormGroup>
                <Label>Password:</Label>
                <Input 
                    innerRef={passwordRef}
                    autoComplete={'off'}
                />
            </FormGroup>
            <Button type='submit'>Register User</Button>
        </Form>
    </>
  )
}

export default Signup