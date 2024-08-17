import React from 'react';
import { Link } from 'react-router-dom';
import '../components/TeamCard.css';


const TeamCard = ({ team }) => {

  return (
    <div className="team-card">
      <img src={`/images/${team.logo}`} alt={`${team.teamName}`} />
      <h2>{`${team.teamName}`}</h2>
      <p>Founded: {team.founded}</p>
      <Link to={`/team/${team.teamId}`}>More details</Link>
    </div>
  );
};

export default TeamCard;
