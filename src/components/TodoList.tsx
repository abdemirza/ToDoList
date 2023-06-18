import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';

import {TodoState} from '../reducers/todoReducer';
import {toggleTodo, deleteTodo} from '../reducers/todoReducer';

import {Colors} from '@constants/colors';
import ic_delete from '@images/ic_delete.png';

const TodoList = () => {
  const todos = useSelector((state: TodoState) => state.todos);
  const dispatch = useDispatch();
  const deleteButtonOpacity = useRef(new Animated.Value(0)).current;

  // Handle toggling a todo item's completion status
  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };

  // Handle deleting a todo item
  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  const animateDeleteButton = () => {
    Animated.timing(deleteButtonOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const renderTodoItem = ({item}) => (
    <View style={styles.todoItem}>
      <View style={styles.row}>
        <CheckBox
          boxType="square"
          style={styles.checkbox}
          value={item.completed}
          onValueChange={() => handleToggleTodo(item.id)}
        />
        <TouchableOpacity onPress={() => handleToggleTodo(item.id)}>
          <Text
            style={[styles.todoText, item.completed && styles.completedTodo]}>
            {item.text}
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.View>
        <TouchableOpacity
          onPressIn={animateDeleteButton}
          onPress={() => handleDeleteTodo(item.id)}>
          <Image source={ic_delete} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );

  return (
    <FlatList
      data={todos}
      renderItem={renderTodoItem}
      keyExtractor={item => item.id}
      style={styles.todoList}
    />
  );
};

const styles = StyleSheet.create({
  todoText: {
    fontSize: 18,
    width: Dimensions.get('window').width * 0.68,
    color: Colors.primary,
  },
  todoList: {
    flex: 1,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
    color: '#FF715B',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default TodoList;
