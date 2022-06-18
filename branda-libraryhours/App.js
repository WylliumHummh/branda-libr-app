import React, {useState, useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, FlatList, Button, TouchableOpacity, Text, View } from "react-native";
import { Provider as PaperProvider} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons"; 
import About from "./components/About.js";

const Root = createNativeStackNavigator();

function Home() {
  const moment = require("moment");
  const [scheduleData, setScheduleData] = useState([]);
  const [displayList, setDisplayList] = useState(false);

  useEffect(() => {
    fetch("https://brandaserver.herokuapp.com/getinfo/libraryHours/week")
      .then((response) => response.json())
      .then(data => {
        setScheduleData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  /**
   * Displays the library's available hours for each section, stating it as Closed if no hours are available. 
   * Each "item" represents a day (Sunday to Saturday)
   */
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" color="blue" />
      <Button title = "Display Today's Schedule" mode="contained" color = "indigo" onPress={() => setDisplayList(!displayList)} >
        Hours for the Library Today
      </Button>
      <View>
        <FlatList
          data={scheduleData}
          renderItem={({item}) => {
            if (displayList) {
              return(
                <TouchableOpacity style={styles.task}>
                  <Text style={{fontWeight: "900"}}>{item.day}</Text>
                  <Text style={{color: "yellow", fontWeight: "bold"}}>{moment(item.date).format("MMMM Do, YYYY")} </Text>
                  <Text>{item.hours[0].location}: 
                    {item.hours[0].times.hours? " "+item.hours[0].times.hours[0].from+" to "+item.hours[0].times.hours[0].to : " Closed"} </Text>
                  <Text>{item.hours[1].location}: 
                    {item.hours[1].times.hours? " "+item.hours[1].times.hours[0].from+" to "+item.hours[1].times.hours[0].to : " Closed"} </Text>
                  <Text>{item.hours[2].location}: 
                    {item.hours[2].times.hours? " "+item.hours[2].times.hours[0].from+" to "+item.hours[2].times.hours[0].to : " Closed"} </Text>
                  <Text>{item.hours[3].location}: 
                    {item.hours[3].times.hours? " "+item.hours[3].times.hours[0].from+" to "+item.hours[3].times.hours[0].to : " Closed"} </Text>
                  <Text>{item.hours[4].location}: 
                    {item.hours[4].times.hours? " "+item.hours[4].times.hours[0].from+" to "+item.hours[4].times.hours[0].to : " Closed"} </Text>
                  <Text>{item.hours[5].location}: 
                    {item.hours[5].times.hours? " "+item.hours[5].times.hours[0].from+" to "+item.hours[5].times.hours[0].to : " Closed"} </Text>
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={(item, index) => index.toString()}
          extraData={scheduleData}
        />
      </View>
    </SafeAreaView>
  );
}

/**
 * Navigation Container for the App.
 * @returns The navigation for the app.
 */
function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Root.Navigator>
          <Root.Screen 
            name={"Home"} 
            component={Home}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("About")}>
                  <View style = {styles.container} >
                    <Text style = {{letterSpacing: 2, fontSize: 18}}>About </Text>
                    <AntDesign name="pluscircle" size={24} color="black" />
                  </View>
                </TouchableOpacity>
              )}
            )}/>
          <Root.Screen name={"About"} component={About}/>
        </Root.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    backgroundColor: "brown",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  task: {
    flex: 1,
    padding: 16,
    fontSize: 8,
    backgroundColor: "teal",
    marginVertical: 12,
    marginHorizontal: 12,
  }
});
