import React, {useRef} from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { baseURL } from '../../environment'
import { useParams, useNavigate } from 'react-router-dom';

export default function SubTaskCreate(props) {
    const {id}=useParams() // needs to match route
    // console.log(props)
    const JobRef = useRef();
    const dateRef = useRef();
    const hoursWorkedRef = useRef();
    const mileageRef = useRef()
    // const taskRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Job = JobRef.current.value
        const date = dateRef.current.value
        const hoursWorked = hoursWorkedRef.current.value
        const mileage = mileageRef.current.value
        const task = id
        
        
        let bodyObj = JSON.stringify({
            Job, date, hoursWorked, mileage, task
        })

        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Authorization', props.token)

        // const url = `${baseURL}/receipt/`
        const url = `${baseURL}/subTask/${id}`;
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
            props.fetchSubTask()

            if(data.message === `Entry Created:`) {
                console.log(data)
            }else {
                // alert(data.message)
            }

        } catch (err) {
            console.error(err.message);
        }
    }
    return (
    <>
        <h1>Add Entry</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Date</Label>
                <Input 
                    format="MM-DD-YYYY" 
                    innerRef={dateRef}
                    type='date'
                    autoComplete='off'
                    // onChange={this.onChangeHandle}
                />
            </FormGroup>
            <FormGroup>
                <Label>Job</Label>
                <Input
                    format="MM-DD-YYYY" 
                    innerRef={JobRef}
                    type='string'
                    autoComplete='off'
                    // onChange={this.onChangeHandle}
                />
            </FormGroup>
            <FormGroup>
                <Label>Hours</Label>
                <Input 
                    innerRef={hoursWorkedRef}
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
                <Button color='success'>Add Entry</Button>
                <Button color='info'
                        outline
                        onClick={() => navigate('/tasks')}>Back to Table</Button>
        </Form>
    </>
    )
}

