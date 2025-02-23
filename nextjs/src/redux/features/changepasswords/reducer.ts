import * as types from '@/constants/types'
import { stat } from 'fs'

const initialState = {
    dataPassword: null,
    loadingPassword: false,
    errorPassword: null,
}

export default function resetPasswordReducer(state = initialState, action: any) {
    switch (action.type) {
        case types.PUT_RESETPASS_LOADING:
            return {
                ...state,
                loadingPassword: action.payload.loading,
                errorPassword: null
            }
        case types.PUT_RESETPASS_SUCCESS:
            return {
                ...state,
                loadingPassword: false,
                dataPassword: action.payload,
                errorPassword: null
            }
        case types.PUT_RESETPASS_ERROR:
            return {
                ...state,
                loadingPassword: false,
                errorPassword: action.payload
            }
        case types.CLEAR_RESETPASS:
            return {
                ...state,
                dataPassword:initialState.dataPassword,
                loadingPassword: initialState.loadingPassword,
                errorPassword:initialState.errorPassword
            }
        default:
            return state
    }
}
