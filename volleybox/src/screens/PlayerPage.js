// PlayerPage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PlayerCard from '../components/PlayerCard';
import '../screens/PlayerPage.css';
import Navigator from '../components/Navigator';

const PlayerPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [players, setPlayers] = useState([]);
    //const navigation = useNavigate();

    useEffect(()=> {

        const fetchData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            };
            try {
                const response = await fetch('http://localhost:8080/player/all', options);
    
                if (response.ok) {
                    const result = await response.json();
                    if (result.length === 0) {
                        window.alert("No players of that name");
                        return;
                    }
                    setPlayers(result);
                    console.log('Uspesno nadjeno:', result);
                } else {
                    console.error('Neuspesna trazenje');
                }
            } catch (error) {
                console.error('Doslo je do greske:', error);
            }
        };

        fetchData();

        
    },[]);

    const handleSearch = async () => {
        // Simulacija rezultata pretrage


        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        };

        try {
            const url = new URL('http://localhost:8080/player');
            url.searchParams.append('search', searchQuery);
            const response = await fetch(url, options);

            if (response.ok) {
                const result = await response.json();
                if (result.length === 0) {
                    window.alert("No players of that name");
                    return;
                }
                setPlayers(result);
                console.log('Uspesno nadjeno:', result);
            } else {
                console.error('Neuspesna trazenje');
            }
        } catch (error) {
            console.error('Doslo je do greske:', error);
        }
    };

    return (
        <>
        <Navigator />
        <div className="full-width">
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Search players</h1>
                        <div className="form-group d-flex">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter players firstname or lastname"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-primary ml-2" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                    </div>
                    {(sessionStorage.getItem('token') !== null) ?
                            (<div className="col-md-6 d-flex justify-content-end align-items-center">
                            <Link to="/add-player" id="addButton" className="btn btn-primary">
                                Add player
                            </Link>
                        </div>) : (<></>)

                        }
                    
                </div>

                <div className="row">
                    <div className="col">
                        <div className="player-list">
                            {players.map((player) => (
                                <PlayerCard key={player.playerId} player={player} className="player-card" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default PlayerPage;
