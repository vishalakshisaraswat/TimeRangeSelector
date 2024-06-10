import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import TimeRangeSelector from '../src/TimeRangeSelector'; 

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TimeRangeSelector />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightyellow',
  },
});

export default App;
