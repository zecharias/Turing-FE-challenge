import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import $ from 'jquery';
import LoginPanel from '../pages/LoginPanel';
import Icon from '../img/symbol-defs.svg';
import UserBar from '../components/UserBar';

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            authToken: this.props.authToken,
            data: '',
            url: this.props.url

        }
    }

    setDataHeader = (data) =>{
        this.setState({data});
    }

    //Fetching user data and placing it in state

    getUserData = (authToken) =>{
        const user= this.setDataHeader;
        if(authToken!==''){
            $.ajax({
            url: `${this.state.url}customer`,
            headers: { 'user-key': authToken },
            type: "GET",
            success: function(resp) { user(resp) },
            error: function(error) { }
            })
        }
    }

    //If user is logged in component start to fetch data 

    componentDidMount() {
        const { authToken } = this.state;
        const user= this.setDataHeader;
        if(authToken!==''){
            $.ajax({
            url: `${this.state.url}customer`,
            headers: { 'user-key': authToken },
            type: "GET",
            success: function(resp) { user(resp) },
            error: function(error) { }
            })
        }
    }


    render() { 
        const { data, authToken, url } = this.state;
        return (  
            <>
            <header className="header">
                <div className="header__user-bar">
                    <UserBar url={url} data={data? data : ''} authToken={authToken? authToken : ''}/>
                    <Route path='/loginpanel/:action' render={(props)=>
                    <LoginPanel 
                    getCartId={this.props.getCartId}
                    getUserData ={this.getUserData.bind(this)} 
                    {...props}/>}/>
                </div>
                <NavLink to='/' exact className="header__logo-bar">
                    Shopmate
                </NavLink>
                <div className="header__cart-bar">
                    <NavLink to='/cart' exact>
                    <h4 className="header__cart-head">Your cart</h4>
                    <svg className="header__svg">
                        <use href={Icon + '#icon-cart'} />
                    </svg>
                    </NavLink>
                </div>
                <div className="header__img">
                    <h1 className="header__head">Best t-shirts, best prices...</h1>
                </div>

            </header>
            </>
        );
    }
}
 
export default Header;