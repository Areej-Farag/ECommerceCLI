import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SearchBar from '../components/SearchBar';
import { FontSizes, Spacing } from '../constants/Colors';
import SearchLongCard from '../components/SearchLongCard';
import RecentSearchItem from '../components/RecentSearchItem';
import NotFoundCompnent from '../components/NotFoundCompnent';
import Search from '../assets/Images/Search-duotone.png';
const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <SearchBar />
      {/* <View>
        <Text style={styles.Title}>Search Results</Text>
      </View> */}
      {/* <SearchLongCard />
      <SearchLongCard />
      <SearchLongCard /> */}
      {/* <RecentSearchItem />
      <RecentSearchItem />
      <RecentSearchItem />
      <RecentSearchItem /> */}

      <NotFoundCompnent
        title="No Results Found!"
        description="Try a similar word or something more general."
        image={Search}
      />
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
});
