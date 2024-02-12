import React from 'react'
import { Button, Table } from 'reactstrap'
import { baseURL } from '../../environment'
import { useNavigate } from 'react-router-dom';

function TasksTable({tasks, token, fetchTasks}) {
    // console.log(tasks)

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
                fetchTasks();
            }
            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <h1>Task List</h1>
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
                            Edit / Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map(tasks => (
                            <tr key={tasks._id}>
                                <th scope='row'>{tasks.job}</th>
                                <td>{tasks.hoursWorked}</td>
                                <td>{tasks.mileage}</td>
                                <td>{tasks.contact} mins</td>
                                <td>{tasks.contactEmail}</td>
                                <td>
                                    <Button
                                        onClick={() => navigate(`/tasks/update/${tasks._id}`)}
                                        color='warning'
                                    >Edit</Button>
                                    <Button
                                        onClick={() => deleteTasks(tasks._id)}
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