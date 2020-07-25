import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (UserId, TokenID) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userid: UserId,
        tokenid: TokenID
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const logOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout =(expireTime) =>{
    return dispatch => {
    setTimeout(() =>{
    dispatch(logOut());
    },expireTime*1000)
    }
}
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCP_KeL5guGBVAjmhrJhEC8nGE-fC5Bvls';
        if(!isSignUp){
            url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCP_KeL5guGBVAjmhrJhEC8nGE-fC5Bvls'
        }
        Axios.post(url, authData)
              .then(res =>{
                 let expirationDate = new Date(new Date().getTime() + res.data.expiresIn*1000)
                 localStorage.setItem('token', res.data.idToken);
                 localStorage.setItem('expirationDate', expirationDate);
                 localStorage.setItem('userId', res.data.localId);
                 dispatch(authSuccess(res.data.localId,res.data.idToken));
                 dispatch(checkAuthTimeout(res.data.expiresIn))
              })
              .catch(er =>{
                   dispatch(authFail(er.response.data.error));
              });
    };
};
export const setAuthRedirectpath = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECTPATH,
        path: path
    }
}
export const authCheckState = () =>{
    return dispatch =>{
       const token = localStorage.getItem('token');
       if(!token){
           dispatch(logOut());
       }
       else {
           const expiration = new Date(localStorage.getItem('expirationDate'));
           if(expiration > new Date()){
               const userId = localStorage.getItem('userId');
               dispatch(authSuccess(userId,token));
               dispatch(checkAuthTimeout((expiration.getTime() - new Date().getTime())/1000));
           }
           else{
               dispatch(logOut());
           }
       }
    }
}