import React from 'react'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../environment';
import { Button, Table } from 'reactstrap';

function ReceiptsTable({tasks, receipts, token, fetchReceipt}) {

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
                fetchReceipt();
            }
        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <>
            <h1 className='addTask'>Receipts</h1>
            <Table hover striped>
            <thead className='IndexColumn'>
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
                        <th>
                            Delete
                        </th>
                        <th>
                            Edit
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
                                <Button className='AddReceiptBTTB'
                                        onClick={() => deleteReceipts(receipts._id)}
                                        color='dark'
                                    >Delete</Button>
                                </td>
                                <td>
                                    <Button className='AddReceiptBTTB'
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            navigate(`/receipts/update/${receipts._id}`)}}
                                        color='dark'
                                    >Edit</Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
            </Table>
        </>
    )
}

export default ReceiptsTable