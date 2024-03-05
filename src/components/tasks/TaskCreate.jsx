import React, {useRef} from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { baseURL } from '../../environment'
import { Navigate } from 'react-router-dom'


export default function TaskCreate(props) {
    // console.log(props)
    const JobRef = useRef()
    const hoursRef = useRef()
    const mileageRef = useRef()
    const contactRef = useRef()
    const emailRef = useRef()
    const payRef = useRef()
    const taxRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Job = JobRef.current.value;
        const hoursWorked = hoursRef.current.value;
        const mileage = mileageRef.current.value;
        const contact = contactRef.current.value;
        const contactEmail = emailRef.current.value;
        const payRate = payRef.current.value;
        const taxRate = taxRef.current.value
        
        
        let bodyObj = JSON.stringify({
            Job, hoursWorked, mileage, contact, contactEmail, payRate, taxRate
        })
        console.log(bodyObj);
        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Authorization', props.token)

        const url = `${baseURL}/tasks/tasks`;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        
        
        const requestOptions = {
            headers: myHeaders,
            body: bodyObj,
            method: 'POST'
        }
        

        try {

            const response = await fetch(url, requestOptions);
            const data = await response.json();
            props.fetchTask()

            if(data.message === 'task added to collection') {
                
            }else {
                // alert(data.message)
            }

        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        
    <>

        <h1 className="addTask">Add Job</h1>

        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Job</Label>
                <Input 
                    innerRef={JobRef}
                    type='string'
                    autoComplete='off'
                />
            </FormGroup>
            <FormGroup>
                <Label>Hours Worked</Label>
                <Input 
                    innerRef={hoursRef}
                    type='number'
                    autoComplete='off'
                />
            </FormGroup>
            <FormGroup>
                <Label>Mileage</Label>
                <Input 
                    innerRef={mileageRef}
                    type='number'
                    autoComplete='off'
                />
            </FormGroup>
            <FormGroup>
                <Label>Contact</Label>
                <Input 
                    innerRef={contactRef}
                    autoComplete='off'
                />
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input 
                    innerRef={emailRef}
                    autoComplete='off'
                />
            </FormGroup>
            <FormGroup>
                <Label>Pay Rate</Label>
                <Input 
                    innerRef={payRef}
                    autoComplete='off'
                />
             </FormGroup>
            <FormGroup>
                <Label>Tax Rate</Label>
                <Input 
                    innerRef={taxRef}
                    autoComplete='off'
                />
            </FormGroup>
                <Button color='success'>Add Task</Button>
        </Form>
    </>
    )
}

