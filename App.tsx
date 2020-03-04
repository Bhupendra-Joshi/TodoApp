/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import TodoScreen from "./src/screens/TodoScreen"

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TodoScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;
