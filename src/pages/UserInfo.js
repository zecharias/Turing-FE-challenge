import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import ArrowBack from '../components/ArrowBack';
import Popup from '../components/Popup';

class UserInfo extends Component {
    constructor(props){
        super(props);
        this.state={
            name: '',
            email: '',
            password: '',
            day_phone: '',
            eve_phone: '',
            mob_phone: '',
            address_1: '',
            address_2: '',
            city: '',
            region: '',
            postal_code: '',
            country: '',
            shipping_region_id: '',
            credit_card: '',
            authToken: this.props.authToken,
            err: false,
            url: `https://backendapi.turing.com/`
        }
    }

    closePopup = ()=>{
        this.setState({err: false})
    }

    //Fetching all user information and displaying it on screen
    componentDidMount() {
        const { authToken, url } = this.state
        const setData = (data)=> this.setState(prevState=>{
            const { name, email, password, day_phone, eve_phone, mob_phone, address_1, address_2 ,city, region, postal_code, country, shipping_region_id} = data;
            return {name, email, password, day_phone, eve_phone, mob_phone, address_1, address_2, city, region, postal_code, country, shipping_region_id}})
        $.ajax({
            url: `${url}customer`,
            headers: { 'user-key': authToken },
            type: "GET",
            success: (res)=>{
                console.log(res);
                setData(res);

            },
            error: (err)=>{}
        })
    }

    handleInputsChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //Sending data in 3 forms, and displaying message or error

    submitFormSt = (e) =>{
        const setPopup = (data) =>{this.setState(data)}
        e.preventDefault();
        const { name, email, password, day_phone, eve_phone, mob_phone, authToken, url } = this.state;
        if(name && email){
        $.ajax({
            url: `${url}customer`,
            headers: { 'user-key': authToken },
            data: {name, email, password, day_phone, eve_phone, mob_phone },
            type: "PUT",
            success: function(resp) {setPopup({err: true, close: true, redirect: true, text: 'Your personal data has been successfully changed.'})},
            error: function(error) { setPopup({err: true, close: true, redirect: true, text: 'Something went wrong, try again later.'})}
        })}
    }

    submitFormNd = (e) =>{
        const setPopup = (data) =>{this.setState(data)}
        e.preventDefault();
        const { address_1, address_2, city, region, postal_code, country, shipping_region_id, authToken, url } = this.state;
        if(address_1 && city && region && postal_code && country && shipping_region_id){$.ajax({
            url: `${url}customers/address`,
            headers: { 'user-key': authToken },
            data: {address_1, address_2, city, region, postal_code, country, shipping_region_id },
            type: "PUT",
            success: function(resp) {setPopup({err: true, close: true, redirect: true, text: 'Your personal data has been successfully changed.'})},
            error: function(error) { setPopup({err: true, close: true, redirect: true, text: 'Something went wrong, try again later.'})}
        })}
    }

    submitFormRd = (e) =>{
        const setPopup = (data) =>{this.setState(data)}
        e.preventDefault();
        const { credit_card, authToken, url } = this.state;
        if(credit_card){$.ajax({
            url: `${url}customers/creditCard`,
            headers: { 'user-key': authToken },
            data: {credit_card },
            type: "PUT",
            success: function(resp) {setPopup({err: true, close: true, redirect: true, text: 'Your personal data has been successfully changed.'})},
            error: function(error) { setPopup({err: true, close: true, redirect: true, text: 'Something went wrong, try again later.'})}
        })}
    }

    //Rendering whole data from user in 3 form
    render() { 
        const { name, email, password, day_phone, eve_phone, mob_phone, address_1, address_2, city, region, postal_code, country, shipping_region_id, credit_card, authToken, err, redirect, close, text } = this.state;
        if(authToken){
        return (  
            <>
            <section className="user-info">
                <div className="user-info__wrap">
                <h3 className="user-info__head">Update your personal data</h3>
                <ArrowBack/>
                <div className="user-info__forms">
                <form onSubmit={this.submitFormSt} className="user-info__form">
                    <input 
                    type="text" 
                    placeholder='Name' 
                    name='name'
                    className="user-info__input"
                    onChange={this.handleInputsChange}
                    value={name}
                    required
                    />
                    <input 
                    type="email" 
                    placeholder='Email' 
                    name='email'
                    className="user-info__input"
                    onChange={this.handleInputsChange}
                    value={email}
                    required
                    />
                    <input 
                    type="password" 
                    placeholder='Password' 
                    name='password'
                    className="user-info__input"
                    onChange={this.handleInputsChange}
                    value={password}
                    />
                    <input 
                    type="text" 
                    placeholder='Day Phone' 
                    name='day_phone'
                    className="user-info__input"
                    onChange={this.handleInputsChange}
                    value={day_phone}
                    />
                    <input 
                    type="text" 
                    placeholder='Eve Phone' 
                    name='eve_phone'
                    className="user-info__input"
                    onChange={this.handleInputsChange}
                    value={eve_phone}
                    />
                    <input 
                    type="text" 
                    placeholder='Mobile Phone' 
                    name='mob_phone'
                    className="user-info__input"
                    onChange={this.handleInputsChange}
                    value={mob_phone}
                    />
                    <button type="submit" className="product__btn">
                        Update
                    </button>
                </form>
                <form onSubmit={this.submitFormNd} className="user-info__form">
                    <input 
                    type="text" 
                    placeholder='First Address' 
                    name='address_1'
                    className="user-info__input"
                    onChange={this.handleInputsChange}
                    value={address_1}
                    required
                    />
                    <input 
                    type="text" 
                    placeholder='Second Address' 
                    name='address_2'
                    className="user-info__input"
                    onChange={this.handleInputsChange}
                    value={address_2}
                    />
                    <input 
                    type="text" 
                    placeholder='City' 
                    name='city'
                    className="user-info__input"
                    onChange={this.handleInputsChange}
                    value={city}
                    required
                    />
                    <input 
                    type="text" 
                    placeholder='Region' 
                    name='region'
                    className="user-info__input"
                    onChange={this.handleInputsChange}
                    value={region}
                    required
                    />
                    <input 
                    type="text" 
                    placeholder='Postal Code' 
                    name='postal_code'
                    className="user-info__input"
                    onChange={this.handleInputsChange}
                    value={postal_code}
                    required
                    />
                    <input 
                    type="text" 
                    placeholder='Country' 
                    name='country'
                    className="user-info__input"
                    onChange={this.handleInputsChange}
                    value={country}
                    required
                    />
                    <input 
                    type="text" 
                    placeholder='Shipping Region' 
                    name='shipping_region_id'
                    className="user-info__input"
                    onChange={this.handleInputsChange}
                    value={shipping_region_id}
                    required
                    />
                    <button type="submit" className="product__btn">
                        Update
                    </button>
                </form>
                <form onSubmit={this.submitFormRd} className="user-info__form">
                    <input 
                    type="text" 
                    placeholder='Credit Card' 
                    name='credit_card'
                    className="user-info__input"
                    onChange={this.handleInputsChange}
                    value={credit_card}
                    required
                    />
                    <button type="submit" className="product__btn">
                        Update
                    </button>
                </form>
                </div>
                </div>
            </section>
            {/* Popup which will display errors and messages */}
            {err?<Popup 
                close={close} 
                redirect={redirect} 
                text={text} 
                click={this.closePopup.bind(this)}
            />:null}
            </>
        );}
        else{
            return(
                <Redirect to='/shop' exact/>
            )
        }
    }
}
 
export default UserInfo;