import React, {useRef} from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { baseURL } from '../../environment'
import { useParams, useNavigate } from 'react-router-dom';


function ReceiptCreate(props) {

    const {id}=useParams() // needs to match route
<<<<<<< HEAD
    
=======
    console.log(id)
>>>>>>> 5c2ceed29f87867a3bbd47631357ea998c3278ad
    const typeRef = useRef();
    const dateRef = useRef();
    const amountRef = useRef();
    // const taskRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const type = typeRef.current.value
        const date = dateRef.current.value
        const amount = amountRef.current.value
        const task = id
        
        
        let bodyObj = JSON.stringify({
            type, date, amount, task
        })

        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Authorization', props.token)

        // const url = `${baseURL}/receipt/`
        let url = `${baseURL}/receipt/${id}`;

        if(props.subTaskId){url = `${baseURL}/receipt/${id}/findsub/${props.subTaskId}`}

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
            props.fetchReceipts()

            if(data.message === `Receipt Created:`) {
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
        <h1 className="addTask">Add Receipt</h1>
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
                <Button color='info'
                        outline
                        onClick={() => navigate('/tasks')}>Back to Table</Button>
        </Form>
    </>
    )
}

export default ReceiptCreate