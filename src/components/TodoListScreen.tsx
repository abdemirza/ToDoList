import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTodo} from '../reducers/todoReducer';
import TodoList from './TodoList';
import Header from './Header';

import ic_add from '@images/ic_plus.png';
import {Colors} from '../constants/colors';

const TodoListScreen = () => {
  const [todoText, setTodoText] = useState('');
  const addButtonScale = useRef(new Animated.Value(1)).current;
  const dispatch = useDispatch();

  // Handle adding a new todo item
  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch(
        addTodo({
          id: Date.now().toString(),
          text: todoText.trim(),
          completed: false,
        }),
      );
      setTodoText('');
    }
  };

  // Animate the scale of the add button
  const animateAddButton = () => {
    Animated.sequence([
      Animated.timing(addButtonScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(addButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TodoList />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : undefined}>
        <View style={styles.inputContainer}>
          {/* Text input for adding new todo */}
          <TextInput
            value={todoText}
            onChangeText={setTodoText}
            placeholder="Enter a new todo..."
            style={styles.input}
            placeholderTextColor={Colors.grey}
            autoCorrect={false}
          />
          {/* Animated add button */}
          <Animated.View style={{transform: [{scale: addButtonScale}]}}>
            <TouchableOpacity
              onPress={handleAddTodo}
              activeOpacity={0.6}
              onPressIn={animateAddButton}>
              <Image style={styles.addIcon} source={ic_add} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
    backgroundColor: Colors.grey,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 4,
    fontSize: 16,
    marginHorizontal: 10,
    color: Colors.input,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginLeft: 8,
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addIcon: {
    width: 25,
    height: 25,
  },
});

export default TodoListScreen;
