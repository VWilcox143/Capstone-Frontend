import { useState, useEffect } from 'react'
import { Button, Table } from 'reactstrap'
import { baseURL } from '../../environment'
import { useNavigate } from 'react-router-dom';



function TasksTable({tasks, token, fetchTask}) {

    const [ user, setUser ] = useState('');

useEffect(() => {let tempUser = localStorage.getItem("userName")
setUser(tempUser)}, [])
    

    const navigate = useNavigate();

    async function deleteTasks(id) {
        const url = `${baseURL}/tasks/${id}`;

        let requestOptions = {
            headers: new Headers({
                'Authorization': token
            }),
            method: 'DELETE'
        }

        try {

            let response = await fetch(url, requestOptions);
            let data = await response.json();

            if(data) {
                fetchTask();
            }
            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <h1> Job List for {user}</h1>
            <Table hover striped>
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
                        <th>Tax Estimate</th>
                        <th>
                            Add Receipt
                        </th>
                        <th>
                            Edit
                        </th>
                        <th>
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>

                    { typeof tasks === "object" &&

                        tasks.map(tasks => (
                            <tr key={tasks._id}
                            onClick={() => navigate(`/tasks/tasks/${tasks._id}`)}>
                                <th scope='row'
                                >{tasks.Job}</th>
                                <td>{tasks.hoursWorked}</td>
                                <td>{tasks.mileage}</td>
                                <td>{tasks.contact}</td>
                                <td>{tasks.contactEmail}</td>
                                <td>{tasks.payRate}</td>
                                <td>{tasks.hoursWorked * tasks.payRate * (tasks.taxRate/100)}</td>
                                <td>
                                    <Button
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            navigate(`/receipts/add/${tasks._id}`)}}
                                        color='success'
                                    >Add Receipt</Button>
                                </td>
                                <td>
                                    <Button
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            navigate(`/tasks/update/${tasks._id}`)}}
                                        color='warning'
                                    >Update</Button>
                                </td>
                                <td>
                                    <Button
                                        onClick={(event) => { 
                                            event.stopPropagation()
                                            deleteTasks(tasks._id)}}
                                        color='danger'
                                    >Delete</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default TasksTable