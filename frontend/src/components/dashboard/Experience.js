import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';
import { deleteExperience } from '../../actions/profileActions'

class Experience extends Component {
    onDeleteClick(id) {
        this.props.deleteExperience(id);
    }

    render() {
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>{exp.from} ~ {exp.to === '' ? "So far" : exp.to}</td>
                <td>
                    <button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        ))

        return (
            <div>
                <h4 className="mb-4">Personal experience</h4>
                <div className="mb-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Position</th>
                                <th>Year</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {experience}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);