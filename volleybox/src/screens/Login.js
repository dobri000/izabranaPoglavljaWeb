import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password,
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch('http://localhost:8080/auth/authenticate', options);

            if (response.ok) {
                const result = await response.json();
                sessionStorage.setItem('token', result.token);
                sessionStorage.setItem('email', result.email);
                sessionStorage.setItem('firstname', result.firstname);
                sessionStorage.setItem('lastname', result.lastname);
                sessionStorage.setItem('role', result.role);
                navigation(-1);
                console.log('Uspesna prijava:', result);
            } else {
                window.alert("Wrong credentials")
            }
        } catch (error) {
            console.error('Doslo je do greske:', error);
        }
    };

    return (
        <Container className='container'>
            <div className="header">
                <h2>Login</h2>
            </div>
            <div className="container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email" className="form-group">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </Form.Group>
                    <Form.Group controlId="password" className="form-group">
                        <Form.Label className="form-label">Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="btn-primary">
                        Sign in
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default Login;
