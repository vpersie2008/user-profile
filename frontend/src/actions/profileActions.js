import axios from 'axios'
import {
  GET_PROFILE,
  GET_ERRORS,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES,
  GET_GITHUBS
} from './types'

export const getCurrentProfile = () => dispatch => {

  //Load animation
  dispatch(setProfileLoading());

  //Request data
  axios('/api/profile')
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const setProfileLoading = () => {
  return { type: PROFILE_LOADING }
}

//Clear login profile
export const clearCurrentProfile = () => {
  return { type: CLEAR_CURRENT_PROFILE }

}

//Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

//Delete profile
export const deleteAccount = () => dispatch => {
  axios
    .delete('/api/profile')
    .then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))

}

//Add personal profile
export const addExperience = (expData, history) => dispatch => {

  axios
    .post("/api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

//Add educational experience
export const addEducation = (expData, history) => dispatch => {
  axios
    .post("api/profile/education", expData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

//Delete resume
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))

}

//Delete educational experience or delete educational experience
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

//Get all personnel information
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res => dispatch({ type: GET_PROFILES, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

//Get all personnel information
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());

  axios(`/api/profile/handle/${handle}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: null }))
}

//Get basic information of GitHub
export const getGithubInfos = requestBody => dispatch => {
  const { count, clientId, clientSecret, sort, username } = requestBody;
  fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.message != 'Not Found') {
        dispatch({ type: GET_GITHUBS, payload: data });
      }
    })
    .catch(err => dispatch({ type: GET_GITHUBS, payload: [] }));
}
