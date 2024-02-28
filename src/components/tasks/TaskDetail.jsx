import React, { useEffect, useState}  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button, Table, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
// import FullButtons from '../buttons/FullButtons';
import { baseURL } from '../../environment';
import SubTaskCreate from '../subtask/SubTaskCreate';
import SubTaskTable from '../subtask/SubTaskTable';
import ReceiptIndex from '../receipts/ReceiptIndex'



export default function TaskDetail(props, token) {
const { id } = useParams();

const [ tasks, setTasks ] = useState('');
const [ receipt, setReceipt] = useState([]);
const [ subTask, setSubTask] = useState([]);

const navigate = useNavigate();


const fetchSubTask = async () => {
    const url = `${baseURL}/subTask/${id}`;

    const requestOptions = {
        method:'GET',
        headers: new Headers ({
            "Authorization": props.token
        })
    }
    
    try {
        const res = await fetch (url, requestOptions);
        const data = await res.json();
        console.log(data)

        setSubTask(data.result)

    } catch (err) {
        console.error(err.message);
    }
}

useEffect(() => {
    if(props.token) {
        fetchSubTask();
    }
}, [props.token])

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
        <Container className='taskIndex'>
                <Row>
                <Table hover striped>
            <thead>
                <tr>
                    <th>Job</th>
                </tr>
                    <tr>
                        <th>{tasks.Job}</th>
                        <th>
                            Contact name:{tasks.contact}
                        </th>
                        <th>
                            Contact E-mail:{tasks.contactEmail}
                        </th>
                        <th>
                            {tasks.payRate}
                        </th>
                    </tr>
                </thead>
        </Table>
                    <Col md='2'>
                        <SubTaskCreate
                        token={props.token} 
                        fetchSubTask={fetchSubTask} />
                    </Col>
                    <Col md='10'>
                        <SubTaskTable
                        token={props.token} 
                        fetchSubTask={fetchSubTask}
                        subTask={subTask} />
                    </Col>
                </Row>



    </Container>
    </>
    )
    }
