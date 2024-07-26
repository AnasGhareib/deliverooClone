import { Button, FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import categories from '@/assets/data/filter.json';
import { Ionicons } from '@expo/vector-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

const BoxOfItems = () => (
  <>
    <View style={styles.boxOfItemsContainer}>
      <TouchableOpacity style={styles.item}>
        <Ionicons name='arrow-down-outline' size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Sort</Text>
        <Ionicons name='chevron-forward' size={23} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name='fast-food-outline' size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Hygiene rating</Text>
        <Ionicons name='chevron-forward' size={23} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name='pricetag-outline' size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Offers</Text>
        <Ionicons name='chevron-forward' size={23} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name='nutrition-outline' size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Dietary</Text>
        <Ionicons name='chevron-forward' size={23} color={Colors.primary} />
      </TouchableOpacity>
    </View>
    <Text style={styles.header}>Category</Text>
  </>
);

const Filter = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Category[]>(categories); // i'm gonna use our data and pass the items to the flatlist instead of passsing the plain json
  const [selected, setSelected] = useState<Category[]>([]);
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

  // when our state changes in this case we have items it will trigger 
  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;

    if (hasSelected !== newSelected) {
      // console.log("a change");
      flexWidth.value = withTiming(newSelected ? 150 : 0);
      scale.value = withTiming(newSelected ? 1 : 0);


    }
    setSelected(selectedItems);
  }, [items]);

  const wipeFilter = () => {
    const updateItems = items.map((item) => {
      item.checked = false;
      return item;
    });
    setItems(updateItems);
  };

  const animatedButton = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
      opacity: flexWidth.value > 0 ? 1 : 0,
    };
  });

  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.itemText}>{item.name} ({item.count})</Text>
      <View style={styles.checkboxContainer}>
        <BouncyCheckbox
          // disableBuiltInState
          fillColor={Colors.primary}
          iconStyle={{ borderColor: Colors.primary, borderRadius: 4, borderWidth: 2 }}
          innerIconStyle={{ borderColor: Colors.primary, borderRadius: 4 }}
          isChecked={items[index].checked}
          onPress={() => {
            const isChecked = items[index].checked;
            const updateItems = items.map((item) => {
              if (item.name === items[index].name) {
                item.checked = !isChecked;
              }
              return item;
            });
            // console.log(updateItems);
            setItems(updateItems);
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Button title="clear" onPress={wipeFilter} /> */}
      <FlatList data={items} renderItem={renderItem} ListHeaderComponent={<BoxOfItems />} />
      <View style={{ height: 90 }} />
      <View style={styles.footer}>

        <View style={styles.btnsContainer}>

          <Animated.View style={[styles.outlinedFooterButton, animatedButton]}>
            <TouchableOpacity onPress={wipeFilter}>
              <Animated.Text style={[animatedText, styles.outlinedFooterButtonText]}>Clear all</Animated.Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity style={styles.fullFooterButton} onPress={() => { navigation.goBack(); }}>
            <Text style={styles.fullFooterButtonText}>Done</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGrey,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -1,
    },
  },
  fullFooterButton: {
    flex: 1,
    height: 56,
    padding: 16,
    marginRight: 8,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  fullFooterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  boxOfItemsContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.grey,
  },
  itemText: {
    flexShrink: 1, // Adjust this if needed to fit the text properly
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    marginLeft: 10,
  },
  btnsContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  outlinedFooterButton: {
    borderBlockColor: Colors.primary,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 8,
    // marginLeft: 10,


  },
  outlinedFooterButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
