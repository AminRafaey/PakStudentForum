import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AdminFetchMcqs } from "../Services/Mcq";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import McqCard from "../Components/LearningAndPractise/McqCard/McqCard";
import Spinner from "../UIHandlers/Spinner";

export default function Mcqs(props) {
  const { setMcqInitVal } = props;
  const { url, path } = useRouteMatch();
  let { subCategoryId } = useParams();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [LAPCount, setLAPCount] = useState(0);

  const [open, setOpen] = useState(true);

  useEffect(() => {
    AdminFetchMcqs(subCategoryId, 5, 1).then((res) => {
      setItems(res);
      if (res.length < 5) {
        setHasMore(false);
        return;
      }
      setHasMore(true);
    });
  }, [subCategoryId]);

  const fetchMoreData = () => {
    AdminFetchMcqs(subCategoryId, 5, (items.length + 5) / 5).then((res) => {
      if (res.length < 5) {
        setHasMore(false);
      }
      setItems(items.concat(res));
    });
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
          style={{ backgroundColor: "#4caf50" }}
        >
          <i className="fas fa-filter"></i>
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button
            className="dropdown-item"
            onClick={() =>
              setItems([...items].sort((x, y) => (x.date < y.date ? 1 : -1)))
            }
          >
            Sort by creation Date (asc)
          </button>
          <button
            className="dropdown-item"
            onClick={() =>
              setItems([...items].sort((x, y) => (x.date < y.date ? -1 : 1)))
            }
          >
            Sort by creation Date (desc)
          </button>
          <button
            className="dropdown-item"
            onClick={() =>
              setItems(
                [...items].sort((x, y) =>
                  x.numOfShares < y.numOfShares ? +1 : -1
                )
              )
            }
          >
            Sort by share
          </button>
          <button
            className="dropdown-item"
            onClick={() =>
              setItems(
                [...items].sort((x, y) =>
                  x.difficultyLevel === "Eazy" ? -1 : +1
                )
              )
            }
          >
            Difficulty Level: Easy
          </button>
          <button
            className="dropdown-item"
            onClick={() =>
              setItems(
                [...items].sort((x, y) =>
                  x.difficultyLevel === "Normal" ? -1 : +1
                )
              )
            }
          >
            Difficulty Level: Normal
          </button>
          <button
            className="dropdown-item"
            onClick={() =>
              setItems(
                [...items].sort((x, y) =>
                  x.difficultyLevel === "Difficult" ? -1 : +1
                )
              )
            }
          >
            Difficulty Level: Difficult
          </button>
        </div>
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner open={open} setOpen={setOpen} />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>END...</b>
          </p>
        }
      >
        {items.map((i, index) => (
          <div
            key={index}
            style={{
              border: "0.01rem solid",
              margin: "4rem",
              borderRadius: "1rem",
            }}
          >
            <McqCard mcq={i} />
            <div className="row">
              <div className="col-md-3">
                <p
                  className="h6"
                  style={{ display: "inline", color: "#4caf50" }}
                >
                  Number of Share:{" "}
                </p>
                {i.numOfShares}
              </div>
              <div className="col-md-1">
                <Link to="/admin/addMcq">
                  {" "}
                  <button
                    className="btn btn-success"
                    style={{ marginLeft: "10%", marginBottom: "1rem" }}
                    onClick={() =>
                      setMcqInitVal({
                        _id: i._id,
                        statement: i.statement,
                        a: i.options.a,
                        b: i.options.b,
                        c: i.options.c,
                        d: i.options.d,
                        correct: i.options.correct,
                        subCategories: i.subCategories.map((s) => s.name),
                        difficultyLevel: i.difficultyLevel
                      })
                    }
                  >
                    Edit
                  </button>
                </Link>
              </div>
              <div className="col-md-2">
                <ul>
                  {i.subCategories.map((s) => (
                    <li>{s.name}</li>
                  ))}
                </ul>
              </div>
              <div className="col-md-2">
              <p style={{ display: "inline", color: "#4caf50" }}>
              Difficulty Level : 
            </p>
            {i.difficultyLevel}
            </div>
              <div className="col-md-4 h6">
                <p style={{ display: "inline", color: "#4caf50" }}>
                  Last updated :{" "}
                </p>
                {i.date.slice(0, 10)}
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
