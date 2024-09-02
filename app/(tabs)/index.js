import { Image, FlatList, View, Text, SafeAreaView, ImageBackground, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import styles from '../styles/styles';
import Strings from '@/constants/Strings';
import { convertMinutesToHours, genreColourReturner, genreIconReturner, genreTextColourReturner, vh, vw } from '@/constants/Functions';
import Images from '@/constants/Images';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import Types from '../redux/types/Types';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { favourites, movies } = useSelector((state) => state?.homeReducer);
  const [dataFromApi, setDataFromApi] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);
  const [isMoreData, setIsMoreData] = useState(true);

  async function apiCall() {
    try {
      setLoading(true)
      const result = await fetch(`https://ww4.yts.nz/api/v2/list_movies.json?page=${page}`);
      const convertedResult = await result?.json();
      if (dataFromApi >= convertedResult?.data?.movie_count) {
        setIsMoreData(false)
      }
      const updatedArray = convertedResult?.data?.movies?.map((item, index) => {
        return {
          ...item,
          isFavourite: false
        }
      })
      // setDataFromApi((prevData) => [
      //   ...prevData,
      //   ...updatedArray
      // ])
      if (movies.length == 0) {
        dispatch({
          type: Types?.MOVIES,
          payload: [...updatedArray]
        })
      }
      else {
        dispatch({
          type: Types?.MOVIES,
          payload: [...movies, ...updatedArray]
        })
      }
      setLoading(false);
    }
    catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isMoreData) {
      apiCall();
    }
    return () => { };
  }, [page])

  useEffect(() => {
    setDataFromApi(movies);
    return () => { }
  }, [movies]);

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

  const onPressFavourites = (item, index) => {
    const updatedMap = dataFromApi?.map((itemMap, indexMap) => {
      if (itemMap?.id == item?.id) {
        return {
          ...itemMap,
          isFavourite: !itemMap?.isFavourite,
        };
      } else {
        return itemMap;
      }
    });
    // setDataFromApi(updatedMap);
    dispatch({
      type: Types?.MOVIES,
      payload: updatedMap
    })
    if (item.isFavourite) {
      const updatedFavourites = favourites.filter((fav) => fav.id !== item.id);
      // Remove item from favourites
      dispatch({
        type: Types.FAVORITES,
        payload: updatedFavourites,
      });
    } else {
      // Add item to favourites
      const updatedItem = { ...item, isFavourite: !item.isFavourite };
      dispatch({
        type: Types.FAVORITES,
        payload: [...favourites, updatedItem],
      });
    }
    item.isFavourite = !(item.isFavourite)
  }

  const renderItemHomeMovies = ({ item, index }) => {
    const favouriteChecker = (item) => {
      const element = favourites?.find((itemFind) => itemFind?.id == item?.id)
      if (element) {
        return true
      }
      else if (item?.isFavourite) {
        return true
      }
      return false
    }

    return (
      <View style={styles?.listingView}>
        <Image source={{ uri: `https://ww4.yts.nz/${item?.medium_cover_image}` }} style={styles.moviesImage} />
        <View style={styles.detailsContainer}>
          <View style={styles.movieNameHeartView}>
            <Text style={styles.movieName} numberOfLines={2} ellipsizeMode='tail'>{item?.title}</Text>
            <TouchableOpacity activeOpacity={1} onPress={() => onPressFavourites(item, index)} hitSlop={5}>
              <AntDesign name={favouriteChecker(item) ? "heart" : "hearto"} size={24} color="black" />
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

  const onPressSearch = () => {
    setShowSearchBar(!showSearchBar)
  }

  const onChangeTextSearch = (value) => {
    setTextValue(value);
    const newArray = dataFromApi?.filter((item) => item?.title?.toLowerCase().includes(value?.toLowerCase()));
    setFilteredArray([...newArray])
  }

  const renderHeader = () => {
    return (
      <>
        <View style={styles.headerMainView}>
          <Text style={styles.moviesText}>{Strings.movies}</Text>
          <TouchableOpacity onPress={onPressSearch} activeOpacity={1} style={styles.search}>
            <FontAwesome name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {
          showSearchBar && <View style={styles.textInputView}>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeTextSearch}
              value={textValue}
              placeholder='Search Movies'
            />
          </View>
        }
      </>
    )
  }

  const onEndReachedMovies = () => {
    if (!loading && !showSearchBar) {
      setPage(prevPage => prevPage + 1)
    }
  }

  const renderFooterMovies = () => {
    return (
      loading ?
        <ActivityIndicator size='large' color={'white'} style={styles.activityIndicator} /> : null
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={Images?.backgroundImage} style={styles.imageBackground}>
        {renderHeader()}
        {
          filteredArray?.length == 0 && textValue !== '' ? <View style={styles.headerView}>
            <Entypo name="emoji-sad" size={90} color="black" />
            <Text style={styles.noMoviesFoundText}>{Strings?.noMoviesFound}</Text>
          </View>
            :
            <FlatList
              data={filteredArray?.length > 0 ? filteredArray : dataFromApi}
              renderItem={renderItemHomeMovies}
              contentContainerStyle={styles.flatListStyling}
              keyExtractor={(item, index) => String(index)}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.4}
              onEndReached={onEndReachedMovies}
              ListFooterComponent={renderFooterMovies}
            />
        }
      </ImageBackground>
    </SafeAreaView>
  );
}
