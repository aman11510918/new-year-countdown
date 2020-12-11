import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const calculateCountdown = () => {
    //Get present
    let today = new Date();

    //Get the current month.
    //Add 1 because month starts with 0 for January.
    let currentMonth = today.getMonth() + 1;

    //Get the current day of the month.
    let currentDate = today.getDate();

    //the year that the next newyear day will occur.
    let nextYear = today.getFullYear();
    if (currentMonth === 12 && currentDate === 31) {
      //Christmas Day has already passed.
      nextYear = nextYear + 1;
    }

    let nextDate = nextYear + "-12-31T00:00:00.000Z";
    let newDay = new Date(nextDate);

    //setting midnight time
    let newYearDay = new Date(newDay.setHours(0, 0, 0, 0));

    //Get the difference in seconds between the two days.
    let diffSeconds = Math.ceil(newYearDay.getTime() - today.getTime());

    //object for the remaining time
    let timeLeft = {};

    //calculate the time left if not a  NewYear day.
    if (currentMonth !== 12 || (currentMonth === 12 && currentDate <= 31)) {
      //Convert milliseconds into days, hours, minutes, seconds.
      let days = Math.ceil(diffSeconds / (24 * 60 * 60 * 1000));
      let daysms = diffSeconds % (24 * 60 * 60 * 1000);
      let hours = Math.floor(daysms / (60 * 60 * 1000));
      let hoursms = diffSeconds % (60 * 60 * 1000);
      let minutes = Math.floor(hoursms / (60 * 1000));
      let minutesms = diffSeconds % (60 * 1000);
      let sec = Math.ceil(minutesms / 1000);

      //save in the timeLeft object
      timeLeft = {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: sec,
      };
    }
    return timeLeft;
  };

  const [leftTime, setleftTime] = useState(calculateCountdown());

  useEffect(() => {
    let t = setTimeout(
      setleftTime((t) => calculateCountdown()),
      1000
    );

    return () => {
      clearTimeout(t);
    };
// eslint-disable-next-line react-hooks/exhaustive-deps
  });
  return (
    <div className="App">
      <h2>Time left for New Year </h2>
      <h1>
        {leftTime.days} days : {leftTime.hours} hours : {leftTime.minutes}{" "}
        minutes : {leftTime.seconds} seconds
      </h1>
    </div>
  );
}

export default App;
