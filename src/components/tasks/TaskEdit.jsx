import React, { useEffect, useState}  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Container, Form, FormGroup, Input, Label, Row, Button } from 'reactstrap';
import FullButtons from '../buttons/FullButtons';
import { baseURL } from '../../environment';

export default function TaskEdit(props) {

    const { id } = useParams();


    const [ taskJob, setTaskJob ] = useState('')
    const [ taskHours, setTaskHours ] = useState('')
    const [ taskMileage, setTaskMileage ] = useState('')
    const [ taskContact, setTaskContact ] = useState('')
    const [ taskEmail, setTaskEmail ] = useState('')
    const navigate = useNavigate();



    const fetchTask = async () => {
        const url = `${baseURL}/tasks/find-one/${id}`;

        const requestOptions = {
            method: 'GET',
            headers: new Headers({
                'Authorization': props.token
            })
        }

        try {
            
            const res = await fetch(url, requestOptions);
            const data = await res.json();
            
            
            console.log(data);
            const { job, hours, mileage, contact, contactEmail} = data

            setTaskJob(job);
            setTaskHours(hours);
            setTaskMileage(mileage);
            setTaskContact(contact);
            setTaskEmail(contactEmail);

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        if(props.token) {
            fetchTask();
        }
    }, [props.token])

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(props.token)
        const url = `${baseURL}/tasks/${id}`;

        let body = JSON.stringify({
            job: taskJob,
            hours: taskHours,
            mileage: taskMileage,
            contact: taskContact,
            contactEmail: taskEmail
        })

        const requestOptions = {
            headers: new Headers({
                'Authorization': props.token,
                "Content-Type": 'application/json'
            }),
            body,
            method: 'PATCH'
        }

        try {

            const res = await fetch(url, requestOptions);
            const data = await res.json(); 
            
            if(data) fetchTask();

    } catch (err) {
        console.error(err.message)
    }
    }

    const style = {
        textAlign: "center",
        textDecoration: 'underline'
    }

return (
    <>
        <h1 style={style}>Edit Tasks</h1>
        <Container>
            <Row>
                <Col md="4">
                    <h2>Expenses for Job</h2>
                        <Col md="8">
                        <thead>
                    <tc>
                        <tr>
                            <Label>
                            <h5>Job:</h5> 
                            </Label>
                        </tr>
                        <tr>
                            <Label>
                            <h5>Hours:</h5>
                            </Label>
                        </tr>
                        <tr>
                            <Label>
                            <h5>Mileage</h5>
                            </Label>
                        </tr>
                        <tr>
                            <Label>
                            <h5>Contact</h5>
                            </Label>
                        </tr>
                        <tr>
                            <Label>
                            <h5>Contact E-mail</h5>
                            </Label>
                        </tr>
                    </tc>
                </thead>
                        </Col>
                    <FullButtons>
                        <Button color='info'
                        outline
                        onClick={() => navigate('/tasks')}>Back to Table</Button>
                    </FullButtons>
                </Col>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>
                                Job
                            </Label>
                            <Input 
                            value={taskJob}
                            onChange={e => setTaskJob(e.target.value)}
                            autoComplete = 'off' />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Hours
                            </Label>
                            <Input 
                            value={taskHours}
                            onChange={e => setTaskHours(e.target.value)}
                            autoComplete = 'off'>
                                
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Mileage
                            </Label>
                            <Input 
                            value={taskMileage}
                            onChange={e => setTaskMileage(e.target.value)}
                            autoComplete = 'off'>
                            </Input>
                        </FormGroup>
                        
                        <FormGroup>
                            <Label>
                                Contact
                            </Label>
                            <Input 
                            value={taskContact}
                            onChange={e => setTaskContact(e.target.value)}
                            autoComplete = 'off' />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Contact E-mail
                            </Label>
                            <Input 
                            value={taskEmail}
                            onChange={e => setTaskEmail(e.target.value)}
                            autoComplete = 'off'>
                            </Input>
                        </FormGroup>
                        <FullButtons>
                            <Button color='success'>Update</Button>
                        </FullButtons>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>
  )
}
