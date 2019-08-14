import React from 'react';

const Review = (props) => {
    const { review, name, rating, created_on } = props.data;
    const { icon } = props;
    return ( 
        <>
        <div className="reviews__review">
            <article className="reviews__text">
                {review}
            </article>
            <h4 className="reviews__author">
                {name}
            </h4>
            <span className="reviews__date">
                {created_on.slice(0, 10)}
            </span>
            <div className="reviews__rating">
                <svg className="reviews__star" style={rating>=1? {fill: '#BA265D'} : {fill: 'white'}}>
                    <use href={icon + '#icon-star-full'}/>
                </svg>
                <svg className="reviews__star" style={rating>=2? {fill: '#BA265D'} : {fill: 'white'}}>
                    <use href={icon + '#icon-star-full'} />
                </svg>
                <svg className="reviews__star" style={rating>=3? {fill: '#BA265D'} : {fill: 'white'}}>
                    <use href={icon + '#icon-star-full'}/>
                </svg>
                <svg className="reviews__star" style={rating>=4? {fill: '#BA265D'} : {fill: 'white'}}>
                    <use href={icon + '#icon-star-full'}/>
                </svg>
                <svg className="reviews__star" style={rating>=5? {fill: '#BA265D'} : {fill: 'white'}}>
                    <use href={icon + '#icon-star-full'}/>
                </svg>
            </div>
        </div>
        </>
    );
}
 
export default Review;