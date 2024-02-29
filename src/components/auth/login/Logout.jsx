import React from 'react'
import {useNavigate} from 'react-router-dom';
import { Button } from 'reactstrap';

const style = {
  float: 'right',
  margin: '.5rem'
}

function Logout({setToken}) {

  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem('token')//clear token
    setToken('')//reset state to empty string
    navigate('/')//route back to Auth
    
  }
  const style = { position: 'fixed', top: '10px', right: '10px', color: 'black'};
  return (
    
    <>
        <Button 
            style={style}
            color='dark'
            outline
            // secondary
            onClick={signout}>
                Log Out
            </Button>           
    </>
  )
}

export default Logout