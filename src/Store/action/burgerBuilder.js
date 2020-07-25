import * as actionTypes from './actionTypes';
import Axios from '../../axios-order';

export const addIngredient = (name) =>{
    return {
        type: actionTypes.ADD_INGREDIENTS,
        IngredientName: name
    }
}
export const removeIngredient = (name) =>{
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        IngredientName: name
    }
}
export const setIngredients =(ingredients) =>{
    return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
    }
}
export const fetchIngredientsfailed =() =>{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredients =() =>{
    return dispatch =>{
     Axios.get('ThisWIllbeaddedbyyou')
             .then(response => {
                 dispatch(setIngredients(response.data))
             })
             .catch(error => {
               dispatch(fetchIngredientsfailed())
             });
    }
}
