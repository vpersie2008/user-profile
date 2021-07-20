import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class Navbar extends Component {

    constructor() {
        super();
        this.onLogoutClick = this
            .onLogoutClick
            .bind(this);
    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this
            .props
            .logoutUser();
    }

    render() {

        const { isAuthenticated, user } = this.props.auth;

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Sign in
                    </Link>
                </li>
            </ul>
        )

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="" className="nav-link" onClick={this.onLogoutClick}>
                        {/* <img src={user.avatar} alt={user.name} className="rounded-circle" style={{ width: '25px', marginRight: '5px' }}></img> */}
                        Sign out
                    </a>
                </li>

            </ul>
        )

        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            Home
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">

                                {
                                    isAuthenticated && <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/dashboard">
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/profiles">Developer</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/feed">
                                                Comment
                                            </Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>

                        {isAuthenticated
                            ? authLinks
                            : guestLinks}
                    </div>
                </nav>
            </div>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(withRouter(Navbar));
