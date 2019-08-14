import React from 'react';

const Department = (props) => {
    return ( 
        <>
            <li 
            style={props.chosenDep? {backgroundColor: '#BA265D', color: '#fff' }: {}}
            className="departments__item" 
            onClick={()=>{
                props.filterCat();
                props.filterProd();
                props.changeDep();
            }}
            >
                <h3 className="departments__head">{props.name}</h3>
            </li>
        </>
    );
}
 
export default Department;