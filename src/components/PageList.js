import React from 'react';
import Arrow from './Arrow';
import Svg from '../img/symbol-defs.svg';

const PageList = (props) => {

    return ( 
        <>
        <div className="page__list">
            <Arrow click={()=>{
                props.click(1);
            }} svg={Svg + '#icon-previous2'} />
            <Arrow click={()=>{
                props.click(props.accPage-1)
            }} svg={Svg + '#icon-circle-left'} />
            <span className="page__display">{props.accPage}</span>
            <Arrow click={()=>{
                props.click(props.accPage+1)
            }} svg={Svg + '#icon-circle-right'} />
            <Arrow click={()=>{
                props.click(props.pages)
            }} svg={Svg + '#icon-next2'} />
        </div>
        </>
    );
}
 
export default PageList;