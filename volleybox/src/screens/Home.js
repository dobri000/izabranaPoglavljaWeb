// Home.js
import React, { useEffect } from 'react';
import '../App.css';
import Navigator from '../components/Navigator';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigation = useNavigate();

    // useEffect(()=> {
    //     let email = sessionStorage.getItem('email');
    //     if(email === '' || email === null){
    //         navigation('/');
    //     }
    // },[]);

    return (
        <div>
            <Navigator />

            <section className="volleyball-section">
                <h1>Wellcome to VolleyBox!</h1>
            </section>
        </div>
    );
};

export default Home;
