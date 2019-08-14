import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import $ from 'jquery';

class Order extends Component {
    constructor(props){
        super(props);
        this.state={
            shippingRegions: [],
            address_1: '', 
            city: '', 
            region: '', 
            postal_code: '', 
            country: '', 
            shipping_region_id: 1,
            shippingDetails: [],
            shipping_id: 1,
            taxes: [],
            amount: this.props.location.amount,
            description: '',
            completeOrder: false,
            url: 'https://backendapi.turing.com/'
        }
    }

    //Fetching whole user data to display it below, and allow user to change it before finalizing order
    componentDidMount() {
        const { url } = this.state
        const { authToken } = this.props
        const setRegions = (data)=> this.setState(prevState=>({shippingRegions: data, regionId: data.shipping_region_id}));
        const setData = (data)=> this.setState(prevState=>{
            const { address_1, city, region, postal_code, country } = data;
            return {address_1, city, region, postal_code, country }});
        const setTaxes = (data) =>{
            this.setState({taxes: data})
        }
        $.ajax({
            url: `${url}customer`,
            headers: { 'user-key': authToken },
            type: "GET",
            success: (res)=>{
                setData(res);

            },
            error: (err)=>{}
        })
        $.ajax({
            url: `${url}tax`,
            type: "GET",
            success: (res)=>setTaxes(res),
            error: (err)=>{}
        })
        $.ajax({
            url: `${url}shipping/regions`,
            type: "GET",
            success: (res)=>setRegions(res),
            error: (err)=>{}
        })
        this.getShippingDetails(1);
    }

    makeOrder = () =>{
        const { cartId, authToken, set } = this.props;
        const { shipping_id, taxes, amount, url } = this.state
        const funct = (data) => this.setState({orderId: data.orderId});
        const setMain = set;
        $.ajax({
            url: `${url}orders`,
            async: false,
            headers: { 'user-key': authToken },
            data: {cart_id: cartId, shipping_id, tax_id: taxes[0].tax_id},
            type: "POST",
            success: (res)=>{funct(res)
                setMain(res.orderId, amount)},
            error: (err)=>{}
        })
    }

    getShippingDetails = (shipping_region_id) =>{
        const { url } = this.state
        const funct = (data)=> this.setState(prevState=>({shippingDetails: data}));
        $.ajax({
            url: `${url}shipping/regions/${shipping_region_id}`,
            success: (res)=>funct(res),
            error: (err)=>{}
        })
    }

    //Submiting form changes user data for later and calls the makeOrder() function
    submitForm = (e) =>{
        e.preventDefault();
        const { address_1, city, region, postal_code, country, shipping_region_id, url } = this.state;
        const { authToken } = this.props
        const makeOrder = this.makeOrder;
        $.ajax({
            url: `${url}customers/address`,
            async: false,
            headers: { 'user-key': authToken },
            data: {address_1, city, region, postal_code, country, shipping_region_id },
            type: "PUT",
            success: function(resp) { makeOrder();},
            error: function(error) {  }
        })
        
    }

    handleInputsChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
        if(e.target.name==='shipping_region_id'){
            this.getShippingDetails(e.target.value);
        }
    }

    delayRedirect = event => {
        const { history: { push } } = this.props;
        event.preventDefault();
        setTimeout(()=>push('/order/finalize'), 1000);
    }


    render() { 

        const { shippingRegions, address_1, city, region, postal_code, country, shippingDetails, shipping_region_id, shipping_id, taxes, amount } = this.state;
        const { authToken } = this.props
        const options = shippingRegions.map(item => (
            <option key={item.shipping_region_id} value={item.shipping_region_id} className='order__option'>{item.shipping_region}</option>
        ));
        const shippingIds = shippingDetails.map(item => (
            <option key={item.shipping_id} value={item.shipping_id} className='order__option'>{item.shipping_type}</option>
        ))
        if(authToken){
        return (  
            <>
            <section className="order">
                <div className="order__wrap">
                    <h2 className="order__head">
                        Shipping and details
                    </h2>
                    <div className="order__tax">
                        <h3 className="order__tax--head">
                            Total: {taxes[0]?Math.round(taxes[0].tax_percentage*0.01*amount, 2)+amount*1: ''}$ ({taxes[0]? taxes[0].tax_type: ''})
                        </h3>
                    </div>
                    <form onSubmit={this.submitForm} className="user-info__form">
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
                    <select onChange={this.handleInputsChange} name="shipping_region_id" value={shipping_region_id} className="order__select" required>
                        {options}
                    </select>
                    <select onChange={this.handleInputsChange} name="shipping_id" value={shipping_id} className="order__select" required>
                        {shippingIds}
                    </select>
                    <Link to={{
                        pathname:'/order/finalize',
                        hash: '#hash',
                    }} 
                    onClick={(e)=>{
                        this.delayRedirect(e);
                        this.submitForm(e)}
                    }
                    className="product__btn"
                    exact>
                        Order &rarr;
                    </Link>
                    </form>
                   
                </div>
            </section>
            </>
        )}
        else{
            return(
            <Redirect to='/' exact />)
        }
    }
}
 
export default Order;