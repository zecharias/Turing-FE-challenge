import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import CartItem from '../components/CartItem';
import Popup from '../components/Popup';

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
             data: [],
             url: 'https://backendapi.turing.com/'
        }
    }

    //All data control functions, which will be passed to chil components

    getTotalAmount = ()=>{
        const funct = (total_amount)=> this.setState(prevState=>({total_amount}));
        const { authToken, cartId } = this.props;
        const { url } = this.state
        $.ajax({
            url: `${url}shoppingcart/totalAmount/${cartId}`,
            headers: { "user-key": authToken },
            type: "GET",
            data: { cart_id: cartId },
            success: (res)=>{funct(res.total_amount)},
            error: (err)=>{}
        })
    }

    fetchFreshCartData = ()=>{
        const funct = (data)=> this.setState(()=>({data}));
        const { cartId, authToken } = this.props;
        const { url } = this.state
        $.ajax({
            url: `${url}shoppingcart/${cartId}`,
            headers: { "user-key": authToken },
            type: "GET",
            success: (res)=>{
                funct(res);
            },
            error: (err)=>{}
        });
        this.getTotalAmount();
    }

    emptyCart = ()=>{
        const { cartId, authToken } = this.props;
        const { url } = this.state;
        const funct = this.fetchFreshCartData.bind(this);
        $.ajax({
            url: `${url}shoppingcart/empty/${cartId}`,
            headers: { "user-key": authToken },
            type: "DELETE",
            async: false,
            data: {cart_id: cartId},
            success: (res)=>{funct()},
            error: (err)=>{}
        })
    }

    updateItem = (id, quantity) =>{
        const { authToken } = this.props;
        const { url } = this.state;
        const funct = this.fetchFreshCartData.bind(this);

        $.ajax({
            url: `${url}shoppingcart/update/${id}`,
            headers: { "user-key": authToken },
            type: "PUT",
            data: { item_id: id, quantity },
            success: (res)=>{funct()},
            error: (err)=>{}
        })
    }

    removeItem = (id) =>{
        const { authToken } = this.props;
        const { url } = this.state;
        // const funct = this.fetchFreshCartData;
        const funct = this.fetchFreshCartData.bind(this);
        $.ajax({
            url: `${url}shoppingcart/removeProduct/${id}`,
            headers: { "user-key": authToken },
            type: "DELETE",
            data: { item_id: id },
            success: ()=> {},
            error: (err)=>{}
        }).done(setTimeout(funct,500))
    }

    

    componentDidMount() {
        this.fetchFreshCartData();
    }
    
    render() {
        const { data, total_amount, url } = this.state 
        //Setting item list from data array
        const itemList = data.map(item => 
        <CartItem
            url={url}
            data={item}
            key={item.item_id}
            remove={this.removeItem.bind(this, item.item_id)}
            update={this.updateItem.bind(this, item.item_id)}

        />)

        //Displaying whole cart when user is logged in, and redirecting to home when he is not

        if(data[0]){
            return (  
                <>
                <section className="cart">
                    <div className="cart__wrap">
                        <h2 className="cart__head">Your Cart</h2>
                        <ul className="cart__list">
                            {itemList}
                        </ul>
                        <button onClick={this.emptyCart} className="cart__btn--options">
                            Empty cart
                        </button>
                        <h3 className="cart__amount"><span>Total amount: </span>{total_amount}$</h3>
                        <NavLink to={{
                            pathname:'/order',
                            amount: total_amount
                        }} className='cart__btn--options'>
                            Create Order
                        </NavLink>
                    </div>
                </section>
                </>
        )}else if(!data[0]){
            return(
                <>
                <section className="cart">
                    <div className="cart__wrap">
                        <h2 className="cart__head">Your Cart</h2>
                        <h2 className="cart__amount">Your cart is empty</h2>
                    </div>
                </section>
                </>
            )}else{
                return(
                <Popup
                    text={'You have to be logged in to see cart.'}
                    close={false}
                    redirect={true}
                />)
        }
    }
}
 
export default Cart;