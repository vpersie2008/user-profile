import { GET_ERRORS } from './types'
import { SET_CURRENT_USER } from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => {
            if (res.data) {
                history.push('/login');
                const { email, password } = userData;
                dispatch(loginUser({ email: email, password: password }));
            }
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}

export const loginUser = (userData) => dispatch => {

    axios
        .post("/api/users/login", userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decode = jwt_decode(token);
            dispatch(setCurrentUser(decode));

        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const setCurrentUser = decode => {
    return { type: SET_CURRENT_USER, payload: decode }
}

export const logoutUser = (decode) => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}