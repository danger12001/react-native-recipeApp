import Home from './ui/App.js'
import  Recipe  from './ui/Recipe.js';

import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux'

export default class App extends Component  {
  render(){

return (
  <Router>
    <Stack key="root">
    <Scene key="home" component={Home} title="Home"/>
      <Scene key="recipe" component={Recipe} title="Recipe"/>
    </Stack>
  </Router>
);
}

}
