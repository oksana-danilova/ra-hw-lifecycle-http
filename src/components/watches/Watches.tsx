import { useState } from "react";
import "./Watches.css";
import Clock from "./Clock";
import { ClockType } from "./models";
import React from "react";

export default function Watches() {
  const [city, setCity] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [clocks, setClocks] = useState<ClockType[]>([
    { city: "Местное время", timeZone: "", id: "1" },
  ]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const id = String(city) + String(new Date());

    let adjustedTimeZone = timeZone;
    if (+adjustedTimeZone < -99) adjustedTimeZone = "-99";
    if (+adjustedTimeZone > 99) adjustedTimeZone = "99";

    const data = { city, timeZone: adjustedTimeZone, id };
    if (data.city.length === 0) return;

    setClocks([...clocks, data]);
    setCity("");
    setTimeZone("");
  };

  const deleteClock = (event: React.MouseEvent<HTMLDivElement>) => {
    const clockId = event.currentTarget.getAttribute("data-id");
    const newClocks = clocks.filter((el) => el.id !== clockId);
    setClocks(newClocks);
  };

  return (
    <>
      <form className="watches-wrap" onSubmit={onSubmitHandler}>
        <div>
          <p>Название</p>
          <input
            className="watches-input"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
        <div>
          <p>Временная зона</p>
          <input
            className="watches-input"
            type="text"
            value={timeZone}
            onChange={(event) => setTimeZone(event.target.value)}
          />
        </div>
        <button className="watches-button">Добавить</button>
      </form>
      <div className="watches-wrap">
        {clocks.map((clock) => (
          <Clock clock={clock} deleteClock={deleteClock} key={clock.id} />
        ))}
      </div>
    </>
  );
}
