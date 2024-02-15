import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/auth/Auth';
import { useState, useEffect  } from 'react';
import TaskIndex from './components/tasks/TaskIndex'
// import ReceiptCreate from './components/receipts/'
import Logout from './components/auth/login/Logout';
import ReceiptCreate from './components/receipts/ReceiptCreate';
import TaskEdit from './components/tasks/TaskEdit';



function App() {

  const [ sessionToken, setSessionToken ] = useState('');

  // console.log('App:', sessionToken);

  const updateToken = newToken => {
    localStorage.setItem('token', newToken)
    setSessionToken(newToken)
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'))
    }
  }, [])


  return (
    <div className="App">
      {
        sessionToken !== '' ?
        <Logout setToken={setSessionToken}/> : null
      }
      <Routes>
        <Route 
          path='/'
          element={<Auth updateToken={updateToken}/>}
        />
        <Route 
          path='/tasks'
          element={<TaskIndex token={sessionToken}/>}
        />
        <Route 
          path='/tasks/update/:id'
          element={<h1>Hello world</h1>}
        />
        <Route 
          path='/receipts/add/:id'
          element={<ReceiptCreate token={sessionToken}/>}
        />
        <Route
        path='/tasks/update/:id'
        element={<TaskEdit token={sessionToken} />}
        />
      </Routes>
    </div>
  );
}

export default App;
