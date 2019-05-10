import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';
import ToggleButton from '../SideDrawer/ToggleButton/ToggleButton';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <ToggleButton clicked={props.toggleButtonClick}/>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav>
      <NavigationItems isAuthenticated={props.isAuthenticated} />
    </nav>
  </header>
)

export default toolbar;