import { ClockType } from "./models";
import { DateTime } from "luxon";
import React from "react";
import { useEffect, useState } from "react";

interface ClockProps {
  clock: ClockType;
  deleteClock: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Clock({ clock, deleteClock }: ClockProps) {
  const { city, timeZone, id } = clock;
  let zoneToString = "";

  if (timeZone[0] === "-" || timeZone[0] === "+") {
    zoneToString = "UTC" + timeZone;
  } else if (timeZone.length === 0) {
    zoneToString = "system";
  } else {
    zoneToString = "UTC+" + timeZone;
  }

  const [now, setNow] = useState(
    DateTime.fromObject({}, { zone: zoneToString })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(DateTime.fromObject({}, { zone: zoneToString }));
    }, 1000);

    return () => clearInterval(interval);
  }, [zoneToString]);

  return (
    <div>
      <div className="clock-title">{city}</div>
      <div className="clock">
        <div
          className="clock-cross"
          onClick={deleteClock}
          data-id={id}
        >
          X
        </div>
        <div
          className="hour"
          style={{ transform: `rotate(${now.hour * 30}deg)` }}
        ></div>
        <div
          className="minute"
          style={{ transform: `rotate(${now.minute * 6}deg)` }}
        ></div>
        <div
          className="second"
          style={{ transform: `rotate(${now.second * 6}deg)` }}
        ></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}
