
import React from 'react';
import {Link} from "react-router-dom"

export default function CategoryDescription(props) {
  let  {category}=
        props;
      if(!(category)){
        return <h1>Loading</h1>
        }
  return (
    
    <div style={{}}>
      <h1 className="d-flex justify-content-center" style={{fontSize:"70px"}}>{category.name}</h1>
      <br />
      <h5>{category.description}</h5>
      <br />
      <Link to={`/learning/Eazy/${category.subCategories[0]}`}><button type="button" className="btn btn-success" style={{marginLeft:"30%"}}>Learn More!</button></Link>
    </div>
  );
};