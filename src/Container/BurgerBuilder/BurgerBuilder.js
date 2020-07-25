import React,{Component} from 'react';
import Aux from '../../hoc/Auxil/Auxil';
import Burger from '../../Components/Burger/Burger';
import Modal from '../../Components/UI/Modal/Modal';
import Ordersummary from '../../Components/Burger/Ordersummary/Ordersummary';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../Store/action/index';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/wihtErrorHandler/withErrorHandler';

class BurgerBuilder extends Component{
    

    state={
        // disableInfo: {
        //     salad: true,
        //     meat: true,
        //     cheese: true,
        //     bacon: true
        // }
        Purchasing: false,
        error: false
    }
    Updatepurchase=()=>{
        if(this.props.IsAuthenticated){
        this.setState({Purchasing: true});
    }
    else{
        this.props.onSetAuthRedirectPath('/checkout')
        this.props.history.push('/auth');
    }
}
    Reupdatepurchase=()=>{
        this.setState({Purchasing: false});
    }
    Purchasecontinue=()=>{
        // this.setState({ShowSpinner: true})
        //  const order={
        //      ingredients: this.state.ingredient,
        //      price: this.state.total,
        //      customer:{
        //          name: 'Maxi',
        //          address: {
        //             colony: 'Behind Something',
        //             country: 'India'
        //         },
        //         email: 'test@test.com'
        //      },
        //      deliveryMethod: 'Fastest'
        //  }
        //    Axios.post('/orders.json',order)
        //         .then(response =>{this.setState({Purchasing: false,ShowSpinner: false});})
        //         .catch(error =>{this.setState({Purchasing: false,ShowSpinner:false});});
        // alert('Plz Continue!');
        this.props.onInitPurchase();
       this.props.history.push('/checkout');
    }
    Updatestate=(Ing) =>{
        const Sum= Object.keys(Ing)
        .map((igkey) =>{
            return Ing[igkey]
        })
        .reduce((Sum,el) =>{
          return Sum+el
        },0);
        return Sum >0;
    }
    componentDidMount(){
       this.props.onInitIngredients();
    }
    render(){
        const disableInfo={...this.props.ings};
        for(let key in disableInfo){
            disableInfo[key]= disableInfo[key]<=0
        }

        let order= null;
        if(this.props.ings){
            order= <Ordersummary  
            ingre={this.props.ings}
            cancel={this.Reupdatepurchase}
            continue={this.Purchasecontinue}
            price={this.props.price}/>
        }

        let burgercontrol= this.props.error ? <p>Ingredients can't be loaded !...</p> : <Spinner /> ;
         if(this.props.ings){
             burgercontrol= <Aux>
                  <Burger ingredients={this.props.ings} />
             <BuildControls 
             added={this.props.onIngredientAdded}
             remove={this.props.onIngredientRemoved}
             disabled={disableInfo}
             price={this.props.price}
             Purchase={this.Updatestate(this.props.ings)}
             show={this.Updatepurchase}
             IsAuth={this.props.IsAuthenticated}
            />
             </Aux>
         }
        return(
            <Aux>
                <Modal show={this.state.Purchasing}  modalclosed={this.Reupdatepurchase}>
                 {order}
                </Modal>
                {burgercontrol}
            </Aux>
        )
    }
}
const mapStateToProps=(state) =>{
 return{
   ings: state.burgerBuilder.ingredient,
   price: state.burgerBuilder.total,
   error: state.burgerBuilder.error,
   IsAuthenticated: state.auth.TokenID !== null
 }
}
const mapDispatchToProps=(dispatch) =>{
return{
  onIngredientAdded: (ingname) => dispatch(burgerBuilderActions.addIngredient(ingname)),
  onIngredientRemoved: (ingname) => dispatch(burgerBuilderActions.removeIngredient(ingname)),
  onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  onInitPurchase: () => dispatch(burgerBuilderActions.purchaseinit()),
  onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectpath(path))
}
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,Axios));