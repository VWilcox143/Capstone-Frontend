import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Auth from './components/auth/Auth';
import { useState, useEffect  } from 'react';
import TaskIndex from './components/tasks/TaskIndex'
import Logout from './components/auth/login/Logout';
import TaskEdit from './components/tasks/TaskEdit';
import ReceiptEdit from './components/receipts/ReceiptEdit';
import TaskDetail from './components/tasks/TaskDetail';
import ReceiptIndex from './components/receipts/ReceiptIndex';
// import './Tailwind.css';



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
  // Exclude the login page from having logo header.
  const location = useLocation();

  const onLoginPage = location.pathname === '/'


  return (
    // Exclude the login page from having logo header.
    <div className="App">
      {!onLoginPage && (
      <h1 className='logoHeader'>
      <img src='../../../../Joblogo.png' alt='logo' style={{ width: '300px', height: 'auto', display: 'block', margin: '0 auto', padding: '10px' }}></img>
      </h1>
      )}
      {/* //  <div className="border-solid">  */}
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
          path='/receipts/add/:id'
          element={<ReceiptIndex token={sessionToken}/>}
        /> 
        <Route
        path='/tasks/update/:id'
        element={<TaskEdit token={sessionToken} />}
        />
        <Route
        path='/receipts/update/:id'
        element={<ReceiptEdit token={sessionToken} />}
        />
        <Route
        path='/tasks/tasks/:id'
        element={<TaskDetail token={sessionToken} />}
        />
      </Routes>
    </div>
  );
}

export default App;
