import React, { Component } from 'react';
import {  Text, View, FlatList, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import  Loading  from './loading.js';
import  {Actions}  from 'react-native-router-flux';
import Meteor from 'react-native-meteor';

var styles = StyleSheet.create({
  image: {
    height: 250,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  container: {
    borderWidth: 2,
    backgroundColor: '#dcdcdc'
  },
  contentContainer :{

  },
  ingredientContainer: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    flexDirection: 'row',
    color: 'black',
    textAlign: 'center'
  },
  spacer: {
    marginTop: '5%'
  }

});
 export default class Home extends Component {
  constructor(props) {
    super(props);
    const Collection = Meteor.collection('recipes');
    const recipes = Collection.find({});
    this.state = {loading: false, recipes: recipes};
 }


  goToRecipe(id){
  Actions.recipe({id: id});
  }



  renderRecipes(){
    console.log(this.state.recipes[0]);
      return  this.state.recipes.map((recipe, index) => (
        <TouchableOpacity  key={index} onPress={() => this.goToRecipe(recipe._id)} >
        <View  style={styles.container}>
        <Text style={styles.recipeTitle}> {recipe.title}</Text>
        <Image style={styles.image} source={{uri: recipe.image_src}}/>
        </View>
        </TouchableOpacity>
    ))
  }


renderLoading(){

  if(this.state.recipes.length <= 0){
    return (<Text> There are no vegan recipes :( </Text>)
  } else {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
      {this.renderRecipes()}
      </ScrollView>
    )
  }

}

  render() {
    return (
      <ScrollView>
      {this.renderLoading()}
      </ScrollView>
    );
  }
}
