import React from 'react';
import Product from './Product';
import PageList from './PageList';

const Products = (props) => {
    const { products, page } = props;

    const ProdList = props.products.map(item => <Product 
        key={item.product_id} 
        data={item}
    />)

    const pages = Math.ceil((products.length)/6);

    return ( 
        <>
        <section className="products" >
            <div className="products__list">
            {ProdList.slice((page-1)*6, (page-1)*6+6)}
            </div>
            <PageList pages={pages} accPage={page} click={props.setPage}/>
        </section>
        </>
    );
}
 
export default Products;