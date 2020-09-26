import React from "react";
import Card from "./Card/Card";
import CategoryDescription from "./CategoryDescription";
import Banner from "./Banner/Banner";
import Spinner from "../../UIHandlers/Spinner";

export default function Home(props) {
  let { categories, homeMcqs } = props;
  const [open, setOpen] = React.useState(true);

  if(categories.length === 1)
    return <Spinner open={open} setOpen={setOpen}/>
  return (
    <div>
<div style={{height: "10rem"}}>
</div>
    
      <div className="row" style={{ marginTop: "5rem" }}>
      <div className="col-md-1">
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4">
          <CategoryDescription category={categories[0]} />
        </div>
        <div className="col-md-1">
        </div>
        <div className="col-xs-12 col-sm-12 col-md-5">
          <Card mcq ={homeMcqs[0]} subCategoryId={categories[0].subCategories[0]}/>
        </div>
      </div>
      <div className="col-md-1">
      </div>

      <div className="row" style={{ marginTop: "5rem" }}>
      <div className="col-md-1">
        </div>
        <div className="col-xs-12 col-sm-12 col-md-5">
          <Card mcq ={homeMcqs[1]?homeMcqs[1]:homeMcqs[0]} subCategoryId={categories[1].subCategories[0]}/>
        </div>
        <div className="col-md-1">
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4">
          <CategoryDescription category={categories[1]?categories[1]:categories[0]} />
        </div>
        <div className="col-md-1">
        </div>
      </div>

      <div className="row" style={{ marginTop: "5rem" }}>
      <div className="col-md-1">
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4">
          <CategoryDescription category={categories[2]?categories[2]:categories[0]} />
        </div>
        <div className="col-md-1">
        </div>
        <div className="col-xs-12 col-sm-12 col-md-5">
          <Card mcq ={homeMcqs[2]?homeMcqs[2]:homeMcqs[0]} subCategoryId={categories[2].subCategories[0]}/>
        </div>
        <div className="col-md-1">
        </div>
      </div>
<div style={{backgroundColor:"#616161"}}>
      <div
        className="row"
        style={{ marginTop: "5rem" }}
      >
      <div className="col-md-1">
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4"  style={{ marginTop: "4rem" }}>
          <Banner category={categories[3]?categories[3]:categories[0]} subCategoryId={categories[3]?categories[3].subCategories[0]:categories[0].subCategories[0]}/>
        </div>
        <div className="col-md-2">
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4"  style={{ marginTop: "4rem" }}>
          <Banner category={categories[4]?categories[4]:categories[0]} subCategoryId={categories[4]?categories[4].subCategories[0]:categories[0].subCategories[0]}/>
        </div>
        <div className="col-md-1">
        </div>
        </div>

        <div
        className="row"
      >
      <div className="col-md-1">
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4"  style={{ marginTop: "4rem" }}>
          <Banner category={categories[5]?categories[5]:categories[0]} subCategoryId={categories[5]?categories[5].subCategories[0]:categories[0].subCategories[0]}/>
        </div>
        <div className="col-md-2">
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4"  style={{ marginTop: "4rem" }}>
          <Banner category={categories[6]?categories[6]:categories[0]} subCategoryId={categories[6]?categories[6].subCategories[0]:categories[0].subCategories[0]}/>
        </div>
        <div className="col-md-1">
        </div>
      </div>
      </div>
      
      </div>
  );
}
