import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';
import Drawertoggle from '../Sidedrawer/Drawertoggle/Drawertoggle';
const Toolbar =(props) =>(
    <header className={classes.Toolbar}>
       <Drawertoggle change={props.change}/>
       <div className={classes.Logo}>
       <Logo />
       </div>
       <nav className={classes.Desktop}><Navigationitems IsAuth={props.IsAuth}/></nav>
    </header>
);
export default Toolbar;