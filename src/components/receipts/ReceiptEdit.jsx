import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { baseURL } from '../../environment';
import { Form, Button, Col, Container, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import FullButtons from '../buttons/FullButtons';

export default function ReceiptEdit(props) {

    const { id } = useParams();

    const [ receipt, setReceipt ] = useState('');
    const [ receiptType, setReceiptType ] = useState('');
    const [ receiptDate, setReceiptDate ] = useState('');
    const [ receiptAmount, setReceiptAmount ] = useState('');
    const navigate = useNavigate();

    const fetchReceipt = async () => {
        const url = `${baseURL}/receipt/find-one/${id}`;

        const requestOptions = {
            method: 'GET',
            headers: new Headers({
                'Authorization': props.token
            })
        }

        try {

            const res = await fetch(url, requestOptions);
            const data = await res.json();
            setReceipt(data.results);
console.log(data.results)
            const {type, date, amount} = data
            
            console.log(data)
            setReceiptType(type);
            setReceiptDate(date);
            setReceiptAmount(amount);
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        if(props.token) {
            fetchReceipt();
        }
    }, [props.token])

    async function handleSubmit(e) {
        e.preventDefault();

        const url = `${baseURL}/receipt/${id}`;

        let body = JSON.stringify({
            type: receiptType,
            date: receiptDate,
            amount: receiptAmount
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
            fetchReceipt();

            
            if(data) fetchReceipt();

        } catch (err) {
            console.error(err.message)
        }
        navigate(`/receipts/add/${receipt.task_id}`)

    }

    const style = {
        textAlign: "center",
        textDecoration: 'underline'
    }

    useEffect(() => {
        fetchReceipt();
    }, [props.token]);

    return (
    <>
    <Container>
        <Row>
        <Col className='Box-Container'>
        <h1 className='addTask'>Edit Receipt</h1>
                    <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>
                        Type
                    </Label>
                    <Input
                    value={receiptType}
                    onChange={e => setReceiptType(e.target.value)}
                    autoComplete='off'/>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Date
                    </Label>
                    <Input
                    value={receiptDate}
                    onChange={e => setReceiptDate(e.target.value)}
                    autoComplete='off'/>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Amount
                    </Label>
                    <Input
                    value={receiptAmount}
                    onChange={e => setReceiptAmount(e.target.value)}
                    autoComplete='off'/>
                </FormGroup>
                <FullButtons>
                    <Button color='success'>Update</Button>
                </FullButtons>
                    </Form>
                </Col>
                <Col md='1'></Col>
            <Col className='Box-Container'>
                <Table>
                    <thead className='IndexColumn'>
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
                            Type:
                        </th>
                        <td> 
                            {receipt.type}
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            Date:
                        </th>
                        <td>
                            {receipt.date}
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            Amount
                        </th>
                        <td>
                            {receipt.amount}
                        </td>
                        </tr>
                    </tbody>  
                </Table>
                <FullButtons>
                    <Button className='AddReceiptBTTB'
                    color="success"
                    
                    onClick={() => navigate(`/receipts/add/${receipt.task_id}`)}>Back to Table</Button> 
                </FullButtons>
            </Col>
            </Row>
        </Container>
    </>
    )
}
