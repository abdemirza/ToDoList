import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const TodoItem = ({todo, onToggle, onDelete}) => {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={handleToggle}>
        <Text style={[styles.todoText, todo.completed && styles.completedTodo]}>
          {todo.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  todoText: {
    fontSize: 18,
    flex: 1,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
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
});

export default TodoItem;
