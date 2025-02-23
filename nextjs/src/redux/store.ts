import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./features/login/reducer";
import UserLoggedInReducer from "./features/user/reducer";
import logoutReducer from "./features/logout/reducer";
import categoriesReducer from "./features/categories/reducer";
import modalReducer from "./features/modal/reducer";
import questionsReducer from "./features/questions/reducer";
import generalReducer from "./features/general/reducer";
import ticketsReducer from "./features/tickets/reducer";
import messagesReducer from "./features/messages/reducer";
import widgetsReducer from "./features/widgets/reducer";
import exportReducer from "./features/exports/reducer";
import resetPasswordReducer from "./features/changepasswords/reducer";
export default configureStore({
  reducer: {
    login: loginReducer,
    user: UserLoggedInReducer,
    logout: logoutReducer,
    categories: categoriesReducer,
    modal: modalReducer,
    questions: questionsReducer,
    general: generalReducer,
    tickets: ticketsReducer,
    messages: messagesReducer,
    widgets: widgetsReducer,
    exports: exportReducer,
    changepasswords: resetPasswordReducer
  }
})
