import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getGithubInfos } from '../../actions/profileActions'

class ProfileGithub extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientId: "a16c0bb87eb636dd1a8d",
            clientSecret: "9eaa30638a2520d700856b4f349d1e330ce2fae5",
            count: 0,
            sort: "created: desc",
            repos: []
        }
    }

    componentDidMount() {
        const requestBody = {
            username: this.props.username,
            count: this.state.count,
            sort: this.state.sort,
            clientId: this.state.clientId,
            clientSecret: this.state.clientSecret
        }
        this
            .props
            .getGithubInfos(requestBody);
    }

    render() {
        const { github } = this.props.profile;
        let repoItems = null;

        if (github != null && github != undefined) {
            repoItems = github.map(repo => (
                <div key={repo.id} className="card card-body mb-2">
                    <div className="row">
                        <div className="col-md-6">
                            <h4>
                                <a href={repo.html_url} className="text-info" target="_blank">
                                    {repo.name}
                                </a>
                            </h4>
                            <p>{repo.description}</p>
                        </div>
                        <div className="col-md-6">
                            <span className="badge badge-info mr-1">
                                Stars: {repo.stargazers_count}
                            </span>
                            <span className="badge badge-secondary mr-1">
                                Watchers: {repo.watchers_count}
                            </span>
                            <span className="badge badge-success">
                                Forks: {repo.forks_count}
                            </span>
                        </div>
                    </div>
                </div>
            ));
        }

        return (
            <div ref="myRef">
                <hr />
                <h3 className="mb-4">Github repositories</h3>
                {repoItems}
            </div>
        )
    }
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired,
    getGithubInfos: PropTypes.func.isRequired
};
const mapStateToProps = state => ({ profile: state.profile });

export default connect(mapStateToProps, { getGithubInfos })(ProfileGithub);