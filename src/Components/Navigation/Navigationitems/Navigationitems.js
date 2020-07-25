import React from 'react';
import Navigationitem from './Navigationitem/Navigationitem';
import classes from './Navigationitems.module.css';
const Navigationitems =(props)=>(
    <ul className={classes.Navigationitems}>
     <Navigationitem link="/" exact>BurgerBuilder</Navigationitem>
     {props.IsAuth ? <Navigationitem link="/orders">Orders</Navigationitem>: null}
     {props.IsAuth 
     ? <Navigationitem link="/logout">LOGOUT</Navigationitem>
     :<Navigationitem link="/auth">Authentication</Navigationitem>}
    </ul>
);
export default Navigationitems;