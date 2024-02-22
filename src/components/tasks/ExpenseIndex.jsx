// import React, { useEffect, useState } from 'react'
// import TaskCreate from './TaskCreate'
// import { Col, Container, Row } from 'reactstrap'
// import ExpenseTable from './TasksTable'
// import { baseURL } from '../../environment'

// function ExpenseIndex(props) {

//     const [ expenses, setExpenses ] = useState([]);

//     const fetchExpenses = async () => {
//         const url = `${baseURL}/expenses`;

//         const requestOptions = {
//             method: 'GET',
//             headers: new Headers({
//                 "Authorization": props.token
//             })
//         }

//         try {
            
//             const res = await fetch(url, requestOptions);
//             const data = await res.json();

//             // console.log(data);
//             setExpenses(data.result)

//         } catch (err) {
//             console.error(err.message);
//         }
//     }

//     useEffect(() => {
//         if(props.token) {
//             fetchExpenses();
//         }
//     },[props.token])

//     return (
//         <>
//             <Container>
//                 <Row>
//                     <Col md='4'>
//                         <TaskCreate 
//                         token={props.token} fetchMovies={fetchExpenses} />
//                     </Col>
//                     <Col md='8'>
//                         <ExpenseTable 
//                             token={props.token}
//                             fetchExpenses={fetchExpenses}
//                             expenses={expenses}/>
//                     </Col>
//                 </Row>
//             </Container>
//         </>
//     )
// }

// export default ExpenseIndex