import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Platform,
  TextInput,
  ScrollView
} from "react-native";
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";
import ToDo from "./ToDo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos: {}
  };

  componentDidMount = () => {
    this._loadToDos();
  };

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    console.log(toDos);

    if (!loadedToDos) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo} // 또는 const { newToDo } = this.state; 로 따로 선언해도 됨.
            onChangeText={this._constrolNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {/* <ToDo text={"Hello"} /> */}
            {Object.values(toDos).map(toDo => (
              <ToDo
                key={toDo.id}
                {...toDo}
                deleteToDo={this._deleteToDo}
                uncompleteToDo={this._uncompleteToDo}
                completeToDo={this._completeToDo}
                {...toDo}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  _constrolNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };

  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    });
  };

  _addToDo = () => {
    const { newToDo } = this.state;

    if (newToDo !== "") {
      this.setState({
        newToDo: ""
      });

      this.setState(prevState => {
        const ID = uuidv1();

        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createAt: Date.now()
          }
        };

        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        };

        return { ...newState };
      });
      // const toDos = {
      //   1: {
      //     id: 1,
      //     text: "배터리",
      //     isCompleted: false,
      //     date: 312415234
      //   },
      //   2: {
      //     id: 2,
      //     text: "배터리",
      //     isCompleted: false,
      //     date: 312415234
      //   },
      //   3: {
      //     id: 3,
      //     text: "배터리",
      //     isCompleted: false,
      //     date: 312415234
      //   }
      // };
    }
  };

  _deleteToDo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      return { ...newState };
    });
  };

  _uncompleteToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      };
      return { ...newState };
    });
  };

  _completeToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      };
      return { ...newState };
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f23657",
    alignItems: "center"
    // justifyContent: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "100",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 30
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});
