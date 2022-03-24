import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Alert,
  Image,
  StatusBar,
} from "react-native";

export default function App() {
  const [recipies, setRecipies] = useState([]);
  const [ingredients, setIngredients] = useState("");

  const getRecipies = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
      .then((response) => response.json())
      .then((data) => setRecipies(data.meals))
      .catch((err) => {
        Alert.alert("Oops..", err);
      });
  };

  const listSeperator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        style={{ margin: 10 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontSize: 20 }}>{item.strMeal}</Text>
            <Image
              style={{ width: 66, height: 58 }}
              source={{ uri: item.strMealThumb }}
            />
          </View>
        )}
        data={recipies}
        ItemSeparatorComponent={listSeperator}
      />
      <TextInput
        style={{ fontSize: 18, width: 200, marginTop: 0, marginBottom: 20 }}
        placeholder="Search ingredient"
        onChangeText={(ingredients) => setIngredients(ingredients)}
      />
      <Button title=" Search " onPress={getRecipies} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
