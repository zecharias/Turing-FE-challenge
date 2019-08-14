import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Icon from '../img/symbol-defs.svg';
import Close from '../img/close-big-red.png';

class LoginPanel extends Component {
    constructor(props){
        super(props);
        this.state={
            head: this.props.match.params.action,
            succeed: false
        }
    }

    changeSucceed=()=>{
        this.setState({succeed: true})
    }

    changeHead = () => {
        if(this.state.head==='login'){
            this.setState(prevState=>({head: 'register'}))
        }else{this.setState(prevState=>({head: 'login'}))}
    }
    render() { 
        const { head, succeed } = this.state;
        return (  
            <>
            <section className="loginPanel">
                <div className="loginPanel__wrap">
                    <h2 className="loginPanel__head">{head}</h2>
                    {head==='login'? 
                    <Login 
                        icon={Icon} 
                        click={this.changeHead}
                        getCartId={this.props.getCartId}
                        getUserData={this.props.getUserData}
                        onSucceed={this.changeSucceed.bind(this)}
                        succeed={succeed}
                    /> : 
                    <Register 
                        getCartId={this.props.getCartId}
                        click={this.changeHead}
                        getUserData={this.props.getUserData}
                        onSucceed={this.changeSucceed.bind(this)}
                        succeed={succeed}
                    />}
                <figure className="loginPanel__close">
                    <NavLink to='/' exact>
                        <img src={Close} alt="close" className="loginPanel__close--img"/>
                    </NavLink>
                </figure>
                </div>
            </section>
            </>
        );
    }
}
 
export default LoginPanel;