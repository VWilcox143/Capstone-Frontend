import React, { useEffect, useState}  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button, Table, } from 'reactstrap';
import SubTaskCreate from '../subtask/SubTaskCreate';
import SubTaskTable from '../subtask/SubTaskTable';
import FullButtons from '../buttons/FullButtons';
import { baseURL } from '../../environment';
import TasksTable from './TasksTable';




export default function TaskDetail(props) {

const { id } = useParams();

const [ tasks, setTasks ] = useState('');
const [ receipt, setReceipt] = useState([]);
const [ subTask, setSubTask] = useState([]);
const [ totals, setTotals ] = useState('')
const [ subTaskData, setSubTaskData] = useState([])

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
console.log(subTask)
useEffect(() => {
    if(props.token) {
        fetchSubTask();
    }
}, [props.token])

console.log(subTaskData)


const calculateSubTaskTotals = (subTaskData) => {
    // Use reduce to accumulate total hours and mileage
    return subTaskData.reduce((acc, subtask) => {
        acc.totalHoursWorked += subtask.hoursWorked || 0;
        acc.totalMileage += subtask.mileage || 0;
      return acc; // Return the updated accumulator
    }, {
      // Initial values for the accumulator
        totalHoursWorked: tasks.hoursWorked,
        totalMileage: tasks.mileage
    });
};

useEffect(() => {
    // Update subTaskData and conditionally calculate totals
    setSubTaskData(subTask);
    if (subTask.length > 0 && typeof subTask !== "string") {
      const calculatedTotals = calculateSubTaskTotals(subTask);

      setTotals(calculatedTotals);
    } else {
      // Set totals to tasks.hoursWorked and tasks.mileage if no subtasks
      setTotals({
        totalHoursWorked: tasks.hoursWorked || 0,
        totalMileage: tasks.mileage || 0,
      });
    }
  }, [subTask]);
  console.log(subTask)


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
    {/* <h2>{tasks.Job}</h2> */}
        <Container>
            {/* <h2 className='SubTask-Header'>{tasks.Job}</h2> */}
            <div className='SubTask-Container'>
            <h2 className='SubTask-Header'>{tasks.Job}</h2>
            <Row>
                <Col>
                    <Table hover striped
                    >
                    <thead className='IndexColumn'>
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
                            <td>{totals.totalHoursWorked}</td>
                            <td>{totals.totalMileage}</td>
                            <td>{tasks.contact}</td>
                            <td>{tasks.contactEmail}</td>
                            <td>{tasks.payRate}</td>
                            <td>{tasks.taxRate}</td>                

                        </tr>
                    </tbody>
                    
                </Table>
                </Col>  
            </Row> 
            </div>    
    <Container>
    
        <Row>
            <Col className='Box-Container' md='4'>
                <SubTaskCreate
                token = {props.token}
                fetchSubTask= {fetchSubTask} />
            </Col>
            <Col md='1'></Col>
            <Col className='TaskTable-Container' md='7'>
                <SubTaskTable
                token= {props.token}
                fetchSubTask= {fetchSubTask}
                subTask={subTask}/>
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