import { CHANGE_BACKGROUNDCOLOR, CHANGE_SHOWIMAGE, CHANGE_TEXTCOLOR, CHANGE_SHOWFACE, USE_DEFAULT } from "../actions/types";

const initialState = {
    colorful: '#FFECEC',
    colorText: 'black',
    showImage: true,
    showFace: true,
};


export const reducer = (state = initialState, action) => {
    switch(action.type) {
    case CHANGE_BACKGROUNDCOLOR:
        return {
            ...state,
            colorful: action.data,
        }
    case CHANGE_TEXTCOLOR:
        return {
            ...state,
            colorText: action.data,
        }
    case CHANGE_SHOWIMAGE:
        return {
            ...state,
            showImage: action.data,
        }
    case CHANGE_SHOWFACE:
         return {
             ...state,
            showFace: action.data,
         }
    case USE_DEFAULT:
        console.log("work");
        return {
            ...state,
            colorful: '#FFECEC',
            colorText: 'black',
        }
    default:
        return state;


    }
}