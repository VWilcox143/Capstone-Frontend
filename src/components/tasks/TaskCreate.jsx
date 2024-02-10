import React, {useRef} from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { baseURL } from '../../environment'

function TaskCreate(props) {
    // console.log(props)
    const JobRef = useRef()
    const hoursRef = useRef()
    const mileageRef = useRef()
    const contactRef = useRef()
    const emailRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Job = JobRef.current.value;
        const hours = hoursRef.current.value;
        const mileage = mileageRef.current.value;
        const contact = contactRef.current.value;
        const email = emailRef.current.value;
        
        const url =`${baseURL}/tasks`;
        
        let bodyObj = JSON.stringify({
            Job, hours, mileage, contact, email
        })
        console.log(bodyObj);
        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Authorization', props.token)
        
        
        const requestOptions = {
            headers: myHeaders,
            body: bodyObj,
            method: 'POST'
        }
        

        try {

            const response = await fetch(url, requestOptions);
            const data = await response.json();
            props.fetchTasks()

            if(data.message === 'task added to collection') {
                console.log(data)
            }else {
                alert(data.message)
            }

        } catch (err) {
            console.error(err.message);
        }
    }
    return (
    <>
        <h1>Add Task</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Job</Label>
                <Input 
                    innerRef={JobRef}
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
                <Button color='success'>Add Task</Button>
        </Form>
    </>
    )
}

export default TaskCreate