import { useEffect, useState } from "react"
import Navigator from "../components/Navigator";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {

        if(sessionStorage.getItem('role') !== 'ADMIN'){
            navigation('/');
        }

        const fetchData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            };
            try {
                const response = await fetch(`http://localhost:8080/user`, options); // Prilagodite putanju za dohvat podataka
                if (response.ok) {
                    var data = await response.json();
                    await setUsers(data);
                } else {
                    console.error('Neuspešan zahtev za korisnicima.');
                }
            } catch (error) {
                console.error('Greška prilikom zahteva za korisnicima:', error);
            }
        }

        fetchData();

    }, []);

    if (users.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navigator />
            <div className="container">
                <h1>Users:</h1>
                <div className="user-container">
                    {users.map(user => (
                        <UserCard key={user.id} data={user} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Users;