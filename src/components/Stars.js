import React from 'react';

const Stars = (props) => {
    const { icon, rating } = props;
    return (  
        <>
        <div className="user-review__stars">
            <svg onClick={()=>{
                props.click(1);
            }}className="reviews__star" style={rating>=1? {fill: '#BA265D'} : {fill: '#ccc'}}>
                <use href={icon + '#icon-star-full'}/>
            </svg>
            <svg onClick={()=>{
                props.click(2);
            }}className="reviews__star" style={rating>=2? {fill: '#BA265D'} : {fill: '#ccc'}}>
                <use href={icon + '#icon-star-full'} />
            </svg>
            <svg onClick={()=>{
                props.click(3);
            }}className="reviews__star" style={rating>=3? {fill: '#BA265D'} : {fill: '#ccc'}}>
                <use href={icon + '#icon-star-full'}/>
            </svg>
            <svg onClick={()=>{
                props.click(4);
            }}className="reviews__star" style={rating>=4? {fill: '#BA265D'} : {fill: '#ccc'}}>
                <use href={icon + '#icon-star-full'}/>
            </svg>
            <svg onClick={()=>{
                props.click(5);
            }}className="reviews__star" style={rating>=5? {fill: '#BA265D'} : {fill: '#ccc'}}>
                <use href={icon + '#icon-star-full'}/>
            </svg>
        </div>
        </>
    );
}
 
export default Stars;