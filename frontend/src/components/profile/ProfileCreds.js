import React, { Component } from 'react'

class ProfileCreds extends Component {
    render() {
        const { experience, education } = this.props;
        const expItems = experience.map(exp => (
            <li key={exp._id} className="list-group-item">
                <h4>{exp.company}</h4>
                <p>
                    {exp.from}
                    To {exp.to === ''
                        ? 'So far'
                        : exp.to}
                </p>
                <p>
                    <strong>Position:</strong>
                    {exp.title}
                </p>
                <p>
                    {exp.location === ''
                        ? null
                        : (
                            <span>
                                <strong>Location:
                                </strong>
                                {exp.location}
                            </span>
                        )}
                </p>
                <p>
                    {exp.description === ''
                        ? null
                        : (
                            <span>
                                <strong>Job description:
                                </strong>
                                {exp.description}
                            </span>
                        )}
                </p>
            </li>
        ));

        const eduItems = education.map(edu => (
            <li key={edu._id} className="list-group-item">
                <h4>{edu.school}</h4>
                <p>
                    {edu.from}
                    To {edu.to === ''
                        ? 'So far'
                        : edu.to}
                </p>
                <p>
                    <strong>Degree:</strong>
                    {edu.degree}
                </p>
                <p>
                    <strong>Major:</strong>
                    {edu.fieldofstudy}
                </p>
                <p>
                    {edu.description === ''
                        ? null
                        : (
                            <span>
                                <strong>School performance:
                                </strong>
                                {edu.description}
                            </span>
                        )}
                </p>
            </li>
        ));
        return (
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-center text-info">Personal experience</h3>
                    {expItems.length > 0
                        ? (
                            <ul className="list-group">{expItems}</ul>
                        )
                        : (
                            <p className="text-center">No personal experience information</p>
                        )}
                </div>

                <div className="col-md-6">
                    <h3 className="text-center text-info">Educational experience</h3>
                    {eduItems.length > 0
                        ? (
                            <ul className="list-group">{eduItems}</ul>
                        )
                        : (
                            <p className="text-center">No information on educational experience</p>
                        )}
                </div>
            </div>
        )
    }
}

export default ProfileCreds;