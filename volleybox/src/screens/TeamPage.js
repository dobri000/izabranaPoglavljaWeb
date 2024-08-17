// PlayerPage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TeamCard from '../components/TeamCard';
import Navigator from '../components/Navigator';
import '../screens/TeamPage.css';

const TeamPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [teams, setTeams] = useState([]); // Simulacija rezultata pretrage
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
                const response = await fetch('http://localhost:8080/team/all', options);

                if (response.ok) {
                    const result = await response.json();
                    if (result.length == 0) {
                        window.alert("No teams of that name");
                        return;
                    }
                    setTeams(result);
                    console.log('Uspesno nadjeno:', result);
                } else {
                    console.error('Neuspesna trazenje');
                }
            } catch (error) {
                console.error('Doslo je do greske:', error);
            }
        };

        fetchData();
    }, []);


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
            const response = await fetch('http://localhost:8080/team/search/' + searchQuery, options);

            if (response.ok) {
                const result = await response.json();
                if (result.length == 0) {
                    window.alert("No teams of that name");
                    return;
                }
                setTeams(result);
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
                            <h1>Search teams</h1>
                            <div className="form-group d-flex">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter team name"
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
                                <Link to="/add-team" id="addButton" className="btn btn-primary">
                                    Add team
                                </Link>
                            </div>) : (<></>)

                        }

                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="player-list">
                                {teams.map((team) => (
                                    <TeamCard key={team.teamId} team={team} className="team-card" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamPage;
