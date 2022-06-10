import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const title = "EhopperReact_AD340"
const description = "This is my first React Native App."
const data = [
  {
    title: "Songs",
    data: ["Something Good: James Vickery", "Coming Alive: Two Another", "Problem With You: Sabrina Claudio",
        "Are You Even Real?: James Blake", "Work Song: Hozier", "Hot Thoughts: Spoon"]
  },
  {
    title: "Shows",
    data: ["Euphoria", "Ted Lasso", "Attack on Titan", "The Orville", "Brooklyn Nine-Nine", "Rick and Morty"]
  }
];

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#321859',
                },
                headerTintColor: '#dfd3f2',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }} >
          <Stack.Screen name='Home' component={HomeScreen} options={{title}} />
          <Stack.Screen name='People' component={PeopleScreen} />
          <Stack.Screen name='Person' component={PersonScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.sectionContainer}>
        <Text style={styles.paragraphText}> {description} </Text>
        <TouchableOpacity
            style={styles.peopleButton}
            onPress={() =>
                navigation.navigate('People')}>
                <Text style={styles.buttonText}>People</Text>
             </TouchableOpacity>
        <SectionList style={styles.listItems, styles.list}
                sections={data}
                keyExtractor={(item, index) => index}
                renderItem={({item}) => <Text style={styles.listItems}>{item}</Text>}
                renderSectionHeader={({section}) => <Text style={styles.categoriesTitle}>{section.title}</Text>} />
    </SafeAreaView>
  )
}

const PeopleScreen = ({navigation}) => {
    const [people, allThePeople] = useState([]);

      useEffect(() => {
        fetch('https://fakerapi.it/api/v1/users?_quantity=50')
          .then(response => response.json())
          .then(json => {
            allThePeople(json.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    return (
        <SafeAreaView style={styles.sectionContainer}>
                <FlatList style={styles.list}
                    data={people}
                    renderItem={({item}) => (
                        <Text style={styles.listItems} onPress={() => navigation.navigate('Person', {item})}>
                            {`${item.firstname} ${item.lastname}`}
                        </Text> )} />
            </SafeAreaView>
    )
}

const PersonScreen = ({navigation, route}) => {
    const {item} = route.params;

    return (
        <View>
        <Text style={styles.personDetails}>Full Name: {`${item.firstname} ${item.lastname}`}</Text>
        <Text style={styles.personDetails}>Username: {item.username}</Text>
        <Text style={styles.personDetails}>Email: {item.email}</Text>
        <Text style={styles.personDetails}>Website: {item.website}</Text>
        <Image
            style={styles.personImage}
            source={{
            uri: `${item.image}${item.id}`,
            }}
        />
        </View>
    );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight / 2,
    marginHorizontal: 5,
    backgroundColor: '#fae8f6',
  },
  buttonText: {
    fontSize: 18,
    color: '#fae8f6',

  },
  paragraphText: {
    marginTop: 7,
    marginBottom: 7,
    fontSize: 16,
    textAlign: "center",
    color: '#36082c',
  },
  peopleButton: {
    fontSize: 18,
    alignItems: "center",
    padding: 10,
    backgroundColor: '#6a4673',
    borderRadius: 25,
    marginLeft: 120,
    marginRight: 120,
    marginTop: 15,
    marginBottom: 15,
  },
  categoriesTitle: {
     fontSize: 22,
     fontWeight: "500",
     color: '#dfd3f2',
     paddingLeft: 35,
  },
  list: {
     color: '#dfd3f2',
     backgroundColor: '#321859',
     borderRadius: 10,
     padding: 7,
     marginBottom: 7,
  },
  listItems: {
    fontSize: 14,
    color: '#321859',
    backgroundColor: '#dfd3f2',
    borderRadius: 25,
    padding: 18,
    marginVertical: 8,
  },
  personDetails: {
    textAlign: "center",
    fontSize: 16,
    color: '#321859',
    backgroundColor: '#dfd3f2',
    padding: 12,
    margin: 4,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 5,
    borderColor: "#321859",
    borderRadius: 60,
  },
  personImage: {
    width: 400,
    height: 400,
    margin: 15,
    borderWidth: 15,
    borderColor: "#321859",
    borderRadius: 60,
  },
});

export default App;