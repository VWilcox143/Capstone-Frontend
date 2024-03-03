import React, { useEffect, useState}  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button, Table, } from 'reactstrap';
import SubTaskCreate from '../subtask/SubTaskCreate';
import SubTaskTable from '../subtask/SubTaskTable';
import FullButtons from '../buttons/FullButtons';
import { baseURL } from '../../environment';






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
        <Container>
            <Row>
                <Col>
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
                            <td>SubTask</td>
                        </tr>
                    </tbody>
                </Table>
                </Col>
            </Row>
    <Container className='taskIndex'>
        <Row>
            <Col className='Box-Container' md='4'>
                <SubTaskCreate
                token = {props.token}
                fetchSubTask= {fetchSubTask} />
            </Col>
            <Col md='1'></Col>
            <Col className='TaskTable Box-Container' md='7'>
                <SubTaskTable
                token= {props.token}
                fetchSubTask= {fetchSubTask}
                subTask={subTask} />
            </Col>
        </Row>
    </Container>
        </Container>
                <FullButtons>
                    <Button  color='white'
                    outline
                    onClick={() => navigate('/tasks')}>Back to Table</Button>
                </FullButtons>
</>
)
}

