import React, { Component } from 'react'
import TextFieldGroup from '../common/TextFieldGroup'
import InputGroup from '../common/InputGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types'

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            wechat: '',
            QQ: '',
            tengxunkt: '',
            wangyikt: '',
            errors: {}
        }

        this.onSubmit = this
            .onSubmit
            .bind(this);
        this.onChange = this
            .onChange
            .bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            wechat: this.state.wechat,
            QQ: this.state.QQ,
            tengxunkt: this.state.tengxunkt,
            wangyikt: this.state.wangyikt
        };

        this
            .props
            .createProfile(profileData, this.props.history)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { errors, displaySocialInputs } = this.state;
        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Wechart"
                        name="wechat"
                        icon="fab fa-weixin"
                        value={this.state.wechat}
                        onChange={this.onChange}
                        error={errors.wechat} />

                    <InputGroup
                        placeholder="QQ"
                        name="QQ"
                        icon="fab fa-qq"
                        value={this.state.QQ}
                        onChange={this.onChange}
                        error={errors.QQ} />

                    {/* <InputGroup
                        placeholder="Tengxun school"
                        name="tengxunkt"
                        icon="fab fa-wechat"
                        value={this.state.tengxunkt}
                        onChange={this.onChange}
                        error={errors.tengxunkt} />

                    <InputGroup
                        placeholder="Wangyi school"
                        name="wangyikt"
                        icon="fab fa-wechat"
                        value={this.state.wangyikt}
                        onChange={this.onChange}
                        error={errors.wangyikt} /> */}
                </div>
            );
        }

        const options = [
            {
                label: "* Please choose your occupation",
                value: "* Please choose your occupation"
            }, {
                label: 'Junior Software Developer',
                value: 'Junior Software Developer'
            }, {
                label: 'Software Developer',
                value: 'Software Developer'
            }, {
                label: 'Senior Software Engineer',
                value: 'Senior Software Engineer'
            }, {
                label: 'HighDeveloper',
                value: 'Front end senior engineer'
            }, {
                label: 'Manager',
                value: 'Project Manager'
            }, {
                label: 'Backend Developer',
                value: 'Backhend Developer'
            }, {
                label: 'Python machine learning',
                value: 'Python machine learning'
            }, {
                label: 'Architect Engineer',
                value: 'Architect Engineer'
            }, {
                label: 'Other',
                value: 'Other'
            }
        ];

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create personal information</h1>
                            <p className="lead text-center">Fill in your personal information and let us know more about you</p>
                            <small className="d-block pb-3">* Is required</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="Your email address" />
                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.status}
                                    info="Please let us know your current position" />

                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="It can be your own company or your working company" />
                                <TextFieldGroup
                                    placeholder="网址"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Your company's website or your company's website" />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="Your city and district (for example:Yanta District, Xi'an)" />
                                <TextFieldGroup
                                    placeholder="* Programming language skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use commas to separate your language (for example: React,Vue,JavaScript)" />
                                <TextFieldGroup
                                    placeholder="Github user name"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="If you want to share your project with others, you can fill in your GitHub user name" />
                                <TextAreaFieldGroup
                                    placeholder="Self-introduction"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Introduce yourself" />

                                <div className="mb-3">
                                    <button
                                        className="btn btn-info mb-3 float-left"
                                        type="button"
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }))
                                        }}>Add social account</button>
                                    <span className="text-muted">Option</span>
                                </div>

                                {socialInputs}
                                <input type="submit" class="btn btn-info btn-block mt-4" value="Submit" />

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ profile: state.profile, errors: state.errors });

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));