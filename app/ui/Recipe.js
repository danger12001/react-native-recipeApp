import React, { Component } from 'react';
import {  Text, View, FlatList, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import  Loading  from './loading.js';
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
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    flexDirection: 'row',
    color: 'black',
    textAlign: 'center'
  },
  recipeHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    flex: 1,
    flexDirection: 'row',
    color: 'black',
    textAlign: 'center'
  },
  ingredient: {
    textAlign: 'left',
    fontSize: 18,
    color: 'black',
        fontWeight: 'bold',
  },
  spacer: {
    marginTop: '5%'
  }

});
export default class Recipe extends Component {
  constructor(props) {
    super(props);
    const Collection = Meteor.collection('recipes');
    const recipe = Collection.find({_id: props.id});
    this.state = {loading: false, recipe: recipe[0]};
 }



renderIngredients(){
return  this.state.recipe.ingredients.map((ingredient, index) => (
<View    key={index}>
<Text style={styles.ingredient}>{index + 1} - {ingredient}</Text>
</View>
  ))
}

renderInstructions(){
return  this.state.recipe.instructions.map((instruction, index) => (
<View    key={index}>
<Text style={styles.ingredient}>{index + 1} - {instruction}</Text>
</View>
  ))
}
// <Text style={styles.spacer}> </Text>

renderRecipe(){
    return   (
      <View style={styles.container}>

      <Text style={styles.spacer}> </Text>
      <Text style={styles.recipeTitle}> {this.state.recipe.title}</Text>
      <Text style={styles.spacer}> </Text>
      <Image style={styles.image} source={{uri: this.state.recipe.image_src}}/>
      <Text style={styles.spacer}> </Text>
      <Text style={styles.recipeHeading}>Ingredients</Text>
      <Text style={styles.spacer}> </Text>
      {this.renderIngredients()}
      <Text style={styles.spacer}> </Text>
      <Text style={styles.recipeHeading}>Instructions</Text>
      <Text style={styles.spacer}> </Text>
      {this.renderInstructions()}
      <Text style={styles.spacer}> </Text>
      </View>
  );
}




renderLoading(){
  console.log(this.state);
  if(this.state.loading){
    return (<Loading/>)
  } else {
    return (
          <ScrollView contentContainerStyle={styles.contentContainer}>
           {this.renderRecipe()}
          </ScrollView>
    )
  }

}

  render() {
    let loading = this.state.loading;
    return (
      <ScrollView>
      {this.renderLoading()}

      </ScrollView>
    );
  }
}
