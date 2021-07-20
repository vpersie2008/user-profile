import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        }

        this.onChange = this
            .onChange
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const requestBody = {
            email: this.state.email,
            password: this.state.password
        }

        this
            .props
            .loginUser(requestBody);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this
                .props
                .history
                .push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this
                .props
                .history
                .push('/dashboard');
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign in</h1>
                            <form onSubmit={this.onSubmit}>

                                <TextFieldGroup
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />

                                <TextFieldGroup
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />

                                <input type="submit" className="btn btn-info btn-block mt-4" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

const mapDispatchToProps = {
    loginUser: loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
