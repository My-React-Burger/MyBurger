import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';
import classes from './Sidedrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxil/Auxil';
const Sidedrawer=(props)=>{
    let Sidedrawerstate=[classes.Sidedrawer,classes.Open]
    if(!props.show){
       Sidedrawerstate=[classes.Sidedrawer,classes.Close]
    }
    return(
        <Aux>
            <Backdrop show={props.show} modalclosed={props.closed}/>
            <div className={Sidedrawerstate.join(' ')} onClick={props.closed}>
           <div className={classes.Logo}>
       <Logo />
       </div>
            <nav>
                <Navigationitems IsAuth={props.IsAuth}/>
            </nav>
        </div>
        </Aux>
    )
}
export default Sidedrawer;