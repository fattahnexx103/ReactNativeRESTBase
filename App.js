import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {Card, CardItem, Header} from 'native-base';

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      apiData: []
    };
  }

  getUserFromAPI = () =>{

    //api Link URL
    let url = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole';

    return(
      //method fetch used to get apiData
      fetch(url)
        .then((result) =>{ //we get the result
          result.json() //we make sure result is converted to json
        }).
        then((jsonResult) =>{ //jsonResult is the json now
          //change state to put new json in there
          this.setState({
            isLoading: false, //since we got the result
            apiData: this.state.apiData.concat(jsonResult)  //we do this in case there was data before in the state
          })
        })
        .catch((error) =>{
          console.log('FETCHING JSON ERROR ....' + error);
        })
    )
  }

  componentDidMount(){
    this.getUserFromAPI();
  }

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
      <View style={styles.container}>
        <Text style={{color: 'white'}}>This is REST App</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
