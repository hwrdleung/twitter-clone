export const action = (str) => dispatch => {
    dispatch({
        type: 'SIMPLE_ACTION',
        payload: str
    })
}
