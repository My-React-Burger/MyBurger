import React from 'react';
import classes from './Input.module.css';

const Input =(props)=>{
    let inputElement=null;
    const Inputclasses= [classes.InputElement];

    if(props.invalid && props.touched){
        Inputclasses.push(classes.Invalid);
    }

    switch(props.elementType){
        case('input'):
        inputElement= <input 
        className={Inputclasses.join(' ')} 
        {...props.elementConfig}
        vlaue={props.value}
         onChange={props.changed}/>;
        break;
        case('textarea'):
        inputElement= <textarea 
        className={Inputclasses.join(' ')} 
        {...props.elementConfig}
        vlaue={props.value}
         onChange={props.changed}/>;
        break;
        case('select'):
        inputElement= <select 
        className={Inputclasses.join(' ')} 
        vlaue={props.value}
         onChange={props.changed}>
            {props.elementConfig.options.map(option =>{
                return <option
                key={option.value}
                value={option.value}>
                   {option.displayValue}
                </option>
            })}
        </select>;
        break;
        default:
            inputElement= <input 
            className={Inputclasses.join(' ')} 
            {...props.elementConfig}
            vlaue={props.value}
             onChange={props.changed}/>;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
           {inputElement}
        </div>
    )
}
export default Input;