import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Home from './components/Home';
import AddWord from './components/AddWord';
import Dictionary from './components/Dictionary';
import AddPhrase from './components/AddPhrase';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome to WortSchatz' }}
        />
        <Stack.Screen
          name="AddWord"
          component={AddWord}
          options={{ title: 'Add Word' }}
        />
        <Stack.Screen
          name="AddPhrase"
          component={AddPhrase}
          options={{ title: 'Add Phrase' }}
        />
        <Stack.Screen
          name="Dictionary"
          component={Dictionary}
          options={{ title: 'Word List' }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
