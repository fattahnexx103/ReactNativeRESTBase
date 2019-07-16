import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, ScrollView } from 'react-native';
import {Card, CardItem, Header} from 'native-base';

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      apiData: []
    };
  }

  //method to get the data from api
  getUserFromApi = () => {

  url ='https://randomuser.me/api/?results=50'; //url to fetch from
  return fetch(url)
    .then(response => response.json()) //we get response but we make sure its json
    .then(responseJson => { //take the made sure json
      this.setState({ //add it to the state
        isLoading: false, //since json is there do not load anymore
        apiData: this.state.apiData.concat(responseJson.results) // .results because the array is called results
      }); //we concated the json becasue there could be something in the state before that
    })
    .catch(error => console.log( "JSON FETCH ERROR --- " + error)); //catch the json fetching error
};

  componentDidMount(){
    this.getUserFromApi(); //call jsonfetching right after render method is called in App
  }

  //key extractor for FlatList
  _keyExtractor = (apiData, index) => apiData.email;

  render(){

    //to check whether we got json and fix view
    if(this.state.isLoading){
      return(
        <View style='styles.container'>
          <ActivityIndicator size='large' color='white'/>
        </View>
      )
    }

    return (
    <ScrollView>
    <FlatList
      style={{marginTop: 20, backgroundColor: '#30336B', marginEnd: 10}}
      data={this.state.apiData}
      keyExtractor={this._keyExtractor}
      renderItem={({ item }) => (
        <Card style={{backgroundColor: 'black'}}>
          <CardItem>
            <View style={styles.container}>
              <Image
                style={styles.profilepic}
                source={{
                  uri: item.picture.medium
                }}
              />
            </View>
            <View style={styles.userinfo}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                {item.name.first.toUpperCase()} {item.name.last.toUpperCase()}
              </Text>
              <Text style={{color: 'white'}}>Email: {item.email}</Text>
              <Text style={{color: 'white'}}>City: {item.location.city}</Text>
              <Text style={{color: 'white'}}>Phone: {item.phone}</Text>
            </View>
          </CardItem>
        </Card>
      )}
    />
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  profilepic: {
    flex: 2,
    padding: 10,
    height: 100,
    width: 100,
    marginEnd: 10
  },
  userinfo: {
    flex: 5,
    flexDirection: "column",
    backgroundColor: '#30336B',
    marginStart: 25,
    padding: 10
  },
  progress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
