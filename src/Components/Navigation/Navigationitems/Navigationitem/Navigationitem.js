import React from 'react';
import classes from './Navigationitem.module.css';
import {NavLink} from 'react-router-dom';
const Navigationitem=(props) =>(
<li className={classes.Navigationitem}>
    <NavLink to={props.link}
    activeClassName={classes.active}
    exact={props.exact}>
        {props.children}
        </NavLink></li>
);
export default Navigationitem;