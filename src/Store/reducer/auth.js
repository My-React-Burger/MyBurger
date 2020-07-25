import * as actionTypes from '../action/actionTypes';
import {UpdateObject} from '../utility';

const initState ={
    UserID: null,
    TokenID: null,
    loading: false,
    error: null,
    authRedirectPath: '/'
}
const authStart =(state,action) =>{
  return UpdateObject(state,{error: null, loading: true})
}
const authSuccess =(state,action) =>{
    return UpdateObject(state,{
        UserID: action.userid,
        TokenID: action.tokenid,
        loading: false,
        error: null
    })
}
const authFail =(state,action) =>{
    return UpdateObject(state,{loading: false, error: action.error})
}
const authLogout = (state,action) =>{
    return UpdateObject(state,{TokenID: null, UserID: null})
}
const setAuthRedirectPath = (state,action) =>{
    return UpdateObject(state,{authRedirectPath: action.path})
}
const reducer =(state= initState, action) =>{
    switch(action.type){

        case(actionTypes.AUTH_START): return authStart(state,action);
        case(actionTypes.AUTH_SUCCESS): return authSuccess(state,action);
        case(actionTypes.AUTH_FAIL): return authFail(state,action);
        case(actionTypes.AUTH_LOGOUT): return authLogout(state,action);
        case(actionTypes.SET_AUTH_REDIRECTPATH): return setAuthRedirectPath(state,action);
        default: return state
    }
}
export default reducer;