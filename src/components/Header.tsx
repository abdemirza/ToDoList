import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../constants/colors';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.08,
    width: '100%',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#F8F1FF',
  },
});
export default Header;
