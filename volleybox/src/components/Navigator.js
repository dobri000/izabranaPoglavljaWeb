import { Link } from "react-router-dom";

const Navigator = () => {

    return (
        <header>
            <nav className="navbar">
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/player-page">Player</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/team-page">Team</Link>
                    </li>
                    {
                        (sessionStorage.getItem('role') === 'ADMIN') ?
                            (<li className="nav-item">
                                <Link to="/users">Users</Link>
                            </li>) : (<></>)
                    }
                    {(sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === '') ?
                        (<><li className="nav-item">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register">Register</Link>
                        </li></>
                        )
                        :
                        (<li className="nav-item">
                            <Link onClick={
                                () => { sessionStorage.clear(); window.location.reload(); }
                            }>Logout</Link>
                        </li>)

                    }
                </ul>
                {(sessionStorage.getItem('token') !== null) ?
                    (
                        <div className="email">{sessionStorage.getItem('email')}</div>
                    ) :
                    (<></>)}
            </nav>

        </header>
    );

}

export default Navigator;