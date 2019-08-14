import React from 'react';
import Department from './Department';

const Departments = (props) => {

    const DepList = props.departments.map(item => 
        <Department 
            key={item.department_id} 
            name={item.name}
            chosenDep={props.chosenDep===item.department_id? true: false}
            changeDep={()=>{
                props.changeDep(item.department_id)
            }}
            filterCat={()=>{
                props.filterCat('fil', item.department_id)
            }}
            filterProd={()=>{
                props.filterProd('filDep', item.department_id)
            }}
        />);
    return ( 
        <>
        <ul className="departments">
            {DepList}
        </ul>
        </>
        );
}
 
export default Departments;