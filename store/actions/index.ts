export * from './actionTypes'
export * as UserActionList from './userActions' 

export interface ReducerStoreState{
    Authdata: {
        user: object,
        error: null | object,
        loading: boolean
    }
}

