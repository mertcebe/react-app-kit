export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_VALUES":
            return {
                ...state,
                [action.key]: action.value
            }
        case "SET_IMAGES":
            console.log(state.img)
            return {
                ...state,
                img: [
                    ...state.img,
                    action.payload
                ]
            }
        default:
            return state
    }
}

export const setValues = (dispatch, key, value) => {
    dispatch({
        type: "SET_VALUES",
        key: key,
        value: value
    })
}

export const setImages = (dispatch, img) => {
    dispatch({
        type: "SET_IMAGES",
        payload: img
    })
}