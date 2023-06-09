import Box from '@mui/material/Box';

import Logo from "../../images/logo.png";
import { Outlet } from 'react-router-dom';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3}} style={{background:"none"}}>
      <header className='appBar'>
        <img src={Logo} alt="" style={{height: "5rem", margin:"1rem"}}/>
        <h1>Deck Of Cards Game</h1>
     
      </header>
      <Outlet />
    </Box>
  )
}

export default Header