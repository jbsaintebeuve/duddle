import React, { useState, useEffect } from "react";
import "./Countdown.scss";
import CountdownItem from "./CountdownItem";

function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    return Math.max(Math.floor(difference / 1000), 0);
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const padTime = (time) => (time < 10 ? `0${time}` : time);

    return {
      days: padTime(days),
      hours: padTime(hours),
      minutes: padTime(minutes),
      secs: padTime(secs)
    };
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {timeLeft !== 0 && (
        <div className="grid grid-cols-4 gap-4 text-white-50">
          <CountdownItem time={formatTime(timeLeft).days} label="jours" />
          <CountdownItem time={formatTime(timeLeft).hours} label="heures" />
          <CountdownItem time={formatTime(timeLeft).minutes} label="minutes" />
          <CountdownItem time={formatTime(timeLeft).secs} label="secondes" />
        </div>
      )}

      {timeLeft === 0 && (
        <a
          href="https://duddle.fr/"
          className="mt-4 bg-casper-400 text-white-50 hover:bg-white-50 hover:text-casper-400 transition border-casper-400 border-2 font-semibold px-6 py-2 rounded-xl"
        >
          Visiter Duddle
        </a>
      )}
    </div>
  );
}

export default Countdown;