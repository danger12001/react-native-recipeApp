import React, { Component } from 'react';
import {  Text, View, FlatList, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import recipes from './actions/recipes.js';
import  Loading  from './ui/loading.js';

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
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, recipes: [], showRecipe: false};
 }

componentDidMount(){
  this.fetchRecipes();
}
goBack(){
  this.setState({showRecipe:false, recipe: undefined});
}

renderIngredients(){
  var ingredients = [];
  for(var i = 1; i < 21; i++){
    let ingredient = 'strIngredient' + i;
    let measure = 'strMeasure' + i;
    if(this.state.recipe[ingredient] !== '' || this.state.recipe[ingredient] !== null && this.state.recipe[measure] !== '' || this.state.recipe[measure] !== null ){
    ingredients.push({ingredient: this.state.recipe[ingredient], measure: this.state.recipe[measure]})
  }
  }
return  ingredients.map((ingredient, index) => (
<View    key={index}>
<Text style={styles.ingredientContainer}>{ingredient.ingredient} - {ingredient.measure}</Text>
</View>
  ))
}

renderRecipe(){
    return   (
      <View style={styles.container}>
      <Button onPress={() => this.goBack()} title='Back'/>
      <Text style={styles.recipeTitle}> {this.state.recipe.strMeal}</Text>
      <Image style={styles.image} source={{uri: this.state.recipe.strMealThumb}}/>
      <Text style={styles.spacer}> </Text>
      <Text style={styles.recipeTitle}> {this.state.recipe.strInstructions}</Text>
      <Text style={styles.spacer}> </Text>
      {this.renderIngredients()}
      </View>
  );
}

  goToRecipe(id){
this.setState({loading: true});
this.fetchRecipe(id);
  }



  fetchRecipe(id){
    let recipe;
return fetch('http://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
          .then((res) => res.json() )
          .then((data) => {
            this.setState({
              recipe: data.meals[0],
              loading: false,
              showRecipe: true
            })
            recipe = data.meals[0]
            return recipe;
          })
          .catch((error) => {
            this.setState({
              loading: false,
            })
            recipe = null;
            return recipe;
          })
  }

  fetchRecipes(){
    let recipes;
return fetch('http://www.themealdb.com/api/json/v1/1/search.php?s=vegan')
          .then((res) => res.json() )
          .then((data) => {
            this.setState({
              recipes: data.meals,
              loading: false
            })
            recipes = data.meals
            return recipes;
          })
          .catch((error) => {
            this.setState({
              recipes: [],
              loading: false
            })
            recipes = null;
            return recipes;
          })
  }
  renderRecipes(){
    if(this.fetchRecipes() !== null){
      return  this.state.recipes.map((recipe, index) => (
        <TouchableOpacity  key={index} onPress={() => this.goToRecipe(recipe.idMeal)} >
        <View  style={styles.container}>
        <Text style={styles.recipeTitle}> {recipe.strMeal}</Text>
        <Image style={styles.image} source={{uri: recipe.strMealThumb}}/>
        </View>
        </TouchableOpacity>
    ))
    } else {
      return (
        <Text>There are no vegan recipes :(</Text>
      );
    }
  }




renderLoading(){
  if(this.state.loading){
    return (<Loading/>)
  } else {
      if(!this.state.showRecipe){
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
      {this.renderRecipes()}
      </ScrollView>
    )
  } else {
    return(

    <ScrollView contentContainerStyle={styles.contentContainer}>
     {this.renderRecipe()}
    </ScrollView>
  )


  }

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
