import Home from './ui/App.js'
import  Recipe  from './ui/Recipe.js';
import Meteor, { createContainer } from 'react-native-meteor';


import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux'
Meteor.connect('ws://localhost:3000/websocket');//do this only once

 class App extends Component  {
  render(){
    const Collection = Meteor.collection('recipes');
    const recipes = Collection.find({});
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
export default createContainer(params=>{
  return {
  };
}, App)
