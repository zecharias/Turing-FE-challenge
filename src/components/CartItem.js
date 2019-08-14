import React from 'react';

const CartItem = (props) => {
    const { data, url, remove, update } = props
    return (  
        <>
        <li className="cart__item">
            <button onClick={()=>{props.remove()}} className="cart__item--remove">
                <span></span>
            </button>
            <figure className="cart__img-wrap">
                <img src={url+'images/products/' + data.image} alt="Item" className="cart__img"/>
            </figure>
            <h4 className="cart__item--head">{data.name}</h4>
            <span className="cart__item--att">{data.attributes}</span>
            <span className="cart__item--price">{data.price}$</span>
            <div className="cart__item-quan">
                <button 
                onClick={()=>{
                    if(data.quantity!==1){
                    update(data.quantity-1)}
                    else{remove()}
                }} 
                className="cart__btn">
                    <span className="cart__btn--dec"></span>
                </button>
                <span className="cart__quan--content">{data.quantity}</span>
                <button 
                onClick={()=>{
                    update(data.quantity+1)
                }} 
                className="cart__btn">
                    <span className="cart__btn--add"></span>
                </button>
            </div>
            <span className="cart__item--total">
                {data.subtotal}$
            </span>
        </li>
        </>
    );
}
 
export default CartItem;