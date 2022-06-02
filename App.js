import React from 'react';
import type {Node} from 'react';
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar } from 'react-native';

const title = "EhopperReact_AD340"
const description = "This is my first React Native App. Below is a list of songs and shows I've liked recently."
const data = [
  {
    title: "Songs",
    data: ["Something Good: James Vickery", "Coming Alive: Two Another", "Problem With You: Sabrina Claudio", "Are You Even Real?: James Blake"]
  },
  {
    title: "Shows",
    data: ["Euphoria", "Ted Lasso", "Attack on Titan", "The Orville", "Brooklyn Nine-Nine", "Rick and Morty"]
  }
];

const App = () => {
  return (
    <SafeAreaView style={styles.sectionContainer}>
    <Text style={styles.titleText}> {title} </Text>
     <Text style={styles.paragraphText}> {description} </Text>
    <SectionList style={styles.listItems, styles.list}
              sections={data}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => <Text style={styles.listItems}>{item}</Text>}
              renderSectionHeader={({section}) => <Text style={styles.categoriesTitle}>{section.title}</Text>}
            />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 5,
    backgroundColor: '#fae8f6',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "center",
    color: '#1c0417',
    borderRadius: 25,
    shadowColor: '#b32293',
    elevation: 22,
  },
  paragraphText: {
    marginTop: 7,
    marginBottom: 7,
    fontSize: 16,
    textAlign: "center",
    color: '#36082c',
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
});

export default App;