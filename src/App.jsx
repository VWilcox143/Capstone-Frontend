import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/auth/Auth';
import { useState, useEffect  } from 'react';
import TaskIndex from './components/tasks/TaskIndex'


function App() {

  const [ sessionToken, setSessionToken ] = useState('');

  console.log('App:', sessionToken);

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
      <Routes>
        <Route 
          path='/'
          element={<Auth updateToken={updateToken}/>}
        />
        <Route 
          path='/tasks'
          element={<TaskIndex token={sessionToken}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
