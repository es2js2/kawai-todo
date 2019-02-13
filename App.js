import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, Platform, TextInput } from 'react-native';

const { height, width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    NewToDo: '',
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={'New To Do'} 
            value={newTodo} 
            onChangeText={this._constrolNewToDo}
            placeholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={flase}
            />
        </View>
      </View>
    );
  };
  _constrolNewToDo = text => {
    this.setState({
      newTodo: text
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
    // justifyContent: 'center',    
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight: '100',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,    
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {        
        elevation: 30,
      },
    })    
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25,
  },  
});
