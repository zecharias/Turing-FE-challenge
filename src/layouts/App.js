import React, { Component } from 'react';
import Main from './Main';
import { BrowserRouter as Router } from 'react-router-dom';
import $ from 'jquery';
import '../sass/main.scss';
import Header from './Header';
import Footer from './Footer';


class App extends Component {
    state = { 
        authToken: '',
        cartId: '',
        url: "https://backendapi.turing.com/"
    }

    //Function which generates cart id and token, and passes them to lower components

    getCartId = (authToken) =>{
        this.setState({authToken});
        const setCartId = (id)=>{
            this.setState({cartId: id});
        }
        $.ajax({
            url: `${this.state.url}shoppingcart/generateUniqueId`,
            headers: { 'user-key': authToken },
            type: "GET",
            success: function(resp) { setCartId(resp.cart_id) },
            error: function(error) { console.log(error.responseText); }
        })
    }

    render() { 
        const { authToken, cartId, url } = this.state;
        return ( 
            <Router>
                <div className='container'>
                    <Header url={url} authToken={authToken} getCartId={this.getCartId.bind(this)}/>
                    <main className='main'>
                    <Main url={url} authToken={authToken} cartId={cartId}/>
                    </main>
                    <Footer/>
                </div>
            </Router> 
        );
    }
}
 
export default App;