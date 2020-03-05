import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    GestureResponderEvent,
} from 'react-native';
import { TodoItem } from '../dataTypes/TodoItem';

export interface Props {
    todoItem?: TodoItem;
    onItemPress: (todoItem: TodoItem) => void;
    removeTodoItem: (todoItem: TodoItem) => void;
}

class TodoItemComponent extends React.Component<Props> {

    onItemPress?= (event: GestureResponderEvent) => {
        const {
            todoItem,
            onItemPress,
        } = this.props;

        onItemPress && onItemPress(todoItem)
    }

    onRemovePress?= (event: GestureResponderEvent) => {
        const {
            todoItem,
            removeTodoItem,
        } = this.props;

        removeTodoItem && removeTodoItem(todoItem)
    }

    render() {
        const {
            todoItem,
        } = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.taskContainer}
                    onPress={this.onItemPress}
                >
                    <Text style={[styles.taskLabel, todoItem.isDone && styles.taskDone]}>
                        {todoItem.task}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={this.onRemovePress}
                >
                    <Text style={styles.taskLabel}>
                        X
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    taskContainer: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 1,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#00ffff44',
    },

    taskLabel: {
        fontSize: 15,
        color: '#000',
        textAlign: 'center'
    },

    taskDone: {
        textDecorationLine: 'line-through'
    },
    deleteButton: {
        backgroundColor: '#ff0000',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 40,
    }
})

export default TodoItemComponent;