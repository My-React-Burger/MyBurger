import * as actionTypes from '../action/actionTypes';
import {UpdateObject} from '../utility';

const InitialState = {
    ingredient: null,
        total: 20,
        error: false,
        building: false
}
const INGPRICES={
    salad: 5,
    bacon: 15,
    cheese: 30,
    meat: 50
}
const addIngredient = (state, action) =>{
    const UpdateIngredient = {[action.IngredientName] : state.ingredient[action.IngredientName] + 1}
    const UpdatedIngredients = UpdateObject(state.ingredient, UpdateIngredient)
    const UpdatedState = {
        ingredient: UpdatedIngredients,
        total: state.total + INGPRICES[action.IngredientName],
        building: true
    }
    return UpdateObject(state,UpdatedState);
}
const removeIngredient = (state, action) =>{
    const UpdateIng = {[action.IngredientName] : state.ingredient[action.IngredientName] - 1}
    const UpdatedIngs = UpdateObject(state.ingredient, UpdateIng)
    const UpdatedSt = {
        ingredient: UpdatedIngs,
        total: state.total - INGPRICES[action.IngredientName],
        building: true
    }
    return UpdateObject(state,UpdatedSt);
}
const setIngredient =(state,action) =>{
    return UpdateObject(state, {
        ingredient: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
           cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
            
        },
        error: false,
        total: 20,
        building: false
    });
}
const fetchIngredient =(state,action) =>{
    return UpdateObject(state, {error: true});
}
const reducer =(state = InitialState, action) =>{
        switch(action.type){

            case(actionTypes.ADD_INGREDIENTS): return addIngredient(state,action)
            case(actionTypes.REMOVE_INGREDIENTS): return removeIngredient(state, action)
            case(actionTypes.SET_INGREDIENTS): return setIngredient(state,action) 
            case(actionTypes.FETCH_INGREDIENTS_FAILED): return fetchIngredient(state, action)
             default: return state;
        }
}
export default reducer;