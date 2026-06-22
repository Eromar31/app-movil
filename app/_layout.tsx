import 'react-native-reanimated';
import "../global.css"
import { Stack } from 'expo-router';


export default function RootLayout() {


  return (
    <Stack>

      <Stack.Screen name="index" options= {{title:"Login"}}/>
      <Stack.Screen name="home" options= {{title:"Inicio"}}/>
      <Stack.Screen name="registro" options= {{title:"Registro"}}/>

    </Stack>
  );
}
