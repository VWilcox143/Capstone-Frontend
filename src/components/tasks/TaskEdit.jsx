import React, { useEffect, useState}  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Container, Form, FormGroup, Input, Label, Row, Button, Table } from 'reactstrap';
import FullButtons from '../buttons/FullButtons';
import { baseURL } from '../../environment';


export default function TaskEdit(props) {

    const { id } = useParams();

    const [ tasks, setTasks ] = useState('');
    const [ taskJob, setTaskJob ] = useState('')
    const [ taskHours, setTaskHours ] = useState('')
    const [ taskMileage, setTaskMileage ] = useState('')
    const [ taskContact, setTaskContact ] = useState('')
    const [ taskContactEmail, setTaskContactEmail ] = useState('')
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
            console.log(data)
            setTasks(data.results);
            
            
            const { Job, hoursWorked, mileage, contact, contactEmail} = data.results
          

            
            setTaskJob(Job);
            // setTaskHours(hoursWorked);
            // setTaskMileage(mileage);
            setTaskContact(contact);
            setTaskContactEmail(contactEmail);
            
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

        const newHours = taskHours === '' ? 0: taskHours; 
        const newMileage = taskMileage === '' ? 0: taskMileage;
console.log(newHours, taskHours)
        const totalHours = Number(newHours) + tasks.hoursWorked;
        const totalMileage = Number(newMileage) + tasks.mileage;

        let body = JSON.stringify({
            Job: taskJob,
            hoursWorked: totalHours,
            mileage: totalMileage,
            contact: taskContact,
            contactEmail: taskContactEmail
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
            fetchTask();
            
            // setHoursTotal(tasks.hoursWorked + taskHours)


            
            if(data) fetchTask();

    } catch (err) {
        console.error(err.message)
    }
    navigate('/tasks');

    }

    const style = {
        textAlign: "center",
        textDecoration: 'underline'
    }

    useEffect(() => {
        fetchTask();
        }, [props.token]);

    return (
    <>
        {/* <h1 style={style}>Edit Task</h1> */}
        <Container className='taskIndex'>
            <Row>
                <Col className='TaskTable Box-Container'>
                <h1 className='addTask'>Edit Job</h1>
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
                            type= 'number'
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
                            type= 'number'
                            onChange={e => setTaskMileage(e.target.value)}
                            autoComplete = 'off'
                            ></Input>
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
                            value={taskContactEmail}
                            onChange={e => setTaskContactEmail(e.target.value)}
                            autoComplete = 'off' />
                            
                        </FormGroup>
                        <FullButtons>
                            <Button color='success'>Update</Button>
                        </FullButtons>
                    </Form>
                </Col>
                <Col md='3'>
                </Col>
                <Col className='Box-Container' md="4">
                <Table striped>
                    <thead>
                        <tr>
                        <th>
                            Field
                        </th>
                        <th>
                            Current Value
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">
                            Job:
                        </th>
                        <td> 
                            {tasks.Job}
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            Hours:
                        </th>
                        <td>
                            {tasks.hoursWorked}
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            Mileage
                        </th>
                        <td>
                            {tasks.mileage}
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            Contact
                        </th>
                        <td>
                            {tasks.contact}
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            Contact E-mail
                        </th>
                        <td>
                            {tasks.contactEmail}
                        </td>
                        </tr>
                    </tbody>
                    </Table>
                    <FullButtons>
                        <Button color='info'
                        // outline
                        onClick={() => navigate('/tasks')}>Back to Table</Button>
                    </FullButtons>
                </Col>
            </Row>
        </Container>
    </>
    )
}

// ! 02/29 added classnames to make it uniform with taskIndex. Did similar to receiptindex and receipttable.
