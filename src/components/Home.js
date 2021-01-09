import React, { useState } from 'react'
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, FlatList, CheckBox, Image, Keyboard } from 'react-native'
import Images from '../utils/Images'

Home = () => {

    const [todoList, setTodoList] = useState([])
    const [todo, setTodo] = useState('')
    const [isTodoActive, setIsTodoActive] = useState(true)


    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView />
            <Text style={{ backgroundColor: 'orange', textAlign: 'center', fontSize: 20, padding: 10 }}>My To Do List</Text>
            <Text style={{ margin: 10 }}>Enter your To Do </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={{ height: 40, borderColor: 'black', borderWidth: 1, marginLeft: 10, marginRight: 10, borderRadius: 10, flex: 1 }}
                    value={todo}
                    onChangeText={text => { setTodo(text) }}
                ></TextInput>
                <TouchableOpacity style={{ backgroundColor: 'black', padding: 10, marginRight: 10 }}
                    onPress={
                        () => {
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
                    }>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 15 }}>Submit</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                style={{ flex: 1, marginVertical: 20, paddingHorizontal: 10 }}
                data={todoList}
                extraData={todoList}
                keyExtractor={(item, index) => (index.toString())}
                renderItem={({ item, index }) => {
                    if (isTodoActive != item.status)
                        return (
                            <View style={{ flexDirection: 'row', width: '100%', backgroundColor: 'white', marginVertical: 3, padding: 10, alignItems: 'center' }}>
                                <Text style={{ flex: 1, fontSize: 15 }}>{item.name}</Text>
                                <TouchableOpacity style={{ padding: 5 }}
                                    onPress={() => {
                                        let arr = [...todoList]
                                        arr[index].status = !item.status
                                        setTodoList(arr)
                                    }}>
                                    <Image source={item.status ? Images.ic_checked : Images.ic_unchecked} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: 'green' }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 5 }}
                                    onPress={() => {
                                        let arr = [...todoList]
                                        arr.splice(index, 1);
                                        setTodoList(arr)
                                    }}>
                                    <Image source={Images.ic_delete} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: 'red' }} />
                                </TouchableOpacity>
                            </View>
                        )
                }}
            >
            </FlatList>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ flex: 1, }}>
                    <View style={{ backgroundColor: isTodoActive ? 'blue' : 'white', height: 2, width: '100%' }}></View>
                    <TouchableOpacity onPress={() => { setIsTodoActive(true) }} style={{ backgroundColor: 'orange', padding: 10 }}>
                        <Text style={{ color: 'black', textAlign: 'center', fontSize: 15 }}>To Do List</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, }}>
                    <View style={{ backgroundColor: isTodoActive ? 'white' : 'blue', height: 2, width: '100%' }}></View>
                    <TouchableOpacity onPress={() => { setIsTodoActive(false) }} style={{ backgroundColor: 'green', padding: 10 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 15 }}>Completed List</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Home;