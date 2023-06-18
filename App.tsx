import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/store';
import TodoListScreen from './src/components/TodoListScreen';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TodoListScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;
