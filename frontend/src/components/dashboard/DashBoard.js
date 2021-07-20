import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'
import ProfileActives from './ProfileActives'
import Experience from './Experience'
import Education from './Education'

class DashBoard extends Component {

    constructor() {
        super();
        this.onDeleteClick = this.onDeleteClick.bind(this);

    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick() {
        this.props.deleteAccount();
    }

    render() {

        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        let dashBoardContent;

        if (profile == null || loading) {
            dashBoardContent = <Spinner />
        } else {
            const { noprofile } = profile
            if (noprofile) {
                dashBoardContent = <div>
                    <p className="lead text-muted">Hi : {user.name}</p>
                    <p>{noprofile}</p>
                    <Link className="btn btn-lg btn-info" to="/create-profile">Create personal information</Link>
                </div>
            } else {
                dashBoardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                        </p>
                        <ProfileActives />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />
                        <div style={{ marginBottom: '60px' }}></div>
                        <button className="btn btn-danger" onClick={this.onDeleteClick}>
                            Delete current account
                        </button>

                    </div>
                );
            }
        }

        return (
            <div>
                <div className="dashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="display-4">DashBoard</h1>
                                {dashBoardContent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DashBoard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ auth: state.auth, profile: state.profile, errors: state.errors });

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(DashBoard)
