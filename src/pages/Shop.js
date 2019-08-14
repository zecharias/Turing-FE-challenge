import React, { Component } from 'react';  
import queryString from 'query-string';
import Departments from '../components/Departments'; 
import Categories from '../components/Categories';
import Products from '../components/Products';
import SearchBar from '../components/SearchBar';


class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            departments: [],
            categories: [],
            products: [],
            page: 1,
            chosenDep: '',
            chosenCat: '',
            url: 'https://backendapi.turing.com/'
        }
    }

    //Functions for adding active style to the filtered category and department

    changeChosenCat = (numb) =>{
        this.setState({chosenCat: numb})
    }

    changeChosenDep = (numb) =>{
        this.setState({chosenDep: numb})
    }

    //Pagination funtion

    setDefaultPage=(numb)=>{
        if(numb >=1 && numb <=Math.ceil(this.state.products.length/6)){
            this.setState({page: numb})
        }
    }

    //Inital state data fetching

    componentDidMount(){
        const { url } = this.state
        //Fetching Departments Data
        const values = queryString.parse(this.props.location.search);
        if(values.department){
            this.fetchCategories('fil', values.department);
            this.fetchProducts('filDep', values.department);
        }
        if(values.category){
            this.fetchProducts('filCat', values.category);
            this.fetchCategories('all', null)

        }
        if(!values.department && !values.category){
        //Fetching Categories
        this.fetchCategories('all', null)
        //Fetching Products Data
        this.fetchProducts('all', null);
        }
        fetch(`${url}departments`)
        .then(res=> res.json())
        .then(data => this.setState(prevState => ({departments: data})))
        .catch(err =>err);

    }

    //Handling clear filters button

    clearFilters = ()=>{
        const { url } = this.state
        fetch(`${url}departments`)
        .then(res=> res.json())
        .then(data => this.setState(prevState => ({departments: data, page: 1, chosenCat: '', chosenDep: ''})))
        .catch(err =>err);
        this.fetchProducts('all', '');
        this.fetchCategories('all', '');
    }

    //Category fetcher divided into cases

    fetchCategories = (action, params) =>{
        const { url } = this.state
        if(action==='fil'){
            fetch(`${url}categories/inDepartment/${params}`)
            .then(res=> res.json())
            .then(data => this.setState(prevState=>({categories: data, page: 1})))
            .catch(err => err)
        }else{
            fetch(`${url}categories`)
            .then(res=> res.json())
            .then(data => this.setState(prevState=>({categories: data.rows, page: 1})))
            .catch(err =>err);
        }

    }

    //Product Fetcher divided into smaller cases

    fetchProducts = (action, params) =>{
        const { url } = this.state
        if(action==='filDep'){
            fetch(`${url}products/inDepartment/${params}`)
            .then(res=> res.json())
            .then(data => this.setState(prevState=>({products: data.rows, page: 1})))
            .catch(err =>err);
        }else if(action==='filCat'){
            fetch(`${url}products/inCategory/${params}`)
            .then(res=> res.json())
            .then(data => this.setState(prevState=>({products: data.rows, page: 1})))
            .catch(err =>err);
        }else if(action==='srch'){
            fetch(`${url}products/search?query_string=${encodeURIComponent(params)}&all_words=off`)
            .then(res=> res.json())
            .then(data => this.setState(prevState=>({products: data.rows, page: 1})))
            .catch(err =>err);
        }else{
            fetch(`${url}products`)
            .then(res=> res.json())
            .then(data => this.setState(prevState=>({products: data.rows, page: 1})))
            .catch(err =>err);
        }

    }

    render() { 
        const { departments, categories, products, page, chosenDep, chosenCat } = this.state;
        //Whole shop section split into 4 main components which will display all shop data
        return ( 
            <>
            <div className="shop">
                <Departments 
                    chosenDep={chosenDep} 
                    changeDep={this.changeChosenDep.bind(this)} 
                    filterCat={this.fetchCategories.bind(this)} 
                    filterProd={this.fetchProducts.bind(this)} 
                    departments={departments}
                />
                <Categories 
                    chosenCat={chosenCat} 
                    changeCat={this.changeChosenCat.bind(this)} 
                    categories={categories} 
                    filterProd={this.fetchProducts.bind(this)} 
                />
                <Products 
                    page={page} 
                    setPage={this.setDefaultPage.bind(this)} 
                    products={products}
                />
                <SearchBar 
                    clear={this.clearFilters.bind(this)}   
                    filterProd={this.fetchProducts.bind(this)}
                />
            </div>
            </>
         );
    }
}
 
export default Main;