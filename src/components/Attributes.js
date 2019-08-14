import React, { Component } from 'react';
import Attribute from './Attribute';
import $ from 'jquery';
import Popup from './Popup';

class Attributes extends Component {
    constructor(props){
        super(props);
        this.state = {
            attributes: [],
            chosenSize: '',
            chosenColor: ''
        }
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    //Attribute control component, fetching data about sizes and colors 

    componentDidMount(){
        fetch(`${this.props.url}attributes/inProduct/${this.props.id}`)
        .then(res=> res.json())
        .then(data => this.setState(prevState=>({attributes: data})))
        .catch(err => err)
    }

    closePopup = ()=>{
        this.setState({err: false})
    }

    changeChosen = (type, value) =>{
        if(type==='color'){
            this.setState(prevState=>({
                chosenColor: value
            }))
        }else{
            this.setState(prevState=>({
                chosenSize: value
            }))
        }
    }

    getSizes = () =>{
        const { attributes, chosenSize } = this.state;
        let arr=[];
        attributes.forEach(item => {
        if(item.attribute_name==='Size'){
            return arr.push(
                <Attribute 
                    key={Math.random()} 
                    type={'Size'} 
                    value={item.attribute_value} 
                    click={this.changeChosen.bind(this, 'size', item.attribute_value)}
                    isActive={chosenSize===item.attribute_value? true : false}
                />)
        }else return false});
        return arr;
    }

    getColors = () =>{
        const { attributes, chosenColor } = this.state;
        let arr=[];
        attributes.forEach(item => {
        if(item.attribute_name==='Color'){
            return arr.push(
                <Attribute 
                    key={Math.random()} 
                    type={'Colors'} 
                    value={item.attribute_value}
                    click={this.changeChosen.bind(this, 'color', item.attribute_value)} 
                    isActive={chosenColor===item.attribute_value? true : false}
                />)
        }else return false});
        return arr;
    }

    addItemToCart = ()=>{
        const setPopup = (obj)=>this.setState(obj);
        const { chosenColor, chosenSize} = this.state;
        const { authToken, cartId } = this.props;
        if(chosenColor && chosenSize && authToken){
        $.ajax({
            url: `${this.props.url}shoppingcart/add`,
            headers: { 'user-key': authToken},
            type: "POST",
            data: { cart_id: cartId, product_id: this.props.id, attributes: `${chosenColor}, ${chosenSize}`},
            success: (res)=>{
                setPopup({text: 'You haave successfully added item to your cart.',
                    close: true,
                    err: true,
                    redirect: true})},
            error: (err)=>setPopup({text: 'Something went wrong, try again later.',
            close: true,
            err: true,
            redirect: true})
        })}else if(!authToken){
            this.setState({
                text: 'You have to be logged in to add items to cart.',
                close: true,
                err: true,
                redirect: false})
        }else{
            this.setState({
                text: 'Choose color and size first.',
                close: true,
                err: true,
                redirect: false})
        }
    }

    render() { 
        //Mapping smaller one into array
        const Sizes = this.getSizes();
        const Colors = this.getColors();
        const { err, text, close, redirect } = this.state
        return (  
            <>
            <div className="attributes__colors">
                {Colors}
            </div>
            <div className="attributes__sizes">
                {Sizes}
            </div>
            <button onClick={this.addItemToCart} className="attributes__btn">
                Add to cart
                <svg className="attributes__svg">
                    <use href={this.props.icon + '#icon-cart'} />
                </svg>
            </button>
            {err? 
            <Popup
                text={text}
                close={close}
                redirect={redirect}
                click={this.closePopup.bind(this)}
            /> : null}
            </>
        );
    }
}
 
export default Attributes;