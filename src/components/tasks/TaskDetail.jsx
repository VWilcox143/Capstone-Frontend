import React, { useEffect, useState}  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button, Table, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import FullButtons from '../buttons/FullButtons';
import { baseURL } from '../../environment';
import ReceiptsTable from '../receipts/ReceiptsTable';
import ReceiptCreate from '../receipts/ReceiptCreate';



export default function TaskDetail(props) {
const { id } = useParams();

const [ tasks, setTasks ] = useState('');

const navigate = useNavigate();

const [ receipt, setReceipt] = useState([]);

const fetchReceipts = async () => {
    const url = `${baseURL}/receipt/${id}`

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
        setTasks(data.results);




    } catch (err) {
        console.error(err.message)
}

}
    useEffect(() => {
        if(props.token) {
        fetchTask();
    }
}, [props.token])
return (
<>
    <h2>{tasks.Job}</h2>
        <Container>
            <Row>
                <Col  >
                    <Table hover striped
                    >
                    <thead>
                        <tr>
                            <th>
                                Job
                            </th>
                            <th>
                                Hours
                            </th>
                            <th>
                                Mileage
                            </th>
                            <th>
                                Contact
                            </th>
                            <th>
                                Contact Email
                            </th>
                            <th>
                                Pay Rate
                            </th>
                            <th>
                                Tax Rate
                            </th>
    
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{tasks.Job}</td>
                            <td>{tasks.hoursWorked}</td>
                            <td>{tasks.mileage}</td>
                            <td>{tasks.contact}</td>
                            <td>{tasks.contactEmail}</td>
                            <td>{tasks.payRate}</td>
                            <td>{tasks.taxRate}</td>

                       </tr>


                  </tbody>
                  <tbody>

                    <tr>
                        <td>{tasks.Job}</td>
                        <td>{tasks.hoursWorked}</td>
                        <td>{tasks.mileage}</td>
                        <td>{tasks.contact}</td>
                        <td>{tasks.contactEmail}</td>
                </tr>
                </tbody>
                </Table>
                </Col>
            </Row>
            
        <Row>
            <Col md='4'>
                <ReceiptCreate
                token = {props.token}
                fetchReceipts= {fetchReceipts} />
            </Col>
            <Col md='10'>
                <ReceiptsTable
                token= {props.token}
                fetchReceipt= {fetchReceipts}
                receipts={receipt} />
                <FullButtons>
                    <Button  color='white'
                    outline
                    onClick={() => navigate('/tasks')}>Back to Table</Button>
                </FullButtons>
            </Col>
        </Row>

        </Container>
</>
)
}
