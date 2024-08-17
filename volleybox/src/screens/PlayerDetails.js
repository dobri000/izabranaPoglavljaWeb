import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../screens/PlayerDetails.css';
import Navigator from '../components/Navigator';

const PlayerDetails = () => {
    const { playerId } = useParams();
    const [player, setPlayer] = useState(null);
    const navigation = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            };
            try {
                const response = await fetch(`http://localhost:8080/player/${playerId}`, options); // Prilagodite putanju za dohvat podataka
                if (response.ok) {
                    const data = await response.json();
                    setPlayer(data); // Postavite podatke o igraču u stanje komponente
                } else {
                    console.error('Neuspešan zahtev za podacima o igraču.');
                }
            } catch (error) {
                console.error('Greška prilikom dohvatanja podataka o igraču:', error);
            }
        };

        fetchData();
    }, [playerId]);

    const deletePlayer = async () => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        };
        try {
            const response = await fetch(`http://localhost:8080/player/${playerId}`, options); // Prilagodite putanju za dohvat podataka
            if (response.ok) {
                navigation('/player-page');
            } else {
                console.error('Neuspešan zahtev za brisanje igraca.');
            }
        } catch (error) {
            console.error('Greška prilikom brisanja igraca:', error);
        }
    }

    const updatePlayer = () => {
        console.log(player);
        sessionStorage.setItem('player', JSON.stringify(player));
        navigation("/update-player")
    }

    const addEngagement = () => {
        sessionStorage.setItem('player', JSON.stringify(player));
        navigation('/add-engagement');
    }

    const deleteEngagement = async (playerEngagementId) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        };
        try {
            const response = await fetch(`http://localhost:8080/playerEngagement/${playerEngagementId}`, options); // Prilagodite putanju za dohvat podataka
            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Neuspešan zahtev za brisanje angazovanja.');
            }
        } catch (error) {
            console.error('Greška prilikom brisanja angazovanja:', error);
        }
    }

    if (!player) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navigator />
            <div className="player-details">
                <h1>Player details</h1>

                {/* Dugmad za ažuriranje i brisanje */}
                {(sessionStorage.getItem('role') === 'ADMIN' || sessionStorage.getItem('role') === 'EDITOR') ?
                    (<div className="action-buttons">
                        <button className="add-engagement" onClick={addEngagement}>Add engagement</button>
                        <button className="update-button" onClick={updatePlayer}>Update Player</button>
                        <button className="delete-button" onClick={deletePlayer}>Delete Player</button>
                    </div>) : (<></>)
                }

                <div className="player-info">
                    <div className="player-image">
                        <img src={`/images/${player.photo}`} alt={`${player.firstname} ${player.lastname}`} />
                    </div>
                    <div className="details">
                        <p>Firstname: {player.firstname}</p>
                        <p>Lastname: {player.lastname}</p>
                        <p>Date of birth: {player.birthdate}</p>
                        <p>Height: {player.height} cm</p>
                        <p>Weight: {player.weight} kg</p>
                        <p>Spike: {player.spike} cm</p>
                        <p>Block: {player.block} cm</p>
                        <p>Dominant hand: {player.dominantHand}</p>
                        <p>Nationality: {player.nationality.countryName}</p>
                    </div>
                </div>

                <div className='player-engagements'>
                    <h2>Player engagements:</h2>
                    <ul>
                        {player.playerEngagements.sort((a, b) => {
                            return b.season.seasonId - a.season.seasonId;
                        }).map((engagement) => (
                            <li key={engagement.playerEngagementId}>
                                <span className='img-span'>
                                    <img className='team-image' src={`/images/${engagement.team.logo}`} alt={'nop'} />
                                </span>
                                <span className='team-name'><Link to={`/team/${engagement.team.teamId}`}>{engagement.team.teamName}</Link></span>
                                <span className='season'>{`${engagement.season.startYear}/${engagement.season.endYear}`}</span>
                                {
                                    (sessionStorage.getItem('role') === 'ADMIN' || sessionStorage.getItem('role') === 'EDITOR') ?
                                    (<span className='delete' onClick={() => deleteEngagement(engagement.playerEngagementId)}>Delete</span>)
                                    : (<></>)
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default PlayerDetails;
