import React from 'react';
import BurgerIngredient from '../../Components/Burger/BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
const Burger=(props) =>{
    let trnsfrmingrdnt=Object.keys(props.ingredients)
    .map(igkey =>{
        return [...Array(props.ingredients[igkey])].map((_,i)=>{
            return <BurgerIngredient key={igkey+i} type={igkey} />
        });
    })
    .reduce((arr,el) =>{
        return arr.concat(el)
    },[]);
    if(trnsfrmingrdnt.length===0){
        trnsfrmingrdnt=<p>Please Insert Ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                      {trnsfrmingrdnt}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}
export default Burger;