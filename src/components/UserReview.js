import React, { Component } from 'react';
import Stars from './Stars';
import $ from 'jquery';
import Popup from './Popup';

class UserReview extends Component {
    constructor(props){
        super(props);
        this.state = {
            rating: 1,
            review: '',
            err: false,
            url: 'https://backendapi.turing.com/'
        }
    }

    closePopup= ()=>{
        this.setState({err: false})
    }

    handleStars = value =>{
        if(value!==this.state.rating){
            this.setState({rating: value});
        }
    }

    handleReview = (e) =>{
        this.setState({review: e.target.value})
    }

    //User review handler, which will display errors and messages

    handleSubmit=(e)=>{
        e.preventDefault();
        const { rating, review, url } = this.state;
        const { id, authToken } = this.props;
        const setPopup = (obj)=>this.setState(obj)
        if(review && authToken){
            $.ajax({
                url: `${url}products/${id}/reviews`,
                headers: { 'user-key': authToken },
                type: "POST",
                data: { product_id: id, review, rating},
                success: (res)=>{setPopup({err: true, close: true, text: "Review sent!", redirect: false})},
                error: (err)=> {setPopup({err: true, close: true, text: "Thank you for your opinion!", redirect: false})}
            })
        }else if(!review){
            this.setState({
                err: true,
                close: true,
                text: 'Review can not be empty!',
                redirect: false
            })
        }else if(!authToken){
            this.setState({
                err: true,
                close: true,
                text: 'You have to be logged in to add an review.',
                redirect: false
            })
        }
    }
    render() { 
        //Rendering user review form and popup when it's necessary
        const { rating, review, err, text, redirect, close } = this.state;
        const { icon } = this.props;
        return (  
            <>
            <form onSubmit={this.handleSubmit} className="user-review__wrap">
                <h3 className="user-review__head">Review this item</h3>
                <textarea value={review} onChange={this.handleReview} name="review" id="review" placeholder='Review...'  className="user-review__review" type='text'></textarea>
                <Stars 
                    icon={icon} 
                    rating={rating} 
                    click={this.handleStars.bind(this)}
                />
                <div className="user-review__btn-wrap">
                    <button className="product__btn" onClick={this.handleSubmit}>Post a review</button>
                </div>
            </form>
            {err? 
            <Popup
                text={text}
                redirect={redirect}
                close={close}
                click={this.closePopup.bind(this)}
            />:null}
            </>
        );
    }
}
 
export default UserReview;