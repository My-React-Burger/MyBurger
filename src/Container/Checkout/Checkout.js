import React,{Component} from 'react';
import CheckoutSummary from '../../Components/order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ContactData from './ContactData/ContactaData';

class Checkout extends Component{
   
    CheckoutCalcel=() =>{
        this.props.history.goBack();
    }
    CheckoutContinue=() =>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        let Summary= <Redirect to="/" />
        if(this.props.ings){
            const Purchased = this.props.purchased ? <Redirect to="/" /> : null;
            Summary= (
                <div>
                    {Purchased}
                <CheckoutSummary 
                ingredients={this.props.ings} 
                CheckoutCalcel={this.CheckoutCalcel}
                CheckoutContinue={this.CheckoutContinue}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
            )
        }
        return (
            <div>
               {Summary}
            </div>
        )
    }
}
const mapStateToProps=(state) =>{
    return{
      ings: state.burgerBuilder.ingredient,
      purchased: state.order.purchased
    }
   }
export default connect( mapStateToProps)(Checkout);