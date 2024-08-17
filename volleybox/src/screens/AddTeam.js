import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTeam.css';

const AddTeam = () => {
  const [formData, setFormData] = useState({
    teamName: '',
    founded: '',
    hall: '',
    country: '',
    logo: ''
  });
  const [nationalities, setNationalities] = useState([]);
  const [halls, setHalls] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    let role = sessionStorage.getItem('role');
    if (role !== 'EDITOR' && role !== 'ADMIN') {
      navigation('/');
    }

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
    };
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/country`, options);
        if (response.ok) {
          const data = await response.json();
          setNationalities(data); // Postavljamo dobijene nacionalnosti u stanje
        }
      } catch (error) {
        console.error('Greška prilikom preuzimanja nacionalnosti:', error);
      }
    };

    const fetchHalls = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hall`, options);
        if (response.ok) {
          const data = await response.json();
          setHalls(data); // Postavljamo dobijene nacionalnosti u stanje
        }
      } catch (error) {
        console.error('Greška prilikom preuzimanja dvorana:', error);
      }
    };

    fetchData();
    fetchHalls();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNationalityChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      country: { countryId: value },
    });
  };

  const handleHallChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      hall: { hallId: value },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        logo: file.name,
      });
    }
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
      const response = await fetch('http://localhost:8080/team', options);

      if (response.ok) {
        const result = await response.json();
        navigation('/team-page');
        console.log('Uspesno dodavanje tima:', result);
      } else {
        console.error('Neuspesno dodavanje tima');
      }
    } catch (error) {
      console.error('Doslo je do greske:', error);
    }
  };

  return (
    <div className="add-team">
      <h1>Add new team</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="teamName">Team name:</label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="founded">Founded (year):</label>
          <input
            type="number"
            id="founded"
            name="founded"
            value={formData.founded}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country.countryId}
            onChange={handleNationalityChange}
            required
          >
            <option value="">Choose country</option>
            {nationalities.map((nation) => (
              <option key={nation.countryId} value={nation.countryId}>
                {nation.countryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="hall">Hall:</label>
          <select
            id="hall"
            name="hall"
            value={formData.hall.hallId}
            onChange={handleHallChange}
          >
            <option value="">Choose hall</option>
            {halls.map((hall) => (
              <option key={hall.hallId} value={hall.hallId}>
                {hall.hallName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="logo">Logo:</label>
          <input
            type="file"
            id="logo"
            name="logo"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Add team</button>
      </form>
    </div>
  );
};

export default AddTeam;
