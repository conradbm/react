import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {

    state = {
        activeTab:'home'
    }
    handleClick = (e, tab) => {
        e.preventDefault();
        // console.log(tab);
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
                <Link to={"/"} onClick={(e) => {this.handleClick(e,'home')}}>
                    <img src={require('../logo.png')} 
                        width="30" 
                        height="30" 
                        alt="" 
                        className="mr-3"
                        ></img>
                    </Link>
                <Link className="navbar-brand mr-3" to={"/"}>Seconds</Link>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/"}>Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                         <Link className="nav-link" to={"/about"}>About <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Get Involved
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to={"/give"}>Givers <span className="sr-only">(current)</span></Link>
                            <Link className="dropdown-item" to={"/receive"}>Receivers <span className="sr-only">(current)</span></Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to={"/signup"}>Sign up <span className="sr-only">(current)</span></Link>
                        </div>
                    </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        )
    }
}

export default NavBar;