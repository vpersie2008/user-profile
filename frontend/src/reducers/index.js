import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'
import postReducer from './postReducer'

//将所有子reducer合并成一个大的reducer,导出的就是这个整体的rootReducer
export default combineReducers({
    auth: authReducer, 
    errors: errorReducer, 
    profile: profileReducer, // reducer返回的state中的数据都是挂在在对应的对象上的
    post: postReducer
});