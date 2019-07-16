import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image } from 'react-native';
import {Card, CardItem, Header} from 'native-base';

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      apiData: []
    };
  }

  getUserFromApi = () => {

  url ='https://randomuser.me/api/?results=50';
  return fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        isLoading: false,
        apiData: this.state.apiData.concat(responseJson.results)
      });
    })
    .catch(error => console.log(error));
};

  componentDidMount(){
    this.getUserFromApi();
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
    <FlatList
      data={this.state.apiData}
      keyExtractor={this._keyExtractor}
      renderItem={({ item }) => (
        <Card>
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
              <Text>
                Name: {item.name.title} {item.name.first} {item.name.last}
              </Text>
              <Text>Email: {item.email}</Text>
              <Text>City: {item.location.city}</Text>
              <Text>Phone: {item.phone}</Text>
            </View>
          </CardItem>
        </Card>
      )}
    />
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  profilepic: {
    flex: 2,
    height: 100,
    width: 100,
    marginEnd: 10
  },
  userinfo: {
    flex: 5,
    flexDirection: "column",
    marginStart: 25
  },
  progress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
