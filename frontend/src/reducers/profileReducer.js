import {
    GET_PROFILE,
    GET_ERRORS,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_PROFILES,
    GET_GITHUBS
} from '../actions/types'

const initialState = {
    profile: null,
    profiles: null,
    loading: false,
    github: []
}

export default function (state = initialState, action) {

    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            }
        case GET_ERRORS:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        case GET_GITHUBS:
            return {
                ...state,
                github: action.payload
            }
        default:
            return state;
    }

}