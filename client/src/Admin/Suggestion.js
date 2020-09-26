import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FetchSuggestionsOrProblems, DeleteSuggestionOrProblem } from "../Services/SuggestionOrProblem";
import { Link } from "react-router-dom";
import McqCard from "../Components/LearningAndPractise/McqCard/McqCard";

export default function Suggestion(props) {
  const { setMcqInitVal } = props;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  let pageSize = 5;

  useEffect(() => {
    FetchSuggestionsOrProblems("suggestions", pageSize, 1).then((res) => {
      setItems(res);
      setHasMore(true);
      if (res.length < pageSize) {
        setHasMore(false);
      }
    });
  }, []);

  const fetchMoreData = () => {
    FetchSuggestionsOrProblems(
      "suggestions",
      pageSize,
      (items.length + pageSize) / pageSize
    ).then((res) => {
      if (res.length < pageSize) {
        setHasMore(false);
      }
      setItems(items.concat(res));
    });
  };

  return (
    <div className="container">
      <h3>Suggestions</h3>
      <hr />
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
          <div
            key={index}
            style={{
              border: "0.01rem solid",
              margin: "4rem",
              borderRadius: "1rem",
            }}
          >
          {console.log(i)}
            <McqCard mcq={i} />
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-2">
                {" "}
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ marginLeft: "10%", marginBottom: "1rem" }}
                  onClick={() => {
                    DeleteSuggestionOrProblem("mcq/suggestion", i._id);
                    setItems(items.filter((it) => it._id !== i._id));
                  }}
                >
                  Delete
                </button>
              </div>
              <div className="col-md-2">
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
                        subCategories: "",
                        learnerId: i.learnerId._id,
                        userName: i.learnerId.userName,
                      })
                    }
                  >
                    Edit
                  </button>
                </Link>
              </div>
              <div className="col-md-3 h6">
                {"Suggested By: " + i.learnerId.userName}
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
