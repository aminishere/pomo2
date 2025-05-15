import React, { useState, useEffect } from "react";
import { saveSession, fetchSessions } from './api';

function Timer() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(true); // Auto-start
  const [sessionType, setSessionType] = useState("Pomodoro"); // "Short Break", "Long Break"
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Cleanup
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (time === 0) {
        playSound();
        

      if (sessionType === "Pomodoro") {
        const newCount = completedPomodoros + 1;
        setCompletedPomodoros(newCount);
        
        saveSession({
          sessionType: "Pomodoro",
          duration: 2, // super fast
          completedAt: new Date().toISOString(),
        });

        if (newCount % 4 === 0) {
          startSession("Long Break");
        } else {
          startSession("Short Break");
        }
      } else {
        startSession("Pomodoro");
      }
    }
  }, [time]);

  const startSession = (type) => {
    setSessionType(type);
    setTime(
      type === "Pomodoro"
        ? 2//5 * 60
        : type === "Short Break"
        ? 1//0 * 60
        : 2//0 * 60
    );
    setIsRunning(true);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(sessionType === "Pomodoro" ? 25 * 60 : sessionType === "Short Break" ? 10 * 60 : 20 * 60);
  };

  const playSound = () => {
    const audio = new Audio('/ding.wav');
    audio.play().catch(error => {
      console.log("Playback error:", error);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 text-center p-4">
      <h1 className="text-4xl font-bold mb-4">{sessionType}</h1>
      <div className="text-7xl font-mono mb-6">{formatTime()}</div>
      <div className="space-x-2">
        <button className="btn btn-primary" onClick={toggleTimer}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="btn btn-secondary" onClick={resetTimer}>
          Reset
        </button>
      </div>

      <div className="mt-8 space-x-2">
        <button className="btn btn-outline" onClick={() => startSession("Pomodoro")}>Pomodoro</button>
        <button className="btn btn-outline btn-info" onClick={() => startSession("Short Break")}>Short Break</button>
        <button className="btn btn-outline btn-success" onClick={() => startSession("Long Break")}>Long Break</button>
      </div>

      <p className="mt-6 text-lg">
        Completed Pomodoros: <span className="font-bold">{completedPomodoros % 4}/4</span>
      </p>
    </div>
  );
}

export default Timer;
