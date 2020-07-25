import React,{Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import Axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/wihtErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import * as actions from '../../../Store/action/index';
class ContactData extends Component{
    state={
        orderform:{
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                  street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Street'
                    },
                    value: '',
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                  zipcode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your ZIP CODE'
                    },
                    value: '',
                    validation:{
                        required: true,
                        MinLen: 5,
                        MaxLen: 5,
                        isNumeric: true
                    },
                    valid: false,
                    touched: false
                }, 
                  country:  {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Country'
                    },
                    value: '',
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false
                },
               email:  {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                   options:[
                       {value: 'fastest', displayValue: 'Fastest'},
                       {value: 'cheapest', displayValue: 'Cheapest'}

                   ]
                },
                value: 'fastest',
                validation:{
                    required: false
                },
                valid: true,
                touched: false
            }
        },
        formIsValid: false
}
    OrderHandler =(event) =>{
        event.preventDefault();
        this.setState({ShowSpinner: true})
        const formdata ={}
        for(let Identi in this.state.orderform){
            formdata[Identi] = this.state.orderform[Identi].value;
        }
         const order={
             ingredients: this.props.ings,
             price: this.props.price,
             orderData: formdata,
             userId: this.props.UserId
         }
         this.props.onOrderBurger(order,this.props.token);
    }
    InputChange =(event,Indentifier) =>{
          const Updateorderform = {
               ...this.state.orderform
           };
          const SuperUpdate = {
               ...Updateorderform[Indentifier]
           }
           SuperUpdate.value = event.target.value;
           SuperUpdate.valid= this.CheckValidity(SuperUpdate.value, SuperUpdate.validation);
           SuperUpdate.touched= true;
           Updateorderform[Indentifier] = SuperUpdate;
          
          let formIsValid= true;
           for(let inputidentifier in Updateorderform){
               formIsValid = Updateorderform[inputidentifier].valid && formIsValid;
        }
           this.setState({orderform: Updateorderform, formIsValid: formIsValid});
    }
    CheckValidity = (value,rules) =>{
              let isValid= true;
              if(rules.required){
                  isValid = value.trim()!=='' && isValid;
              }
              if(rules.MinLen){
                  isValid= value.length >=rules.MinLen && isValid;
              }
              if(rules.MaxLen){
                isValid= value.length <=rules.MaxLen && isValid;
            }
            if (rules.isEmail) {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid
            }
    
            if (rules.isNumeric) {
                const pattern = /^\d+$/;
                isValid = pattern.test(value) && isValid
            }
              return isValid;
    }
    render(){
        let formelement=[];
        for(let key in this.state.orderform){
            formelement.push({
                id: key,
                config: this.state.orderform[key]
            });
        }
        let form = <form onSubmit= {this.OrderHandler}>
                   {formelement.map(formele =>{
                      return  <Input 
                      key={formele.id}
                       elementType={formele.config.elementType}
                       elementConfig={formele.config.elementConfig}
                       value={formele.config.value} 
                       changed={(event) => this.InputChange(event,formele.id)}
                       invalid={!formele.config.valid}
                       touched={formele.config.touched}/>
                   })}
        <Button btnType="Success" disable={!this.state.formIsValid}>Order</Button>
    </form>
    if(this.props.loading){
        form=<Spinner />;
    }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Details Here: </h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps=(state) =>{
    return{
      ings: state.burgerBuilder.ingredient,
      price: state.burgerBuilder.total,
      loading: state.order.loading,
      token: state.auth.TokenID,
      UserId: state.auth.UserID
    }
   }
   const mapDispatchToProps = (dispatch) =>{
       return{
         onOrderBurger : (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
       }
   }
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, Axios));