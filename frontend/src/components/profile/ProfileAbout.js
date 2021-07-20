import React, { Component } from 'react'
import PropTypes from 'prop-types';
import isEmpty from '../../validation/isEmpty';

class ProfileAbout extends Component {

  render() {

    const { profile } = this.props;

    const name = profile.user.name.trim().split(' ')[0];

    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check">{skill}</i>
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{name} 's personal introduction</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{name} did not fill in the introduction information</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Personal skills</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileAbout;
