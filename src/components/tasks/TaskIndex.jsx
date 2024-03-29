import React, { useEffect, useState} from 'react'
import TaskCreate from './TaskCreate'
import { Col, Container, Row } from 'reactstrap'
import TasksTable from './TasksTable'
import { baseURL } from '../../environment'
import '../../App.css'


function TaskIndex(props) {

    const [ tasks, setTasks ] = useState([]);

    const fetchTask = async () => {
        const url = `${baseURL}/tasks`;

        const requestOptions = {
            method: 'GET',
            headers: new Headers({
                "Authorization": props.token
            })
        }

        try {

            const res = await fetch(url, requestOptions);
            const data = await res.json();
            setTasks(data.result)

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        if(props.token) {
            fetchTask();
        }
    },[props.token])

    return (
        <>
            <Container className='taskIndex'>
                <Row>
                    <Col className='Box-Container' md='4'>
                        <TaskCreate 
                        token={props.token} 
                        fetchTask={fetchTask} />
                    </Col>
                    <Col md='1'></Col>
                    <Col className='TaskTable Box-Container' md='7'>
                        <TasksTable 
                            token={props.token}
                            fetchTask={fetchTask}
                            tasks={tasks}/>
                    </Col> 
                </Row>
            </Container>
        </>
    )
}

export default TaskIndex