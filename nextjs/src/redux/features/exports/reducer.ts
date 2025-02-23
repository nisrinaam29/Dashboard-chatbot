import * as types from '@/constants/types'
import { loadBindings } from 'next/dist/build/swc'

const initialState = {
    data: null,
    loading: false,
    error: null,
}
export default function exportReducer(state = initialState, action: any) {
    switch (action.type) {
        case types.GET_EXPORTS_LOADING:
            return {
                ...state,
                loading: action.payload.loading,
                error: null
            }
        case types.GET_EXPORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        case types.GET_EXPORTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case types.CLEAR_EXPORT:
            return initialState
        default:
            return state
    }
}