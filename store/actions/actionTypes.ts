import {User} from '../../types'

export enum ActionTypes {
    AUTH_INIT = 'AUTH_INIT',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAIL = 'AUTH_FAIL',
    LOG_OUT = 'LOG_OUT'
}


export interface AuthInit {
    type: ActionTypes.AUTH_INIT,
    
}

export interface AuthSuccess {
    type: ActionTypes.AUTH_SUCCESS,
    user: any
}

export interface AuthFail {
    type: ActionTypes.AUTH_FAIL,
    error: any
}

export interface LogOut {
    type: ActionTypes.LOG_OUT,
}

export type ToDoAction = AuthInit|AuthSuccess|AuthFail|LogOut;
