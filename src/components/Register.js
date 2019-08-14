import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import $ from 'jquery';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            name: '',
            email: '',
            password: '',
            err: '',
            url: 'https://backendapi.turing.com/'
        }
    }

    handleInputsChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    registerUser = (e) =>{
        e.preventDefault();
        const getCartId = this.props.getCartId;
        const succeed = ()=> this.props.onSucceed();
        const userData = this.props.getUserData;
        const error = ()=> {this.setState({err: 'Something went wrong, try again later.'})}
        const { name, email, password, url } = this.state;
        if(!name || !email.includes('@') || password.length<6){
            this.setState({err: 'Please, pass correct data.'})
        }else{
        $.ajax({
            url: `${url}customers`,
            data: {name: name, email: email, password: password },
            type: "POST",
            success: (res)=>{
                succeed();
                getCartId(res.accessToken);
                userData(res.accessToken);
            },
            error: (err)=>{
                 error()}
        })}
        
    }

    //Displaying Register inputs and when user is successfully registered redirecting him to login section

    render() { 
        const { name, email, password, err } = this.state;
        const { succed } = this.props
        
        if(!succed){
        return (  
            <>
            <form onSubmit={this.registerUser} className="loginPanel__login">
                <input 
                name='name' 
                type="text" 
                placeholder='Name' 
                className="loginPanel__input"
                onChange={this.handleInputsChange}
                value={name}
                />
                <input 
                name='email' 
                type="email" 
                placeholder='Email' 
                className="loginPanel__input"
                onChange={this.handleInputsChange}
                value={email}
                />
                <input 
                name='password' 
                type="password" 
                placeholder='Password' 
                className="loginPanel__input"
                onChange={this.handleInputsChange}
                value={password}
                />
                <button type='submit' onClick={this.registerUser} className="product__btn">Register</button>
            </form>
            <span className="loginPanel__error">{err}</span>
            <div className="loginPanel__redirect">
                 <span className="loginPanel__redirect--span">
                    You have already an account?
                 </span>
                 <NavLink to='/loginpanel/login' onClick={this.props.click}>
                    Login
                 </NavLink>
            </div>
            </>
        )}else if(succed){
            return(<Redirect to='/' exact />)
        }
    }
}
 
export default Register;