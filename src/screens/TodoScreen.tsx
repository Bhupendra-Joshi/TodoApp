import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import TodoItemComponent from '../components/TodoItemComponent'
import { TodoItem } from '../dataTypes/TodoItem';
import TodoCreateComponent from '../components/TodoCreateComponent';

export interface Props {
}

export interface State {
    todoList: Array<TodoItem>
    doneCount: number;
}

class TodoScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            todoList: [],
            doneCount: 0,
        };
    }
    renderItem = ({ item }) => {
        return (
            <TodoItemComponent
                todoItem={item}
                onItemPress={this.onItemPress}
                removeTodoItem={this.removeTodoItem}
            />
        )
    }

    onItemPress = (todoItem: TodoItem) => {
        const {
            todoList,
            doneCount
        } = this.state;
        todoItem.isDone = !todoItem.isDone;
        todoList.splice(todoList.indexOf(todoItem), 1, todoItem);
        this.saveTodoList(todoList);
        this.setState({
            todoList: [...todoList],
            doneCount: todoItem.isDone ? doneCount + 1 : doneCount - 1
        })
    }

    addTodoItem = (todoItem: TodoItem) => {
        let {
            todoList
        } = this.state;
        todoList = [...todoList, todoItem];
        this.saveTodoList(todoList);
        this.setState({
            todoList
        });
    }

    removeTodoItem = (todoItem: TodoItem) => {
        const {
            todoList,
            doneCount
        } = this.state;
        todoList.splice(todoList.indexOf(todoItem), 1);
        this.saveTodoList(todoList);

        this.setState({
            todoList: [...todoList],
            doneCount: todoItem.isDone ? doneCount - 1 : doneCount
        })
    }

    saveTodoList = (todoList: Array<TodoItem>) => {
        AsyncStorage.setItem('@todoList', JSON.stringify(todoList));
    }

    getTodoList = async () => {
        const todoListString = await AsyncStorage.getItem('@todoList');
        const todoList = JSON.parse(todoListString) || []
        const doneCount = todoList.reduce((count: number, item: TodoItem) => {
            return item.isDone ? count + 1 : count;
        }, 0);
        this.setState({
            todoList,
            doneCount,
        })
    }

    componentDidMount() {
        this.getTodoList();
    }
    render() {
        const {
            todoList = [],
            doneCount
        } = this.state;
        const remaining = todoList.length - doneCount;
        return (
            <View style={styles.container}>
                {
                    (todoList && todoList.length > 0)
                        ? <View style={styles.container}>
                            <Text style={styles.taskCompleted}>
                                Total todos remaining: {remaining} out of {todoList.length}.
                            </Text>
                            <FlatList
                                style={styles.container}
                                data={todoList}
                                renderItem={this.renderItem}
                            />
                        </View>
                        : <View style={styles.noDataContainer}>
                            <Text style={styles.noDataTitle}>Nothing TODO!!</Text>
                            <Text style={styles.noDataMessage}>Add new tasks!!</Text>
                        </View>}
                <TodoCreateComponent
                    onAddTodoPress={this.addTodoItem} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    taskCompleted: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: 'center'
    },
    noDataContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    noDataTitle: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    noDataMessage: {
        fontSize: 20,
        fontWeight: 'normal',
        marginTop: 20,
    }
})

export default TodoScreen;