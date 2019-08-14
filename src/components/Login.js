import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import $ from 'jquery';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email: "",
            password: "",
            err: '',
            url: 'https://backendapi.turing.com/'
        }
    }

    //Facebook sign in function which goes into React Facebook Login component

    responseFacebook = (res) =>{
        const { url } = this.state
        const getCartId = this.props.getCartId;
        const userData = this.props.getUserData;
        const succeed =()=> this.props.onSucceed()
        const funct = ()=>{
            this.setState({err: 'Something went wrong, try again later.'})
        }
        $.ajax({
            url: `${url}customers/facebook`,
            type: "POST",
            data: { access_token: res.accessToken },
            success: (res)=>{ getCartId(res.accessToken);
                userData(res.accessToken);
                succeed();},
            error: (res)=>{funct()}
        })
        
    }

    handleInputsChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loginUser = (e) =>{
        e.preventDefault();
        const { url } = this.state
        const getCartId = this.props.getCartId;
        const userData = this.props.getUserData;
        const succeed =()=> this.props.onSucceed();
        const error = ()=> this.setState({err: 'Wrong email or password'})
        const { email, password } = this.state;
        if(password.length<6 || !email.includes('@')){
            this.setState({err: 'Password must be 6 letters long.'})
        }else{
        $.ajax({
            url: `${url}customers/login`,
            data: {email: email, password: password },
            type: "POST",
            success: (resp) => {
                getCartId(resp.accessToken);
                userData(resp.accessToken);
                succeed();
                },
            error: ()=>error()
        })}
        
    }

    //Displaying login inputs and when user is successfully logged in redirecting him to home

    render() { 
        const { email, password, err } = this.state;
        const { succeed } = this.props
        if(!succeed){
        return (  
            <>
            <form target='_blank' onSubmit={this.loginUser} className="loginPanel__login">
                <input 
                onChange={this.handleInputsChange}
                value={email}
                name='email'
                type="email" 
                placeholder='Email' 
                className="loginPanel__input"/>
                <input 
                onChange={this.handleInputsChange}
                value={password}
                name='password'
                type="password" 
                placeholder='Password' 
                className="loginPanel__input"/>
                <button type='submit' className="product__btn">Login</button>
            </form>
            <span className="loginPanel__error">{err}</span>

            <div className="loginPanel__redirect">
                 <span className="loginPanel__redirect--span">
                    Don't have an account?
                 </span>
                 <NavLink to='/loginpanel/register' onClick={this.props.click}>
                    Register
                 </NavLink>
            </div>
            <FacebookLogin 
                appId='352854622106208' 
                autoLoad={false} 
                fields='name, email'
                callback={this.responseFacebook.bind(this)}
                render={ renderProps=>(
                <button onClick={renderProps.onClick} className='loginPanel__facebook product__btn'>
                    Continue with Facebook 
                    <svg className="header__svg">
                        <use href={this.props.icon + '#icon-facebook2'} />
                    </svg>
                </button>)}
            />
    
            </>
        )}else{
            return( <Redirect to='/' exact/>)
        }
    }
}
 
export default Login;