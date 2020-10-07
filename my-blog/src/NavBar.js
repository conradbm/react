import React from 'react';
import {Link} from 'react-router-dom';
// <Link> -> To update the body of the page with a different <Route> in the <Router>

const NavBar = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/articles-list">Articles</Link>
            </li>
        </ul>
    </nav>
);

export default NavBar;