import { Colors } from "@/constants/Colors";
import { vh, vw } from "@/constants/Functions";
import { StyleSheet, StatusBar, Platform, Dimensions } from "react-native";

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: Colors?.white,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headerMainView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: vh(50),
    },
    listingView: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: vw(10),
        backgroundColor: Colors?.white,
        width: '90%',
        alignSelf: 'center',
        marginTop: vh(20),
        paddingBottom: vh(10)
    },
    flatListStyling: {
        flexGrow: 1,
        width: '100%',
        paddingBottom: vh(20)
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: vw(20)
    },
    genreFlatlistStyle: {
        marginTop: vh(30),
    },
    imageBackground: {
        width: '100%',
        height: "100%",
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    noMoviesFoundText: {
        fontSize: vw(26),
        fontWeight: '500',
        color: Colors?.black
    },
    headerView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: vh(30)
    },
    genreView: {
        borderRadius: vw(5),
        paddingHorizontal: vw(10),
        paddingVertical: vh(3),
        flexDirection: 'row',
        alignItems: 'center'
    },
    genreText: {
        fontWeight: '500',
        fontSize: vw(12),
        marginLeft: vw(5)
    },
    moviesText: {
        fontSize: vw(25),
        fontWeight: '600',
        color: Colors?.white,
        width: '100%',
        textAlign: 'center'
    },
    textInputView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: vw(20),
        paddingVertical: vh(0),
        borderRadius: vw(10),
        backgroundColor: 'transparent',
        marginTop: vh(10)
    },
    textInput: {
        backgroundColor: Colors?.white,
        width: '100%',
        borderRadius: vw(5),
        paddingHorizontal: vw(10),
        color: Colors?.black,
        paddingVertical: vh(10),
        fontSize: vw(16),
        fontWeight: '500'
    },
    activityIndicator: {
        marginTop: vh(10)
    },
    moviesImage: {
        width: '100%',
        height: vh(150),
        borderTopLeftRadius: vw(10),
        borderTopRightRadius: vw(10),
        objectFit: 'cover'
    },
    movieName: {
        fontSize: vw(17),
        fontWeight: '600',
        color: Colors?.black,
        maxWidth: '80%'
    },
    movieNameHeartView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: vh(5)
    },
    yearText: {
        fontSize: vw(14),
        fontWeight: '500',
        color: 'black',
        maxWidth: '80%'
    },
    ratingView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    ratingText: {
        fontSize: vw(14),
        fontWeight: '500',
        color: Colors?.black,
        maxWidth: '70%',
        marginLeft: vw(5)
    },
    durationText: {
        fontSize: vw(12),
        fontWeight: '400',
        color: Colors?.black,
        maxWidth: '80%',
        marginBottom: vh(5)
    },
    favouritesText: {
        fontSize: vw(25),
        fontWeight: '600',
        color: Colors?.black,
        width: '100%',
        marginLeft: vw(10),
        textAlign: 'center'
    },
    clearAllFavouritesText: {
        fontWeight: '500',
        fontSize: vw(18),
        color: Colors?.black
    },
    search: {
        position: 'absolute',
        right: vw(20)
    },
    clearAllButtom: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: vh(10),
        position: 'absolute',
        bottom: vh(50),
        backgroundColor: Colors?.primary,
        alignSelf: 'center',
        paddingVertical: vh(5),
        paddingHorizontal: vw(20),
        borderRadius: vw(10)
    }
})

export default styles