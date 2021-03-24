import React from "react";
import SimpleSlider from "../../../SlickSlider/SimpleSlider";
import Spinner from "../../../UIHandlers/Spinner";

import "./header.css";

function MainHeader(props) {
  let { selectedCategory, categories, setSelectedCategory, setCategoryInitVal } = props;
  const [open, setOpen] = React.useState(true);

  if (!(selectedCategory.name.length > 1)) {
    return <Spinner open={open} setOpen={setOpen} />;
  }

  return (
    <div>
      <div className="home-image">
        <div style={{ height: "70%" }}></div>
        <div style={{ backgroundColor: "#dad6d6" }}>
          <SimpleSlider
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            setCategoryInitVal={setCategoryInitVal}
          />
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
