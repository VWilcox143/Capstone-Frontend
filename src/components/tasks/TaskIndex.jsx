import React, { useEffect, useState} from 'react'
import TaskCreate from './TaskCreate'
import { Col, Container, Row } from 'reactstrap'
import TasksTable from './TasksTable'
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
<<<<<<< HEAD
                        token={props.token} fetchTasks={fetchTasks} />
=======
                        token={props.token} 
                        fetchTask={fetchTasks} />
>>>>>>> 700c55ca02043c9ff307f71f71296cdd725156b8
                    </Col>
                    <Col md='8'>
                        <TasksTable 
                            token={props.token}
<<<<<<< HEAD
                            fetchTasks={fetchTasks}
=======
                            fetchTask={fetchTasks}
>>>>>>> 700c55ca02043c9ff307f71f71296cdd725156b8
                            tasks={tasks}/>
                    </Col> 
                </Row>
            </Container>
        </>
    )
}

export default TaskIndex