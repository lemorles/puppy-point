import React from "react";
import { useSelector } from "react-redux";
import ReservePending from "./ReservesPending";

export default function Order() {
  const { reservesPending } = useSelector((state) => state.reserve);

  return (
    <div>
      <hr></hr>
      <ul>
        {reservesPending &&
          reservesPending.map((w) => {
            return (
              <ReservePending
                id={w.id}
                key={`${w.id}`}
                location={w.walk.location}
                image={w.image}
                date={w.date}
                shift={w.shift}
                dogs={w.dogs}
                dogCount={w.dogCount}
                price={w.walk.price}
                walker={w.walk.user}
                userId={w.userId}
              />
            );
          })}
      </ul>
    </div>
  );
}
