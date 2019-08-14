import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import StripeCheckout from "react-stripe-checkout";
import Popup from '../components/Popup';

class FinalizeOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "Place your addional info...",
      popup: false,
      mess: '', 
      redirect: false,
      close: true,
      url: 'https://backendapi.turing.com/'
    };
  }

  closePopup = ()=>{
      this.setState({popup: false})
  }

  handleInputsChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //Whole function which handles Stripe charge(two ajax calls), used in Stripe Checkout component

  onToken = token => {
    const { description, url } = this.state;
    const { authToken, orderId, amount } = this.props;
    const funct = () => {
      this.setState({ popup: true, mess: 'Transaction complete!', redirect: true, close: false });
    }
    if(!description){
        this.setState({description: 'No data'})
    }
    $.ajax({
      url: `${url}stripe/charge`,
      headers: { "user-key": authToken },
      type: "POST",
      data: {
        stripeToken: token.id,
        order_id: orderId,
        description,
        amount: Math.floor(amount * 100),
        currency: "USD"
      },
      success: function(resp) {
        $.ajax({
          url: `${url}stripe/webhooks`,
          headers: { "user-key": authToken },
          type: "POST",
          success: res => funct(),
          error: err => {
              this.setState({
                  err: true,
                  text: 'Sorry, something went wrong. Try again later.',
                  redirect: true,
                  close: false})}})},
      error: function(error) {}
    })
  }

  //Finalizing order and redirecting to home when user is logged out
  render() {
    const { authToken } = this.props;
    const { description, popup, mess, redirect, close } = this.state;
    if (authToken) {
      return (
        <>
          <section className="stripe">
            <div className="stripe__wrap">
              <h2 className="stripe__head">Checkout</h2>
              <textarea
                onChange={this.handleInputsChange}
                name="description"
                value={description}
                placeholder="Place your addional info..."
                cols="30"
                rows="10"
                className="stripe__description"
                required
              />
              <StripeCheckout
                token={this.onToken}
                stripeKey="pk_test_NcwpaplBCuTL6I0THD44heRe"
              >
                <button className="product__btn">Pay with credit card</button>
              </StripeCheckout>
            </div>
            {/* Popup which will display all errors and messages */}
            {popup? 
            <Popup
              text={mess}
              close={close}
              redirect={redirect}
              click={this.closePopup.bind(this)}
            />: null}
          </section>
        </>
      );
    } else {
      return (<Redirect to="/" exact />)
    }
  }
}

export default FinalizeOrder;
