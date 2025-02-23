import type * as types from '@/constants/types'

interface PostLoginLoadingAction {
  type: typeof types.POST_LOGIN_LOADING
  payload: {
    loading: boolean
  }
}

interface PostLoginSuccessAction {
  type: typeof types.POST_LOGIN_SUCCESS
  payload: any
}

interface PostLoginFailedAction {
  type: typeof types.POST_LOGIN_FAILED
  payload: any
}

interface PostLogoutLoadingAction {
  type: typeof types.POST_LOGOUT_LOADING
  payload: {
    loading: boolean
  }
}

interface PostLogoutSuccessAction {
  type: typeof types.POST_LOGOUT_SUCCESS
  payload: any
}

interface PostLogoutFailedAction {
  type: typeof types.POST_LOGOUT_FAILED
  payload: any
}

interface GetQuestionsLoadingAction {
  type: typeof types.GET_QUESTIONS_LOADING
  payload: {
    loading: boolean
  }
}

interface GetQuestionsSuccessAction {
  type: typeof types.GET_QUESTIONS_SUCCESS
  payload: any
}

interface GetQuestionsFailedAction {
  type: typeof types.GET_QUESTIONS_FAILED
  payload: any
}

interface GetTestLoadingAction {
  type: typeof types.GET_TEST_LOADING
  payload: {
    loading: boolean
  }
}

interface GetTestSuccessAction {
  type: typeof types.GET_TEST_SUCCESS
  payload: any
}

interface GetTestFailedAction {
  type: typeof types.GET_TEST_FAILED
  payload: any
}

interface GetUserLoadingAction {
  type: typeof types.GET_USER_LOADING
  payload: {
    loading: boolean
  }
}

interface GetAllUsersSuccessAction {
  type: typeof types.GET_ALL_USERS_SUCCESS
  payload: any
}

interface GetAllUsersLoginFailedAction {
  type: typeof types.GET_ALL_USERS_FAILED
  payload: any
}

interface GetAllUsersLoadingAction {
  type: typeof types.GET_ALL_USERS_LOADING
  payload: {
    loading: boolean
  }
}

interface GetUserSuccessAction {
  type: typeof types.GET_USER_SUCCESS
  payload: any
}

interface GetUserLoginFailedAction {
  type: typeof types.GET_USER_FAILED
  payload: any
}

interface PostAnswerLoadingAction {
  type: typeof types.POST_ANSWER_LOADING
  payload: {
    loading: boolean
  }
}

interface PostAnswerSuccessAction {
  type: typeof types.POST_ANSWER_SUCCESS
  payload: any
}

interface PostAnswerLoginFailedAction {
  type: typeof types.POST_ANSWER_FAILED
  payload: any
}

interface OpenToastAction {
  type: typeof types.OPEN_TOAST
  payload: any
}

interface OpenModalAction {
  type: typeof types.SET_OPEN_MODAL
  payload: any
}

interface GetResultsLoadingAction {
  type: typeof types.GET_RESULTS_LOADING
  payload: {
    loading: boolean
  }
}

interface GetResultsSuccessAction {
  type: typeof types.GET_RESULTS_SUCCESS
  payload: any
}

interface GetResultsFailedAction {
  type: typeof types.GET_RESULTS_FAILED
  payload: any
}

interface PutUpdateStatusSuccessAction {
  type: typeof types.PUT_UPDATE_STATUS_SUCCESS
  payload: any
}

interface PutUpdateStatusFailedAction {
  type: typeof types.PUT_UPDATE_STATUS_FAILED
  payload: any
}

interface PutUpdateStatusLoadingAction {
  type: typeof types.PUT_UPDATE_STATUS_LOADING
  payload: any
}

interface PutResetPasswordLoadingAction {
  type: typeof types.PUT_RESETPASS_LOADING
  payload: any
}

interface PutResetPasswordFailedAction {
  type: typeof types.PUT_RESETPASS_ERROR
  payload: any
}

interface PutResetPasswordSuccessAction {
  type: typeof types.PUT_RESETPASS_SUCCESS
  payload: any
}


interface PostCreateCategorySuccessAction {
  type: typeof types.POST_CATEGORY_SUCCESS
  payload: any
}
interface PostCreateCategoryLoadingAction {
  type: typeof types.POST_CATEGORY_LOADING
  payload: any
}
interface PostCreateCategoryErrorAction {
  type: typeof types.POST_CATEGORY_FAILED
  payload: any
}

export type Actions =
  | PostLoginLoadingAction
  | PostLoginSuccessAction
  | PostLoginFailedAction
  | PostLogoutLoadingAction
  | PostLogoutSuccessAction
  | PostLogoutFailedAction
  | GetQuestionsLoadingAction
  | GetQuestionsSuccessAction
  | GetQuestionsFailedAction
  | GetUserLoadingAction
  | GetUserSuccessAction
  | GetUserLoginFailedAction
  | GetAllUsersLoadingAction
  | GetAllUsersSuccessAction
  | GetAllUsersLoginFailedAction
  | PostAnswerLoadingAction
  | PostAnswerSuccessAction
  | PostAnswerLoginFailedAction
  | OpenToastAction
  | GetTestLoadingAction
  | GetTestSuccessAction
  | GetTestFailedAction
  | OpenModalAction
  | GetResultsLoadingAction
  | GetResultsSuccessAction
  | GetResultsFailedAction
  | PutUpdateStatusSuccessAction
  | PutUpdateStatusFailedAction
  | PutUpdateStatusLoadingAction
  | PutResetPasswordLoadingAction
  | PutResetPasswordFailedAction
  | PutResetPasswordSuccessAction
  | PostCreateCategorySuccessAction
  | PostCreateCategoryLoadingAction
  | PostCreateCategoryErrorAction

