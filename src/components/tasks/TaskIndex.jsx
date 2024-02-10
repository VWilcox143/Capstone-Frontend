import React, { useEffect, useState} from 'react'
import TaskCreate from './TaskCreate'
import { Col, Container, Row } from 'reactstrap'
// import TasksTable from './TasksTable'
import { baseURL } from '../../environment'

function TaskIndex(props) {

    const [ tasks, setTasks ] = useState([]);

    const fetchTasks = async () => {
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
            fetchTasks();
        }
    },[props.token])

    return (
        <>
            <Container>
                <Row>
                    <Col md='4'>
                        <TaskCreate 
                        token={props.token} fetchTask={fetchTasks} />
                    </Col>
                    <Col md='8'>
                        {/* <TasksTable 
                            token={props.token}
                            fetchTask={fetchTask}
                            tasks={tasks}/> */}
                    </Col> 
                </Row>
            </Container>
        </>
    )
}

export default TaskIndex