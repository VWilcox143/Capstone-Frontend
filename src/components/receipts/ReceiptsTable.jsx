import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../environment';
import { Button, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function ReceiptsTable({tasks, receipts, token, fetchReceipts}) {

    const navigate = useNavigate();

    async function deleteReceipts(id) {
        const url = `${baseURL}/receipt/${id}`;

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
                fetchReceipts();
            }
        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <>
            <h1>Receipts</h1>
            <Table>
            <thead>
                    <tr>
                        <th>
                            Type
                        </th>
                        <th>
                            Date
                        </th>
                        <th>
                            Amount
                        </th>
                    </tr>
                </thead>
                    <tbody>
                    { typeof receipts === "object" &&
                        receipts.map(receipts => (
                            <tr key={receipts._id}>
                                <th scope ='row'>{receipts.type}</th>
                                <td>{receipts.date}</td>
                                <td>{receipts.amount}</td>
                                <td>
                                    <Button
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            navigate(`/tasks/update/${tasks._id}`)}}
                                        color='warning'
                                    >Edit</Button>
                                </td>
                                <Button
                                        onClick={() => deleteReceipts(tasks._id)}
                                        color='danger'
                                    >Delete</Button>
                            </tr>
                        ))
                    }
                    </tbody>
            </Table>
        </>
    )
}

export default ReceiptsTable