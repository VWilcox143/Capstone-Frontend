import React, { useEffect, useState}  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Container, Form, FormGroup, Input, Label, Row, Button, Table } from 'reactstrap';
import FullButtons from '../buttons/FullButtons';
import { baseURL } from '../../environment';

export default function TaskDetail(props) {
  const { id } = useParams();

  const [ tasks, setTasks ] = useState('');

  const navigate = useNavigate();



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
              <Col md="10" >
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

                    </tr>
                </thead>
                <tbody>
                  <td>{tasks.Job}</td>
                  <td>{tasks.hoursWorked}</td>
                  <td>{tasks.mileage}</td>
                  <td>{tasks.contact}</td>
                  <td>{tasks.contactEmail}</td>
                </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
</>
  )
}
