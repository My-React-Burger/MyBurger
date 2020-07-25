import * as actionTypes from '../action/actionTypes';
import {UpdateObject} from '../utility';

const init ={
    order: [],
    loading: false,
    purchased: false
}
const purchaseInit =(state, action) =>{
    return UpdateObject(state, {purchased: false});
}
const purchaseBurgerStart =(state, action) =>{
    return UpdateObject(state, {loading: true});
}
const purchaseBurgerSuccess =(state, action) =>{
    const neworder = UpdateObject(action.orderData, {id: action.orderID});
      
        return UpdateObject(state, {
            loading: false,
           purchased: true,
            order: state.order.concat(neworder)
        })
}
const purchaseBurgerFail =(state, action) =>{
    return UpdateObject(state, {loading: false});
}
const fetchorderstart =(state, action) =>{
    return UpdateObject(state, {loading: true});
}
const fetchordersuccess =(state, action) =>{
    return UpdateObject(state, { 
        order: action.orders,
        loading: false});
}
const fetchorderfail =(state, action) =>{
    return UpdateObject(state, {loading: false});
}
const reducer =(state = init, action) =>{
    switch(action.type){
         
        case(actionTypes.PURCHASE_INIT): return purchaseInit(state,action);
       
        case(actionTypes.PURCHASE_BURGER_START): return purchaseBurgerStart(state,action);
       
        case(actionTypes.PURCHASE_BURGER_SUCCESS): return purchaseBurgerSuccess(state,action)
      
        case(actionTypes.PURCHASE_BURGER_FAIL): return purchaseBurgerFail(state,action);
       
        case(actionTypes.FETCH_ORDER_START): return fetchorderstart(state,action);
        
        case(actionTypes.FETCH_ORDER_SUCCESS): return fetchordersuccess(state,action);
      
        case(actionTypes.FETCH_ORDER_FAIL): return fetchorderfail(state,action);
        default:
            return state;
    }
}
export default reducer;