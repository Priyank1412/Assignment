import Types from "../../types/Types";

const initialState = {
    favourites: [],
    movies: []
}

export const HomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types?.FAVORITES:
            return {
                ...state,
                favourites: action.payload
            }
        case Types?.MOVIES:
            return {
                ...state,
                movies: action.payload
            }
        case Types?.EMPTYFAVORITES:
            return {
                ...state,
                favourites: []
            }
        default:
            return state;
    }
}
