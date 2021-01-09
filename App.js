import React, { useState } from 'react'
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, LogBox, Image, Keyboard, StatusBar } from 'react-native'
import Images from './src/utils/Images'

App = () => {
  LogBox.ignoreAllLogs()
  const [todoList, setTodoList] = useState([])
  const [todo, setTodo] = useState('')
  const [isTodoActive, setIsTodoActive] = useState(true)

  const onPressAdd = () => {
    if (todo.trim() == '') {
      alert('Please enter your todo')
      return
    }
    let arr = [...todoList]
    arr.push({ name: todo, status: false })
    setTodoList(arr)
    setTodo('')
    setIsTodoActive(true)
    Keyboard.dismiss()
  }

  const renderItem = ({ item, index }) => {
    if (isTodoActive != item.status)
      return (
        <View style={styles.itemContainer}>
          <Text style={{ flex: 1, fontSize: 15 }}>{item.name}</Text>
          <TouchableOpacity style={{ padding: 5 }}
            onPress={() => {
              let arr = [...todoList]
              arr[index].status = !item.status
              setTodoList(arr)
            }}>
            <Image source={item.status ? Images.ic_checked : Images.ic_unchecked} style={[styles.imageBtn, { tintColor: 'green' }]} />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 5 }}
            onPress={() => {
              let arr = [...todoList]
              arr.splice(index, 1);
              setTodoList(arr)
            }}>
            <Image source={Images.ic_delete} style={styles.imageBtn} />
          </TouchableOpacity>
        </View>
      )
  }


  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={'orange'} />
      <SafeAreaView />
      <Text style={styles.header}>My To Do List</Text>
      <Text style={{ margin: 10 }}>Enter your To Do </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={styles.todoInput}
          value={todo}
          onChangeText={text => setTodo(text)}
        ></TextInput>
        <TouchableOpacity style={styles.btnAddTodo} onPress={onPressAdd}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.flatList}
        data={todoList}
        extraData={todoList}
        keyExtractor={(item, index) => (index.toString())}
        renderItem={renderItem} />

      <View style={styles.btnContainer}>
        <View style={{ flex: 1, }}>
          <View style={{ backgroundColor: isTodoActive ? 'blue' : 'white', height: 2, width: '100%' }}></View>
          <TouchableOpacity onPress={() => { setIsTodoActive(true) }} style={{ backgroundColor: 'orange', padding: 10 }}>
            <Text style={styles.btnSelection}>To Do List</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, }}>
          <View style={{ backgroundColor: isTodoActive ? 'white' : 'blue', height: 2, width: '100%' }}></View>
          <TouchableOpacity onPress={() => { setIsTodoActive(false) }} style={{ backgroundColor: 'green', padding: 10 }}>
            <Text style={[styles.btnSelection, { color: 'white' }]}>Completed List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'orange',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    padding: 10
  },
  todoInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10, flex: 1
  },
  btnAddTodo: {
    backgroundColor: 'black',
    padding: 10,
    marginRight: 10
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15
  },
  flatList: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 10
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  btnSelection: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 3,
    padding: 10,
    alignItems: 'center'
  },
  imageBtn: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: 'red'
  }
})


export default App;