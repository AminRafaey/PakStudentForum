import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AdminFetchMcqs } from "../Services/Mcq";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import McqCard from "../Components/LearningAndPractise/McqCard/McqCard"

export default function Mcqs(props) {
    const {setMcqInitVal} = props;
    const {url, path} = useRouteMatch();
    let { subCategoryId } = useParams();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [LAPCount, setLAPCount] = useState(0);
  
  useEffect(() => {
    console.log("length");
    AdminFetchMcqs(subCategoryId, 5, 1).then((res) => {
      setItems(res);
      console.log("length",res.length);
      if (res.length < 5) {
        setHasMore(false);
        return;
      }
      setHasMore(true);
    });
  }, [subCategoryId]);

  const fetchMoreData = () => {
    console.log(items.length);
    AdminFetchMcqs(subCategoryId, 5, (items.length + 5) / 5).then(
      (res) => {
        if (res.length < 5) {
          setHasMore(false);
        }
        setItems(items.concat(res));
      }
    );

    console.log(items);
  };

  return (
    <div>
      <div className="row dropdown d-flex justify-content-end mr-4">
        <button
          className="btn dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{backgroundColor:"#4caf50"}}
        >
        <i className="fas fa-filter"></i>
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button
            className="dropdown-item"
            onClick={() => 
              setItems([...items].sort((x, y) => (x.date < y.date ? 1 : -1)))}
          >
            Sort by creation Date (asc)
          </button>
          <button
            className="dropdown-item"
            onClick={() => setItems([...items].sort((x, y) => (x.date < y.date ? -1 : 1)))}
          >
            Sort by creation Date (desc)
          </button>
          <button
            className="dropdown-item"
            onClick={() =>setItems([...items].sort((x, y) => (x.numOfShares < y.numOfShares ? +1 : -1)))
             
            }
          >
            Sort by share
          </button>
        </div>
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>END...</b>
          </p>
        }
      >
        {items.map((i, index) => (
          <div key={index} style={{border:"0.01rem solid", margin:"4rem", borderRadius:"1rem"}}>
          <McqCard mcq={i} />
          <div className="row" >
          <div className="col-md-3">
            <p className="h6" style={{display:"inline", color:"#4caf50"}}>
             Number of Share: </p>
            {i.numOfShares}
            </div>
            <div className="col-md-2">
            <Link to="/admin/addMcq"> <button
            className="btn btn-success"
            style={{ marginLeft: "10%", marginBottom: "1rem" }}
           onClick={()=>setMcqInitVal({
              _id:i._id,
              statement: i.statement,
            a: i.options.a,
            b: i.options.b,
            c: i.options.c,
            d: i.options.d,
            correct: i.options.correct,
            subCategories: i.subCategories.map(s=>s.name),
            })}>Edit</button></Link>
            </div>
            <div className="col-md-2">
            <ul>
            {i.subCategories.map(s=><li>{s.name}</li>)}
</ul>
</div>
<div className="col-md-5 h6" ><p style={{display:"inline", color:"#4caf50"}}>Last updated : </p>{i.date.slice(0, 10)}</div>
</div>            
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
