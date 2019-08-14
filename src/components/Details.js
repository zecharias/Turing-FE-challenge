import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Details extends Component {
    constructor(props){
        super(props);
        this.state={
            productDetails: [],
            locations: [],
            chosenPhoto: '',
            url: 'https://backendapi.turing.com/'
        }
    }

    componentDidMount(){
        const { url } = this.state
        fetch(`${url}products/${this.props.id}/details`)
        .then(res=> res.json())
        .then(data => this.setState(prevState =>({productDetails: data[0], chosenPhoto: data[0].image})))
        .catch(err =>(true))
        fetch(`${url}products/${this.props.id}/locations`)
        .then(res => res.json())
        .then(data => this.setState(prevState => ({locations: data[0]})))
        .catch(err => err);
    }

    //Displaying detail info about product, like gallery and price

    handleImgChange = img =>{
        this.setState({chosenPhoto: img})
    }
    render() { 
        const { productDetails, locations }  = this.state;
        return (  
        <>
        <div className="details__locations">
            <span className="details__loc-att">></span>
            <NavLink to={`/?department=${locations.department_id}`}>
                <span className="details__loc-att">{locations.department_name}</span>
            </NavLink>
            <span className="details__loc-att">></span>
            <NavLink to={`/?category=${locations.category_id}`}>
                <span className="details__loc-att">{locations.category_name}</span>
            </NavLink>
        </div>
        <section className="details__gallery">
            <figure className="details__main">
                <img src={this.props.url + this.state.chosenPhoto} alt="ImgMain" className="details__img-main"/>
            </figure>
            <div className="details__sec">
                <img 
                    onClick={this.handleImgChange.bind(this, this.state.productDetails.image)} 
                    src={`${this.props.url}${productDetails.image}`} 
                    alt="ImgMain" 
                    className="details__img-sec"
                />
                <img 
                    onClick={this.handleImgChange.bind(this, this.state.productDetails.image_2)} 
                    src={`${this.props.url}${productDetails.image_2}`} 
                    alt="ImgSec" 
                    className="details__img-sec"
                />
            </div>
        </section>
        <div className="details__text">
            <h2 className="details__head">{productDetails.name}</h2>
            <p className="details__description">{productDetails.description}</p>
            <div className="details__price-wrap">Price:
                {productDetails.discounted_price==='0.00'? 
                <span className='details__price'>
                    {productDetails.price}
                </span> : 
                <><span className='details__price details__price--lt'>
                    {productDetails.price}$
                </span>
                <span className='details__price details__price--dis'>{productDetails.discounted_price}
                </span></>}
                <svg className="details__svg details__svg--price">
                    <use href={this.props.icon + '#icon-coin-dollar'} />
                </svg>
            </div>
        </div>
        </>
        );
    }
}
 
export default Details;