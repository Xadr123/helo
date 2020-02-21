const initialState = {
    // user: {}
    userId: 0,
    username: '',
    profile: ''
}

const GET_USER = 'GET_USER'

export function getUser(userObj) {
    return {
        type: GET_USER,
        payload: userObj
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}