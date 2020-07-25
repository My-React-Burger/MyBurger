import * as actionTypes from './actionTypes';
import Axios from '../../axios-order';

export const purchaseSuccess = (id, orderData) =>{
    return {
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      orderID: id,
      orderData: orderData
    }
}

export const purchaseFail = (error) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}
export const purchaseBurgerStart =() =>{
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData, token) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        Axios.post('/orders.json?auth='+token,orderData)
        .then(response =>{
           dispatch(purchaseSuccess(response.data.name, orderData));
        })
        .catch(error =>{
            dispatch(purchaseFail(error));
        });
    }
}
export const purchaseinit = () =>{
    return{
        type: actionTypes.PURCHASE_INIT
    }
}
export const fetchordersuccess = (orders) =>{
    return {
      type: actionTypes.FETCH_ORDER_SUCCESS,
      orders: orders
    }
}
export const fetchorderfails = (error) =>{
    return {
      type: actionTypes.FETCH_ORDER_FAIL,
      error: error
    }
}
export const fetchorderstart = () =>{
    return {
      type: actionTypes.FETCH_ORDER_START
    }
}
export const fetchorders = (token,userId) =>{
    return dispatch => {
        dispatch(fetchorderstart());
        const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        Axios.get('/orders.json'+queryParam)
        .then(res=>{
          const fetchOrders =[];
          for(let key in res.data){
             fetchOrders.push({
               ...res.data[key],
                id: key
             });
          }
          dispatch(fetchordersuccess(fetchOrders))
        })
        .catch(er=>{
         dispatch(fetchorderfails(er))
        });
    }
}