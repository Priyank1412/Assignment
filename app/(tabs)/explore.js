import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, SafeAreaView, ImageBackground, TextInput, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Images from '@/constants/Images';
import styles from '../styles/styles';
import { useEffect, useState } from 'react';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import Types from '../redux/types/Types';
import Strings from '@/constants/Strings';
import { convertMinutesToHours, genreColourReturner, genreIconReturner, genreTextColourReturner, vh, vw } from '@/constants/Functions';

export default function TabTwoScreen() {
  const { favourites, movies } = useSelector((state) => state?.homeReducer);
  const dispatch = useDispatch();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    setData(favourites);
    return () => { };
  }, [favourites])

  const onPressSearch = () => {
    setShowSearchBar(!showSearchBar)
  }

  const onChangeTextSearch = (value) => {
    setTextValue(value);
    const newArray = data?.filter((item) => item?.title?.toLowerCase().includes(value?.toLowerCase()));
    setFilteredArray([...newArray])
  }

  const onPressFavourites = (item, index) => {
    const filteredArray = data?.filter((itemMap, indexMap) => item?.id != itemMap?.id);
    const newArray = movies?.map((itemMap, indexMap) => {
      if (itemMap?.id == item?.id) {
        return {
          ...itemMap,
          isFavourite: !(itemMap?.isFavourite)
        }
      }
      else {
        return itemMap
      }
    })
    // if (item?.isFavourite) {
    dispatch({
      type: Types?.MOVIES,
      payload: newArray
    })
    dispatch({
      type: Types?.FAVORITES,
      payload: [...filteredArray]
    })
    item.isFavourite = !(item.isFavourite)
    // }
    // else {
    //   const updatedItem = { ...item, isFavourite: !item.isFavourite };
    //   dispatch({
    //     type: Types.FAVORITES,
    //     payload: [...favourites, updatedItem],
    //   });
    //   item.isFavourite = !(item.isFavourite)
    // }
  }

  const GenreView = (item, index, type) => {
    return (
      <View style={[{ backgroundColor: genreColourReturner(type), marginLeft: (index % 3 != 0) ? vw(10) : null }, styles?.genreView]}>
        {
          genreIconReturner(type)
        }
        <Text style={[{ color: genreTextColourReturner(type) }, styles?.genreText]}>{item}</Text>
      </View>
    )
  }

  const genreReturner = (item, index) => {
    switch (item) {
      case "Comedy":
        return GenreView(item, index, "Comedy");
      case "Fantasy":
        return GenreView(item, index, "Fantasy");
      case "Horror":
        return GenreView(item, index, "Horror");
      case "Romance":
        return GenreView(item, index, "Romance");
      case "Documentary":
        return GenreView(item, index, "Documentary");
      case "Action":
        return GenreView(item, index, "Action");
      case "Adventure":
        return GenreView(item, index, "Adventure");
      case "Family":
        return GenreView(item, index, "Family");
      case "Drama":
        return GenreView(item, index, "Drama");
      case "Music":
        return GenreView(item, index, "Music");
      case "Crime":
        return GenreView(item, index, "Crime");
      case "Thriller":
        return GenreView(item, index, "Thriller");
      case "Sci-Fi":
        return GenreView(item, index, "Sci-Fi");
      case "Mystery":
        return GenreView(item, index, "Mystery");
      case "Musical":
        return GenreView(item, index, "Musical");
      case "Animation":
        return GenreView(item, index, "Animation");
      case "Biography":
        return GenreView(item, index, "Biography");
      case "History":
        return GenreView(item, index, "History");
      case "War":
        return GenreView(item, index, "War");
      case "Talk-Show":
        return GenreView(item, index, "Talk-Show");
      case "Sport":
        return GenreView(item, index, "Sport");
      default:
        return (
          <View style={{ marginLeft: (index % 3 != 0) ? vw(10) : null, borderRadius: vw(10) }}>
            <Text style={[{ color: 'black' }, styles?.genreText]}>{item}</Text>
          </View>
        )
    }
  }

  const renderItemGenre = ({ item, index }) => {
    return genreReturner(item, index)
  }

  const renderItemHomeMovies = ({ item, index }) => {
    return (
      <View style={styles?.listingView}>
        <Image source={{ uri: `https://ww4.yts.nz/${item?.medium_cover_image}` }} style={styles.moviesImage} />
        <View style={styles.detailsContainer}>
          <View style={styles.movieNameHeartView}>
            <Text style={styles.movieName} numberOfLines={2} ellipsizeMode='tail'>{item?.title}</Text>
            <TouchableOpacity activeOpacity={1} onPress={() => onPressFavourites(item, index)} hitSlop={5}>
              <AntDesign name={item?.isFavourite ? "heart" : "hearto"} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={[styles.movieNameHeartView, { marginTop: vh(0) }]}>
            <Text style={styles.yearText}>{item?.year}</Text>
            <View style={styles.ratingView}>
              <Ionicons name="star" size={20} color="gold" />
              <Text style={styles.ratingText}>{item?.rating}</Text>
            </View>
          </View>
          <Text style={styles.durationText}>{convertMinutesToHours(item?.runtime)}</Text>
          <FlatList
            data={item?.genres}
            renderItem={renderItemGenre}
            contentContainerStyle={styles.genreFlatlistStyle}
            numColumns={3}
            ItemSeparatorComponent={() => <View style={{ height: vh(5) }} />}
          />
        </View>
      </View>
    )
  }

  const onPressClearAll = () => {
    dispatch({
      type: Types?.EMPTYFAVORITES
    });
    const updatedArray = movies?.map((itemMap, indexMap) => {
      if (itemMap?.isFavourite) {
        return {
          ...itemMap,
          isFavourite: false
        }
      }
      else {
        return itemMap
      }
    });
    dispatch({
      type: Types?.MOVIES,
      payload: updatedArray
    })
  }

  const renderHeader = () => {
    return (
      <>
        <View style={styles.headerMainView}>
          <Text style={styles.favouritesText}>{Strings.favourites}</Text>
          <TouchableOpacity onPress={onPressSearch} activeOpacity={1} style={styles.search}>
            <FontAwesome name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {
          showSearchBar && <View style={styles.textInputView}>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeTextSearch}
              value={textValue}
              placeholder='Search Favourites'
            />
          </View>
        }
      </>
    )
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={Images?.bossBabyBackgroundImage} style={styles.imageBackground}>
        {renderHeader()}
        {
          favourites?.length < 1 ?
            <View style={[styles.headerView]}>
              <Entypo name="emoji-happy" size={70} color="black" />
              <Text style={styles.noMoviesFoundText}>{Strings?.noFavourites}</Text>
            </View>
            :
            <>
              {
                filteredArray?.length == 0 && textValue !== '' ? <View style={styles.headerView}>
                  <Entypo name="emoji-sad" size={90} color="black" />
                  <Text style={styles.noMoviesFoundText}>{Strings?.noMoviesFound}</Text>
                </View>
                  :
                  <FlatList
                    data={filteredArray?.length > 0 ? filteredArray : data}
                    renderItem={renderItemHomeMovies}
                    contentContainerStyle={[styles.flatListStyling, { paddingBottom: vh(100) }]}
                    keyExtractor={(item, index) => String(index)}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.4}
                  />
              }
            </>
        }
        {
          favourites?.length > 0 &&
          <TouchableOpacity style={styles.clearAllButtom} activeOpacity={0.8} onPress={onPressClearAll}>
            <Text style={styles.clearAllFavouritesText}>{Strings?.clearAllFavourites}</Text>
          </TouchableOpacity>
        }
      </ImageBackground>
    </SafeAreaView>
  );
}
