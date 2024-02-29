import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { baseURL } from '../../environment';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import ReceiptIndex from '../receipts/ReceiptIndex';

function SubTaskTable({ subTask, token, fetchSubTask}) {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const { id } = useParams()

    const [ tasks, setTasks] = useState('')
    const [ receipt, setReceipt] = useState([])
    const navigate = useNavigate();

    async function deleteSubTask(id) {
        const url = `${baseURL}/subTask/${id}`;

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
                fetchSubTask();
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const fetchReceipts = async () => {
        const url = `${baseURL}/receipt/${id}`
    
        const requestOptions = {
            method:'GET',
            headers: new Headers ({
                "Authorization": token
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
        if(token) {
            fetchReceipts();
        }
    }, [token])

    const fetchTask = async () => {
        const url = `${baseURL}/tasks/find-one/${id}`;
        
    
        const requestOptions = {
            method: 'GET',
            headers: new Headers({
                'Authorization': token
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
            if(token) {
            fetchTask();
        }
    }, [token])



    return (
        <>
            <h1>Job Entries</h1>
            <Table hover striped>
            <thead>
                    <tr>
                        <th>
                            {tasks.Job}
                        </th>
                        <th>
                            {tasks.contact}
                        </th>
                        <th>
                            {tasks.contactEmail}
                        </th>
                        <th>
                            {tasks.payRate}
                        </th>
                    </tr>
                </thead>
                    <tbody>

                    { typeof subTask === "object" &&

                        subTask.map(subTask => (
                            <tr key={subTask._id}>
                                <th scope ='row'>{subTask.Job}</th>
                                <td>{subTask.date}</td>
                                <td>{subTask.hoursWorked}</td>
                                <td>{subTask.mileage}</td>
                            

                                <td><Button color="danger" onClick={toggle}>
        View Receipts
      </Button></td>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
        <Container>
        <Row>
            <Col md='10'>
                <ReceiptIndex 
                token = {token}
                fetchReceipts = {fetchReceipts}
                fetchReceipt = {fetchReceipts}
                receipts={receipt} />

            </Col>
        </Row>
    </Container>
        </ModalBody>
        <ModalFooter>

        <Button color="secondary" onClick={toggle}>
            Cancel
        </Button>
        </ModalFooter>
    </Modal>
                            </tr>    
                                
                        ))
                    }
                    </tbody>
            </Table>
        </>
    )
}

export default SubTaskTable