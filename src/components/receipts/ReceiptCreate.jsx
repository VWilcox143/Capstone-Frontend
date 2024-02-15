import React, {useRef} from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { baseURL } from '../../environment'
import { useParams } from 'react-router-dom';

function ReceiptCreate(props) {
    const {id}=useParams() // needs to match route
    console.log(id);
    // console.log(props)
    const typeRef = useRef();
    const dateRef = useRef();
    const amountRef = useRef();
    const taskRef = useRef();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const type = typeRef.current.value
        const date = dateRef.current.value
        const amount = amountRef.current.value
        const task = id
        
        
        let bodyObj = JSON.stringify({
            type, date, amount, task
        })
        console.log(bodyObj);
        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Authorization', props.token)

        // const url = `${baseURL}/receipt/`
        const url = `${baseURL}/receipt/${id}`;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        
        
        const requestOptions = {
            headers: myHeaders,
            body: bodyObj,
            method: 'POST'
        }
        
        console.log(bodyObj);
        try {

            const response = await fetch(url, requestOptions);
            const data = await response.json();
            props.fetchTasks()

            // if(data.message === 'task added to collection') {
            //     console.log(data)
            // }else {
            //     alert(data.message)
            // }

        } catch (err) {
            console.error(err.message);
        }
    }
    return (
    <>
        <h1>Add Receipt</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Type</Label>
                <Input 
                    innerRef={typeRef}
                    type='string'
                    autoComplete='off'
                />
            </FormGroup>
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
                <Label>Amount</Label>
                <Input 
                    innerRef={amountRef}
                    type='number'
                    autoComplete='off'
                />
            </FormGroup>
                <Button color='success'>Add Receipt</Button>
        </Form>
    </>
    )
}

export default ReceiptCreate