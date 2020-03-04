import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    GestureResponderEvent,
    TextInput,
} from 'react-native';
import { TodoItem } from '../dataTypes/TodoItem';

export interface Props {
    onAddTodoPress: (todoItem: TodoItem) => void;
}

export interface State {
    todoTask: string;
}

class TodoCreateComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            todoTask: '',
        };
    }

    onItemPress?= (event: GestureResponderEvent) => {
        const {
            onAddTodoPress,
        } = this.props;

        const {
            todoTask
        } = this.state;
        if (todoTask.length > 0) {
            const todoItem: TodoItem = {
                id: '' + (new Date().getTime()),
                task: todoTask,
                isDone: false
            }
            onAddTodoPress && onAddTodoPress(todoItem)
            this.setState({
                todoTask: ''
            })
        } else {
            alert('Please enter the task before adding');
        }
    }

    onChangeText = (text: string) => {
        this.setState({
            todoTask: text
        })
    }

    render() {
        const {
            todoTask,
        } = this.state;
        
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    value={todoTask}
                    onChangeText={this.onChangeText}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onItemPress}
                >
                    <Text style={styles.buttonLabel}>
                        Add Task
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
    },
    button: {
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#ff00ff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginStart: 10,
    },
    buttonLabel: {
        fontSize: 15,
        color: '#000',
        textAlign: 'center'
    },
})

export default TodoCreateComponent;