import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text
} from 'react-native';

import TodoItemComponent from '../components/TodoItemComponent'
import { TodoItem } from '../dataTypes/TodoItem';
import TodoCreateComponent from '../components/TodoCreateComponent';

export interface Props {
}

export interface State {
    todoList: Array<TodoItem>
}

const data: Array<TodoItem> = [
]

class TodoScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            todoList: data,
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
            todoList
        } = this.state;
        todoItem.isDone = !todoItem.isDone;
        todoList.splice(todoList.indexOf(todoItem), 1, todoItem);
        this.setState({
            todoList: [...todoList]
        })
    }

    addTodoItem = (todoItem: TodoItem) => {
        const {
            todoList
        } = this.state;


        this.setState({
            todoList: [...todoList, todoItem]
        })
    }

    removeTodoItem = (todoItem: TodoItem) => {
        const {
            todoList
        } = this.state;
        todoList.splice(todoList.indexOf(todoItem), 1);
        this.setState({
            todoList: [...todoList]
        })
    }

    render() {
        const {
            todoList,
        } = this.state;

        return (
            <View style={styles.container}>
                {
                    (todoList && todoList.length > 0)
                        ? <FlatList
                            style={styles.container}
                            data={todoList}
                            renderItem={this.renderItem}
                        />
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