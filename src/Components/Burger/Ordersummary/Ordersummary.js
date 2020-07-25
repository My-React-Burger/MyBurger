import React from 'react';
import Aux from '../../../hoc/Auxil/Auxil';
import Button from '../../UI/Button/Button';
const Ordersummary=(props) =>{
    
    const Ingredient=Object.keys(props.ingre)
    .map(igkey =>{
    return <li key={igkey}><span style={{textTransform: 'capitalize'}}>{igkey}</span>: {props.ingre[igkey]}
         </li>
    });
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>{Ingredient}</ul>
    <p><strong>TOTAL PRICE:{props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.cancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continue}>CONTINUE</Button>
        </Aux>
    )
}
export default Ordersummary;