import React, { useEffect, useState} from 'react'
import { Form, useNavigate, useNavigate, useParams } from 'react-router-dom'
import { baseURL, baseURL } from '../../environment';
import { Button, Col, Container, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import FullButtons from '../buttons/FullButtons';
import React from "react";
import React from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Button, Table } from "reactstrap";
import { Button, Table } from "reactstrap";
import { baseURL } from "../../environment";
import { baseURL } from "../../environment";
import { baseURL } from "../../environment";

export default function ReceiptEdit(props) {

    const { id } = useParams();

    const [ receipt, setReceipt ] = useState('');
    const [ receiptType, setReceiptType ] = useState('');
    const [ receiptDate, setReceiptDate ] = useState('');
    const [ receiptAmount, setReceiptAmount ] = useState('');
    const navigate = useNavigate();

    const fetchReceipt = async () => {
        const url = `${baseURL}/receipts/find-one/${id}`;

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

            const {type, date, amount,} = data

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

        const url = `${baseURL}/receipts/${id}`;

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
        navigate('/receipts'); //ask if this needs to be /receipt or /tasks?

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
    <h1 style={style}>Edit Receipt</h1>
    <Container>
        <Row>
            <Col>
                <Table>
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
                            type:
                        </th>
                        <td> 
                            {receipt.type}
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            date:
                        </th>
                        <td>
                            {receipt.date}
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            amount
                        </th>
                        <td>
                            {receipt.amount}
                        </td>
                        </tr>
                    </tbody>
                </Table>
                <FullButtons>
                    <Button color='info'
                    outline
                    onClick={() => navigate('/receipts')}>back to Table</Button> 
                </FullButtons>
            </Col>
            <Col>
                    <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>
                        type
                    </Label>
                    <Input
                    value={receiptType}
                    onChange={e => setReceiptType(e.target.value)}
                    autoComplete='off'/>
                </FormGroup>
                <FormGroup>
                    <Label>
                        date
                    </Label>
                    <Input
                    value={receiptDate}
                    onChange={e => setReceiptDate(e.target.value)}
                    autoComplete='off'/>
                </FormGroup>
                <FormGroup>
                    <Label>
                        amount
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
            </Row>
        </Container>
    </>
    )
}
export function ReceiptsTable({ tasks, receipts, token, fetchReceipts }) {

    const navigate = useNavigate();

    async function deleteReceipts(id) {
        const url = `${baseURL}/receipt/${id}`;

        let requestOptions = {
            headers: new Headers({
                'Authorization': token
            }),
            method: 'DELETE'
        };
        try {

            let response = await fetch(url, requestOptions);
            let data = await response.json();

            if (data) {
                fetchReceipts();
            }
        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <>
            <h1>Receipts</h1>
            <Table>
                <thead>
                    <tr>
                        <th>
                            Type
                        </th>
                        <th>
                            Date
                        </th>
                        <th>
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {typeof receipts === "object" &&
                        receipts.map(receipts => (
                            <tr key={receipts._id}>
                                <th scope='row'>{receipts.type}</th>
                                <td>{receipts.date}</td>
                                <td>{receipts.amount}</td>
                                <td>
                                    <Button
                                        onClick={() => deleteReceipts(receipts._id)}
                                        color='danger'
                                    >Delete</Button>
                                </td>
                                <td>
                                    <Button
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            navigate(`/tasks/update/${receipts._id}`);
                                        } }
                                        color='warning'
                                    >Edit</Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    );
}
