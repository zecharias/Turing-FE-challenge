import React, { Component } from 'react';
import Icon from '../img/symbol-defs.svg'

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state={
            search: ''
        }
    }
    handleInputChange= e=>{
        this.setState({
            [e.target.name]: e.target.value
        })
        this.props.filterProd('srch', e.target.value)

    }

    //Search bar and clearing filters 

    render() { 
        return ( 
            <>
            <div onClick={this.props.clear} className="searchBar">
                <button className="searchBar__btn">Clear Filters</button>
                <div className="searchBar__input-wrap">
                    <input 
                        type="text" 
                        placeholder='Search' 
                        className="searchBar__input" 
                        name='search' 
                        value={this.state.search} 
                        onChange={this.handleInputChange}
                    />
                    <svg className="searchBar__svg">
                        <use href={Icon + '#icon-search'} />
                    </svg>
                </div>
            </div>
            </>
         );
    }
}
 
export default SearchBar;