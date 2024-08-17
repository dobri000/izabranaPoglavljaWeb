import React from 'react';
import { Link } from 'react-router-dom';
import '../components/PlayerCard.css';


const PlayerCard = ({ player }) => {

  return (
    <div className="player-card">
      <img src={`/images/${player.photo}`} alt={`${player.firstname} ${player.lastname}`} />
      <h2>{`${player.firstname} ${player.lastname}`}</h2>
      <p>Date of birth: {player.birthdate}</p>
      <Link to={`/player/${player.playerId}`}>More details</Link>
    </div>
  );
};

export default PlayerCard;
