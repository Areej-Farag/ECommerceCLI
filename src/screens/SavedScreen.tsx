import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Heart from '../assets/Images/Heart-duotone.png';
import NotFoundCompnent from '../components/NotFoundCompnent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import ProductCard from '../components/ProductCard';
import SavedCard from '../components/SavedCard';

const SavedScreen = () => {
 
  const { favorites } = useSelector((state: RootState) => state.products);
  return (
    <View style={styles.container}>
      <Header title="Saved" />
      {favorites.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={favorites}
          renderItem={({ item }) => <SavedCard item={item} />}
        />
      ) : (
        <>
          <NotFoundCompnent
            title="No Saved Items!"
            description="You don’t have any saved items. Go to home and add some."
            image={Heart}
          />
        </>
      )}
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
