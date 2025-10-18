import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
import { ArrowLeft, ArrowRight, SlidersVertical } from 'lucide-react-native';
import FilterCard from '../components/atoms/FilterCard';
import { Categories } from '../constants/ConstantData';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { usePaginatedFetchQuery } from '../Hooks/UseFetchQuery';
import { setData } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigation';
import { TabBottomParamList } from '../navigation/TabBottomNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RBSheet from 'react-native-raw-bottom-sheet';

type TabProps = BottomTabNavigationProp<TabBottomParamList, 'Home'>;
type RootProps = NativeStackNavigationProp<RootStackParamList>;
type Props = CompositeNavigationProp<TabProps, RootProps>;

const HomeScreen = () => {
  const refRBSheet = React.useRef<typeof RBSheet>(null);
  const [selectedFilter, setSelectedFilter] = React.useState('Newest');
  const [selectedPrice, setSelectedPrice] = React.useState('$0 - $50');
  const [selectedSize, setSelectedSize] = React.useState('S');
  const naigation = useNavigation<Props>();
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = React.useState(1);
  const { products } = useSelector((state: RootState) => state.products);
  const { data, isLoading, error, isError } = usePaginatedFetchQuery(
    '/products',
    'products',
    page,
  );

  const handlePrevPage = async () => {
    if (page > 1 && page <= data?.pages) {
      setPage(page - 1);
    }
  };

  const handleNextPage = async () => {
    if (page < data?.pages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setData(data.data));
    }
    console.log(' data', data);
  }, [data, dispatch, page, products]);

  return (
    <View style={styles.container}>
      <Header title="Discover" isHome />
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <SearchBar />
        </View>
        <TouchableOpacity
          style={styles.BtnSmall}
          onPress={() => refRBSheet.current?.open()}
        >
          <SlidersVertical size={26} color={Colors.Primary100} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: Spacing.spacing_10 }}
        style={styles.categoriesContainer}
      >
        {Categories.map((item, index) => (
          <FilterCard
            key={index}
            onPress={() => {
              setSelectedCategory(item);
            }}
            selectedValue={selectedCategory}
            title={item}
          />
        ))}
      </ScrollView>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : isError ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <FlatList
          style={styles.productContainer}
          data={products}
          numColumns={2}
          contentContainerStyle={{ gap: Spacing.spacing_10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                naigation.navigate('DetailsScreen', { id: item.id });
              }}
            >
              <ProductCard item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      )}

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.ArrowBtn, page === 1 && styles.disabledBtn]}
          onPress={handlePrevPage}
          disabled={page === 1}
        >
          <ArrowLeft size={FontSizes.size_20} color={Colors.Primary100} />
        </TouchableOpacity>
        <Text style={styles.page}>{page}</Text>
        <TouchableOpacity
          style={[styles.ArrowBtn, page === data?.pages && styles.disabledBtn]}
          onPress={handleNextPage}
          disabled={page === data?.pages}
        >
          <ArrowRight size={FontSizes.size_20} color={Colors.Primary100} />
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnPressBack={true}
        closeOnPressMask={true}
        height={Dimensions.get('window').height / 1.7}
        customStyles={{
          container: {
            paddingVertical: Spacing.spacing_10,
            paddingHorizontal: Spacing.spacing_20,
            borderTopLeftRadius: Spacing.spacing_28,
            borderTopRightRadius: Spacing.spacing_28,
            backgroundColor: '#f0f0f0ff',
          },
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{ height: 3, width: 48, backgroundColor: Colors.Primary300 }}
          />

          <View style={styles.filterContainer}>
            <Text style={styles.filterText}>Filter</Text>
            <View style={styles.Divider} />

            <View style={styles.filterContainer}>
              <Text style={styles.filterTitle}>Sort By</Text>
              <ScrollView
                contentContainerStyle={{ gap: Spacing.spacing_10 }}
                horizontal
              >
                {[
                  'Newest',
                  'Oldest',
                  'Price: Low to High',
                  'Price: High to Low',
                ].map((item, index) => (
                  <FilterCard
                    key={index}
                    onPress={() => {
                      setSelectedFilter(item);
                    }}
                    selectedValue={selectedFilter}
                    title={item}
                  />
                ))}
              </ScrollView>
            </View>
            <View style={styles.Divider} />
            <View style={styles.filterContainer}>
              <Text style={styles.filterTitle}>Price</Text>
              <ScrollView
                contentContainerStyle={{ gap: Spacing.spacing_10 }}
                horizontal
              >
                {[
                  '$0 - $50',
                  '$500 - $1000',
                  '$1000 - $2000',
                  'More than $2000',
                ].map((item, index) => (
                  <FilterCard
                    key={index}
                    onPress={() => {
                      setSelectedPrice(item);
                    }}
                    selectedValue={selectedPrice}
                    title={item}
                  />
                ))}
              </ScrollView>
            </View>
            <View style={styles.Divider} />
            <View style={styles.filterContainer}>
              <Text style={styles.filterTitle}>Sizes</Text>
              <ScrollView
                contentContainerStyle={{ gap: Spacing.spacing_10 }}
                horizontal
              >
                {['S', 'M', 'L', 'XL'].map((item, index) => (
                  <FilterCard
                    key={index}
                    onPress={() => {
                      setSelectedSize(item);
                    }}
                    selectedValue={selectedSize}
                    title={item}
                  />
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity style={styles.applyBtnContainer}>
              <Text style={styles.applyBtn}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </RBSheet>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.spacing_10,
  },
  searchContainer: {
    marginBottom: Spacing.spacing_10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.spacing_8,
  },
  inputContainer: {
    width: '83%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  BtnSmall: {
    paddingHorizontal: Spacing.spacing_14,
    paddingVertical: Spacing.spacing_14,
    backgroundColor: Colors.Primary800,
    borderRadius: Spacing.spacing_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ArrowBtn: {
    paddingHorizontal: Spacing.spacing_6,
    paddingVertical: Spacing.spacing_6,
    backgroundColor: Colors.Primary800,
    borderRadius: Spacing.spacing_10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
  categoriesContainer: {
    height: 60,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.spacing_16,
  },
  page: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-SemiBold',
    color: Colors.Primary500,
  },
  productContainer: {
    marginBottom: Spacing.spacing_10,
    // marginTop: Spacing.spacing_10,
  },
  disabledBtn: {
    opacity: 0.5,
    backgroundColor: Colors.Primary500,
  },
  filterContainer: {
    marginBottom: Spacing.spacing_10,
    height: 80,
    width: '100%',
  },
  filterText: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: Spacing.spacing_10,
  },
  Divider: {
    height: 1,
    backgroundColor: Colors.Primary200,
    width: '90%',
    alignSelf: 'center',
    marginBottom: Spacing.spacing_20,
  },
  filterTitle: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: Spacing.spacing_10,
  },
  applyBtn: {
    width: '80%',
    textAlign: 'center',
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: Spacing.spacing_10,
    color: Colors.Primary100,
    backgroundColor: Colors.Primary900,
    padding: Spacing.spacing_10,
    borderRadius: 10,
  },
  applyBtnContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: Spacing.spacing_10,
  },
});
