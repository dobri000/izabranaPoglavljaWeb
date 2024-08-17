import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPlayer.css';

const AddEngagement = () => {
  const [formData, setFormData] = useState({
    player: '',
    team: '',
    season: '',
    position: '',
    number: ''
  });
  const [seasons, setSeasons] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('player')) {
      navigation('/player-page');
    }
    const p = JSON.parse(sessionStorage.getItem('player'));
    setFormData({
      ...formData,
      player: p,
    })
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
    };
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/season`, options);
        if (response.ok) {
          const data = await response.json();
          setSeasons(data); // Postavljamo dobijene sezone u stanje
        }
      } catch (error) {
        console.error('Greška prilikom preuzimanja sezona:', error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await fetch(`http://localhost:8080/team`, options);
        if (response.ok) {
          const data = await response.json();
          setTeams(data); // Postavljamo dobijene timove u stanje
        }
      } catch (error) {
        console.error('Greška prilikom preuzimanja timova:', error);
      }
    };

    fetchData();
    fetchTeams();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTeamChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      team: { teamId: value },
    });
  };

  const handleSeasonChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      season: { seasonId: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = formData;
    console.log(JSON.stringify(data));

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch('http://localhost:8080/playerEngagement', options);

      if (response.ok) {
        const result = await response.json();
        navigation(`/player/${formData.player.playerId}`);
        sessionStorage.removeItem('player');
        console.log('Uspesno dodavanje angazovanje igraca:', result);
      } else if(response.status === 403) {
        window.alert('Nije moguce dodati ovo angazovanje');
      } else {
        console.error('Neuspesno dodavanje angazovanje igraca');
      }
    } catch (error) {
      console.error('Doslo je do greske:', error);
    }
  };

  return (
    <div className="add-player">
      <h1>Add engagement for {formData.player.firstname} {formData.player.lastname}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="team">Team:</label>
          <select
            id="team"
            name="team"
            value={formData.team.teamId}
            onChange={handleTeamChange}
            required
          >
            <option value="">Choose team</option>
            {teams.map((team) => (
              <option key={team.teamId} value={team.teamId}>
                {`${team.teamName}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="season">Season:</label>
          <select
            id="season"
            name="season"
            value={formData.season.seasonId}
            onChange={handleSeasonChange}
            required
          >
            <option value="">Choose season</option>
            {seasons.map((season) => (
              <option key={season.seasonId} value={season.seasonId}>
                {`${season.startYear}/${season.endYear}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
          >
            <option value="">Choose position</option>
            <option value="SETTER">Setter</option>
            <option value="OPPOSITE">Opposite</option>
            <option value="OUTSIDE_HITTER">Outside hitter</option>
            <option value="MIDDLE_BLOCKER">Middle blocker</option>
            <option value="LIBERO">Libero</option>
          </select>
        </div>
        <div>
          <label htmlFor="number">Number:</label>
          <input
            type="number"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add engagement</button>
      </form>
    </div>
  );
};

export default AddEngagement;
