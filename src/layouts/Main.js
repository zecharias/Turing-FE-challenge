import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Shop from '../pages/Shop';
import ProductDetails from '../pages/ProductDetails';
import UserInfo from '../pages/UserInfo';
import Cart from '../pages/Cart';
import Order from '../pages/Order';
import FinalizeOrder from '../pages/FinalizeOrder';

class Main extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    //Routing to main sections of the page

    setOrderId = (orderId, amount)=>{
        this.setState(prevState=>({orderId, amount}))
    }
    
    render() { 
        const { authToken, cartId } = this.props;
        const { orderId, amount } = this.state
        return ( 
            <Switch>
                <Route path='/order' exact render={(matchProps)=><Order set={this.setOrderId.bind(this)} authToken={authToken} cartId={cartId} {...matchProps}/>}/>
                <Route path='/order/finalize' exact render={(matchProps)=><FinalizeOrder authToken={authToken} orderId={orderId} amount={amount} {...matchProps}/>} />
                <Route path='/cart' exact render={()=><Cart authToken={authToken} cartId={cartId}/>}/>
                <Route path='/user' exact render={()=><UserInfo authToken={authToken}/>}/>
                <Route path='/details/:id' exact render={(propsMatch)=><ProductDetails authToken={authToken} cartId={cartId} {...propsMatch}/>} />
                <Route path='/' component={Shop}/>
            </Switch>
        );
    }
}
 
export default Main;