import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';


export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayoutNav() {
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="index" options={{
            header: () => <Header />
          }} />
          <Stack.Screen name="(modal)/filter" options={{
            headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                <Ionicons name='close-outline' size={30} color={Colors.primary} />
              </TouchableOpacity>
            ),
            presentation: 'modal',
            headerTitleAlign: 'center',
            headerTitle: 'Filter',
            animation: 'slide_from_bottom',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.lightGrey,
            }
          }} />
          <Stack.Screen name="(modal)/location-select" options={{
            headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                <Ionicons name='close-outline' size={30} color={Colors.primary} />
              </TouchableOpacity>
            ),
            presentation: 'fullScreenModal',
            headerTitleAlign: 'center',
            headerTitle: 'Select Location',
            animation: 'slide_from_bottom',
          }} />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}