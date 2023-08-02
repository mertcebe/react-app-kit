export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_VALUES":
            return {
                ...state,
                [action.key]: action.value
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