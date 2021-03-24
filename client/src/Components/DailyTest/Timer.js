import React, { useState, useEffect } from "react";

export default function Timer(props) {
  const { startingMinutes, finishHandler } = props;
  let [time, setTime] = useState(startingMinutes * 60);
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  useEffect(() => {
    let interval;
    if (!time == 0) {
      interval = setInterval(updateCounter, 1000);
    } else finishHandler();

    return () => {
      clearInterval(interval);
    };
  });

  function updateCounter() {
    setTime(time - 1);
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <h6 style={{ margin: "auto" }}>{`${minutes} : ${seconds}`}</h6>
      </nav>
    </div>
  );
}
