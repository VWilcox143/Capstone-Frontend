import React, { useEffect, useState } from 'react'
import { baseURL } from '../../environment';
import { Container, Col, Row } from 'reactstrap';
import ReceiptCreate from './ReceiptCreate';
import ReceiptsTable from './ReceiptsTable'
import { useParams } from 'react-router-dom';

function ReceiptIndex(props) {

const { id } = useParams();

const [ receipt, setReceipt] = useState([]);

const fetchReceipts = async () => {
    let url = `${baseURL}/receipt/${id}`
    if(props.subTaskId){url = `${baseURL}/receipt/findsub/${props.subTaskId}`}


    const requestOptions = {
        method:'GET',
        headers: new Headers ({
            "Authorization": props.token
        })
    }

    try {
        const rest = await fetch (url, requestOptions);
        const data = await rest.json();
        setReceipt(data.result)

    } catch (err) {
        console.error(err.message);
    }
}

useEffect(() => {
    if(props.token) {
        fetchReceipts();
    }
}, [props.token])

  return (
    <>
    <Container>
        <Row>
            <Col md='4'>
                <ReceiptCreate 
                token = {props.token}
                subTaskId = {props.subTaskId ? props.subTaskId: null }
                fetchReceipts= {fetchReceipts} />
            </Col>
            <Col md='8'>
                <ReceiptsTable
                token= {props.token}
                fetchReceipt= {fetchReceipts}
                receipts={receipt} />
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default ReceiptIndex