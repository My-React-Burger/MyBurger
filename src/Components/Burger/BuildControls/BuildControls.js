import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from '../../Burger/BuildControls/BuildControl/BuildControl';
const control=[
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];
const BuildControls =(props) =>(
    <div className={classes.BuildControls}>
        <h3>TOTAL PRICE: <strong>{props.price.toFixed(2)}</strong></h3>
     {control.map(ctrl =>{
     return  <BuildControl 
     key={ctrl.label} 
     label={ctrl.label} 
     add={() => props.added(ctrl.type)} 
     rem={()=>props.remove(ctrl.type) }
     disabled={props.disabled[ctrl.type]}/>     
      })}
      <button className={classes.OrderButton} disabled={!props.Purchase} onClick={props.show}>{props.IsAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER NOW'}</button>
    </div>
)
export default BuildControls;