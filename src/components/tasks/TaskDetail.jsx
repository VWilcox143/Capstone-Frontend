import React, { useEffect, useState}  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button, Table, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import FullButtons from '../buttons/FullButtons';
import { baseURL } from '../../environment';
import ReceiptCreate from '../receipts/ReceiptCreate';
import ReceiptsTable from '../receipts/ReceiptsTable';

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

    <UncontrolledAccordion
  defaultOpen={[
    '1',
    '2'
  ]}
  stayOpen
>
  <AccordionItem>
    <AccordionHeader targetId="1">
        <Container className='container' >
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
                </Table>
                </Col>
            </Row>
            </Container>
    </AccordionHeader>
    <AccordionBody accordionId="1">
<Container>
    <Row>
        <Col>
        <ReceiptsTable
                token= {props.token}
                fetchReceipt= {fetchReceipts}
                receipts={receipt} />
        </Col>
    </Row>
</Container>
    </AccordionBody>
  </AccordionItem>

</UncontrolledAccordion>
<Button color='info'
                        outline
                        onClick={() => navigate('/tasks')}>Back to Table</Button>
</>
)
}
