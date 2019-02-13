import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, Platform, TextInput, ScrollView } from 'react-native';
import ToDo from './ToDo';

const { height, width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newToDo: '',
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
            value={this.newToDo} // 또는 const { newToDo } = this.state; 로 따로 선언해도 됨.
            onChangeText={this._constrolNewToDo}
            placeholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={false}
            />
            <ScrollView contentContainerStyle={styles.toDos}> 
              <ToDo />
            </ScrollView>
        </View>
      </View>
    );
  }

  _constrolNewToDo = text => {
    this.setState({
      newToDo: text
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
  toDos: {
    alignItems: 'center',
  }
});
