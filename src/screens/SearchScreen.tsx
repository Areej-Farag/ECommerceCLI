import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { FontSizes, Spacing, Colors } from '../constants/Colors';
import SearchLongCard from '../components/SearchLongCard';
import RecentSearchItem from '../components/RecentSearchItem';
import NotFoundCompnent from '../components/NotFoundCompnent';
import Search from '../assets/Images/Search-duotone.png';
import { useFetchQuery } from '../Hooks/UseFetchQuery';
import { Product } from '../models/Models';
import useDebounce from '../Hooks/useDebounce';

const SearchScreen = () => {
  const {
    data = [],
    isLoading,
    error,
    isError,
  } = useFetchQuery('/products', 'products');

  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [text, setText] = useState('');
  const debouncedQuery = useDebounce({ value: text, delay: 500 });
  const [isFiltering, setIsFiltering] = useState(false);

  const filterData = useCallback(
    (value: string) => {
      const newData = data.filter((item: Product) => {
        const itemData = item.name ? item.name.toUpperCase() : '';
        const textData = value.toUpperCase();
        return itemData.includes(textData);
      });
      setFilteredData(newData);
    },
    [data],
  );

  useEffect(() => {
    if (!debouncedQuery) {
      setFilteredData([]);
      setIsFiltering(false);
      return;
    }

    setIsFiltering(true);
    const timer = setTimeout(() => {
      filterData(debouncedQuery);
      setIsFiltering(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedQuery, filterData]);

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.BtnPrimary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar text={text} setText={setText} />

      {!text ? (
        <>
          <Text style={styles.Title}>Recent Searches</Text>
          <RecentSearchItem />
          <RecentSearchItem />
          <RecentSearchItem />
        </>
      ) : isFiltering ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.BtnPrimary} />
          <Text style={{ marginTop: 10 }}>Searching...</Text>
        </View>
      ) : filteredData.length === 0 ? (
        <NotFoundCompnent
          title="No Results Found!"
          description="Try a similar word or something more general."
          image={Search}
        />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <SearchLongCard
              name={item.name}
              Price={item.price}
              image={item.image}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.spacing_20,
  },
  Title: {
    fontSize: FontSizes.size_20,
    fontFamily: 'OpenSans-Bold',
    marginVertical: Spacing.spacing_10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
