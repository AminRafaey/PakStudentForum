import React, {useState, useEffect } from "react";
import Slider from "react-slick";
import Card from "./Card/Card";
import "./slick.css";

export default function SimpleSlider(props){

  const {categories, setSelectedCategory, setCategoryInitVal} = props;
const [slidesToShow, setSlidesToShow] = useState(Math.round(window.innerWidth / 350))

function handleResize() {
  setSlidesToShow(Math.round(window.innerWidth / 350))
}
window.addEventListener("resize", handleResize);
  
    const settings={
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToScroll: 1
    };

    return (
      <div className="container">
        <Slider {...settings} slidesToShow = {slidesToShow}>
            {categories.map(c=><Card category={c} setSelectedCategory={setSelectedCategory} key={c} setCategoryInitVal={setCategoryInitVal}/>)}
        </Slider>
      </div>
    );
  }
