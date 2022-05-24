import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { confirmReserve, rejectReserve } from "../actions/reserveActions";

export default function WalkConfirmationCard({ walk, client }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleConfirm = (e) => {
    e.preventDefault();
    dispatch(confirmReserve(walk.id));
    history.push("/home");
  };

  const handleReject = (e) => {
    e.preventDefault();
    dispatch(rejectReserve(walk.id));
  };

  return (
    <div>
      <h2>Nueva propuesta de paseo</h2>

      <div>
        <h4>Datos del Paseo</h4>
        <h5>{walk.location}</h5>
        <h5>{walk.date}</h5>
        <h5>{walk.hour}</h5>
        <h5>{client.dogs}</h5>
      </div>

      <div>
        <button onClick={handleConfirm}>Confirmar Paseo</button>
        <button onClick={handleReject}>Rechazar Paseo</button>
      </div>
    </div>
  );
}
