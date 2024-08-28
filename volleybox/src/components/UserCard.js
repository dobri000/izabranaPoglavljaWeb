import { useState } from "react";
import './UserCard.css';

const UserCard = ({data, ...rest}) => {
    const [role, setRole] = useState(data.role);
    const updateEditable = (data.role === 'ADMIN' && sessionStorage.getItem('email') !== 'dimitrije.dobrijevic@gmail.com') || data.email === 'dimitrije.dobrijevic@gmail.com';
    
    const updateUserRole = async () => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({role})
        };
        try {
            const response = await fetch(`http://localhost:8080/user/` + data.id, options); // Prilagodite putanju za dohvat podataka
            if (response.ok) {
                window.alert('Rola uspesno azurirana');
            } else {
                console.error('Neuspešan zahtev za korisnicima.');
            }
        } catch (error) {
            console.error('Greška prilikom zahteva za korisnicima:', error);
        }
    }

    const handleChange = (event) => {
        setRole(event.target.value);
    }

    return (
        <div className="user-item">
            <span>{data.firstname}</span>
            <span>{data.lastname}</span>
            <span>{data.email}</span>
            <select value={role} onChange={handleChange} disabled={updateEditable}>
                <option value="ADMIN">ADMIN</option>
                <option value="EDITOR">EDITOR</option>
                <option value="USER">USER</option>
            </select>
            {updateEditable ? (<></>) : (<button onClick={updateUserRole}>Update</button>)}
        </div>
    )
}

export default UserCard;