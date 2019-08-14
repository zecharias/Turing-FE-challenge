import React from 'react';

const Arrow = (props) => {
    return ( 
        <>
            <div className="page__arrow-wrap" onClick={props.click}>
                <svg className="page__svg">
                    <use href={props.svg} />
                </svg>
            </div>
        </>
    );
}
 
export default Arrow;