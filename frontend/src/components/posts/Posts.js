import React, { Component } from 'react'
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getPosts } from '../../actions/postActions'
import Spinner from '../../components/common/Spinner'
import PostForm from './PostForm'
import PostFeed from './PostFeed'

class Posts extends Component {

    componentDidMount() {
        this
            .props
            .getPosts();
    }

    render() {
        const { posts, loading } = this.props.post;

        let postContent;
        if (posts === null || loading) {

            postContent = <Spinner />

        } else {
            postContent = <PostFeed posts={posts} />
        }

        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/* Show comments form */}
                            <PostForm />
                            {/* Show likes content */}
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ post: state.post });

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getPosts })(Posts);
