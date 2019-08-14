import React from 'react';
import Category from './Category';

const Categories = (props) => {

    const CatList = props.categories.map(item => 
        <Category 
            key={item.category_id} 
            name={item.name}
            chosenCat={props.chosenCat===item.category_id? true: false}
            changeCat={()=>{props.changeCat(item.category_id)}}
            filterProd={()=>{
            props.filterProd('filCat', item.category_id)
            }}
        />);
    return ( 
        <>
        <section className="categories">
            <h3 className="categories__head">Categories</h3>
            <ul className="categories__list">
                {CatList}
            </ul>
        </section>
        </>
     );
}
 
export default Categories;