import React, { Component } from 'react';
import Review from './Review';

class Reviews extends Component {
    constructor(props){
        super(props);
        this.state={
            reviews: []
        }
    }

    componentDidMount(){
        fetch(`${this.props.url}products/${this.props.id}/reviews`)
        .then(res=> res.json())
        .then(data => this.setState(prevState=>({reviews: data})))
        .catch(err => err)
    }

    //Fetching and displaying all reviews from other users

    render() { 
        const { reviews } = this.state;
        const ReviewsList = reviews.map(item => 
        <Review 
            key={Math.random()} 
            data={item}
            icon={this.props.icon}
        />)
        return (  
            <>
                <div className="reviews__list">
                    {ReviewsList}
                </div>
            </>
        );
    }
}
 
export default Reviews;