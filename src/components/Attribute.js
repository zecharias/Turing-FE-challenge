import React from 'react';

const Attribute = (props) => {
    return (  
        <>
        {props.type==='Colors'? 
        <>
            <span 
                onClick={props.click}
                className="attributes__color" 
                style={{backgroundColor: `${props.value}`, border: `${props.isActive? '4px solid #eb2f64' : 'none'}`}}>
            </span>
        </>
        : <><span 
                onClick={props.click}
                className="attributes__size"
                style={props.isActive? {backgroundColor: '#eb2f64', color: 'white'} : null}>
                {props.value}
            </span>
        </>}
        
        </>
    );
}
 
export default Attribute;