import React from 'react';

const Category = (props) => {
    return ( 
        <>
            <li 
            style={props.chosenCat? {backgroundColor: '#BA265D', color: '#fff' }: {}}
            className="categories__item" 
            onClick={()=>{
                props.filterProd()
                props.changeCat()}}>
                <h3 className="categories__title">{props.name}</h3>
            </li>
        </>
     );
}
 
export default Category;