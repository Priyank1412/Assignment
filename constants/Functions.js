import { Dimensions, PixelRatio } from 'react-native';
import { Colors } from './Colors';
import { Entypo, FontAwesome, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export const DesignHeight = 812;
export const DesignWidth = 375;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
// It is based on the screen width of your design layouts e.g Height 600 x Width 375
const scale = SCREEN_WIDTH / 375;

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export function normalize(size) {
    return PixelRatio.roundToNearestPixel(size * scale);
}

export const vw = (width) => {
    // Parse string percentage input and convert it to number.
    let percent = (width / DesignWidth) * 100;
    const elemWidth = parseFloat(percent + '%');
    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const vh = (height) => {
    // Parse string percentage input and convert it to number.
    let percent = (height / DesignHeight) * 100;
    const elemHeight = parseFloat(percent + '%');

    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export const genreColourReturner = (type) => {
    switch (type) {
        case "Comedy":
            return Colors?.blue0dd
        case "Crime":
            return Colors?.redo6;
        case "Drama":
            return Colors?.creamo5;
        case "Fantasy":
            return Colors?.aquaLight;
        case "Horror":
            return Colors?.black;
        case "Romance":
            return Colors?.pink;
        case "Documentary":
            return Colors?.greenfbd;
        case "Action":
            return Colors?.purpleo5;
        case "Adventure":
            return Colors?.blue;
        case "Family":
            return Colors?.tangerine;
        case "Music":
            return Colors?.darkyellow;
        case "Thriller":
            return Colors?.grey;
        case "Sci-Fi":
            return Colors?.darkBlueo5;
        case "Mystery":
            return Colors?.blueShadeo5;
        case "Musical":
            return Colors?.woodeno5;
        case "Animation":
            return Colors?.lightPurple224o5;
        case "Biography":
            return Colors?.lightGreeno8;
        case "History":
            return Colors?.blue208o5;
        case "War":
            return Colors?.grey165o5;
        case "Talk-Show":
            return Colors?.blue255o5;
        case "Sport":
            return Colors?.orange116o5;
        default: Colors?.white
    }
}

export const genreIconReturner = (type) => {
    switch (type) {
        case "Comedy":
            return <MaterialIcons name="theater-comedy" size={24} color="black" />
        case "Crime":
            return <FontAwesome6 name="gun" size={24} color="black" />
        case "Drama":
            return <FontAwesome5 name="pied-piper-hat" size={24} color="black" />
        case "Fantasy":
            return <SimpleLineIcons name="magic-wand" size={24} color="black" />
        case "Horror":
            return <Ionicons name="skull" size={24} color="white" />
        case "Romance":
            return <FontAwesome name="heartbeat" size={24} color="black" />
        case "Documentary":
            return <Entypo name="open-book" size={24} color="black" />
        case "Action":
            return <FontAwesome5 name="dragon" size={24} color="black" />
        case "Adventure":
            return <Entypo name="trophy" size={24} color="white" />
        case "Family":
            return <MaterialIcons name="family-restroom" size={24} color="white" />
        case "Music":
            return <FontAwesome name="music" size={24} color="black" />
        case "Thriller":
            return <MaterialCommunityIcons name="knife-military" size={24} color="black" />
        case "Sci-Fi":
            return <FontAwesome5 name="flask" size={24} color="black" />
        case "Mystery":
            return <Entypo name="magnifying-glass" size={24} color="black" />
        case "Musical":
            return <FontAwesome5 name="music" size={24} color="black" />
        case "Animation":
            return <MaterialCommunityIcons name="animation-play-outline" size={24} color="black" />
        case "Biography":
            return <MaterialIcons name="biotech" size={24} color="black" />
        case "History":
            return <FontAwesome name="history" size={24} color="black" />
        case "War":
            return <MaterialIcons name="hardware" size={24} color="black" />
        case "Talk-Show":
            return <FontAwesome6 name="walkie-talkie" size={24} color="black" />
        case "Sport":
            return <MaterialIcons name="sports-basketball" size={24} color="black" />
        default: null
    }
}

export const convertMinutesToHours = (minutes) => {
    function returningCases(hours, minutes) {
        if (minutes == 0) {
            return `${hours}hr`
        }
        if (hours == 0) {
            return `${minutes}m`
        }
        return `${hours}hr ${minutes}m`
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return returningCases(hours, remainingMinutes);
}

export const genreTextColourReturner = (type) => {
    switch (type) {
        case "Horror":
            return Colors?.white;
        default: return Colors?.black
    }
}