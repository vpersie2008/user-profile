import axios from 'axios';
import {
    ADD_POST,
    GET_POSTS,
    GET_POST,
    DELETE_POST,
    POST_LOADDING,
    GET_ERRORS
} from './types';

//Add comments
export const addPost = postData => dispatch => {
    axios
        .post("/api/posts", postData)
        .then(res => dispatch({ type: ADD_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
};

//Get comments
export const getPosts = () => dispatch => {
    dispatch(setPostLoading);
    axios
        .get("/api/posts")
        .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
        .catch(err => dispatch({ type: GET_POSTS, payload: null }))

};

// Get a single comment
export const getPost = id => dispatch => {
    dispatch(setPostLoading);
    axios
        .get(`/api/posts/${id}`)
        .then(res => dispatch({ type: GET_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_POST, payload: null }))
};

// Delete a comment
export const deletePost = id => dispatch => {
    axios
        .delete(`/api/posts/${id}`)
        .then(res => dispatch({ type: DELETE_POST, payload: id }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
};

//Add like
export const addLike = id => dispatch => {
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => window.location.reload())
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Cancel lile
export const removeLike = id => dispatch => {
    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => window.location.reload())
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
};

// Add comment
export const addComment = (postId, commentData) => dispatch => {
    axios
        .post(`/api/posts/comment/${postId}`, commentData)
        .then(res => dispatch({ type: GET_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
};

// Delete comment
export const deleteComment = (postId, commentId) => dispatch => {
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => dispatch({ type: GET_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
};

// Load animation
export const setPostLoading = () => {
    return { type: POST_LOADDING }
}
