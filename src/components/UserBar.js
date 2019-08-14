import React from 'react';
import { NavLink } from 'react-router-dom';

const UserBar = (props) => {
    if(props.data){
        return(
            <>
            <NavLink to='/user' exact>
            <h3 className="header__user">
                Welcome 
                <span className="header__user--name">{props.data.name}</span>!
            </h3>
            </NavLink>
            </>
        )
    }else{
    return (  
        <>
        <NavLink to='/loginpanel/login'>
            Login
        </NavLink>
        <span className="header__span">or</span>
        <NavLink to='/loginpanel/register'>
            Register
        </NavLink>
        </>
    );}
}
 
export default UserBar;