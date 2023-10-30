import { AppBar, Toolbar } from '@mui/material'
import React from 'react';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
    const auth = useAuth();
  return (
    <AppBar sx={{ bgcolor:"white",position:"static",boxShadow:"none"}}>
        <Toolbar sx={{ display:"flex"}}>
        <Logo/>
        <div>{ auth?.isLoggedIn ? (<>
        <NavigationLink to={'/chat'} bg={'rgb(195, 53, 53)'} text={'Go to chat'} textColor={'white'}></NavigationLink>
        <NavigationLink to={'/'} bg={'rgb(195, 142, 27)'} text={'logout'} textColor={'black'} onClick={auth.logout}></NavigationLink>
        </>):(<>
        <NavigationLink to={'/login'} bg={'rgb(195, 53, 53)'} text={'Login'} textColor={'white'}></NavigationLink>
        <NavigationLink to={'/signup'} bg={'rgb(195, 142, 27)'} text={'Signup'} textColor={'black'} ></NavigationLink>        
        
        </>)}

        </div>
        </Toolbar>
    </AppBar>
  )
}

export default Header