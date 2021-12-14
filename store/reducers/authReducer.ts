import { ActionTypes,AuthInit,AuthFail,AuthSuccess,LogOut } from "../actions"



const initialState = {
    user:{},
    error:null,
    loading:false
}

const authinit = (state , action:AuthInit) => {
    return {
        ...state,
        error: null,
        loading: true
    }
}

const authsuccess = (state , action:AuthSuccess) => {
    return {
        ...state,
        error: null,
        user: action.user,
        
    }
}

const authfail = (state , action:AuthFail) => {
    return {
        ...state,
        user: {},
        error: action.error,
        loading: false,
    }
}

const authlogout = (state , action:LogOut) => {
    return {
        ...state,
        error: null,
        user:{}
    }
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_INIT: return authinit(state, action)
        case ActionTypes.AUTH_SUCCESS: return authsuccess(state, action)
        case ActionTypes.AUTH_FAIL: return authfail(state, action)
        case ActionTypes.LOG_OUT: return authlogout(state, action)
        
        default: return state
    }
}

export default reducer
