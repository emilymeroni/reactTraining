import * as actionTypes from '../actions';

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.STORE_COUNTER) {
        const newResults = [...state.results];
        newResults.push({
            id: new Date(),
            value: action.result
        });
        const testObject = {
            ...state,
            results: newResults
        }
        return testObject;
    }
    else if (action.type === actionTypes.REMOVE_COUNTER) {
        const id = 2;
        /*const newResults = [...state.results];
        newResults.splice(id, 1);*/
        const newResults = state.results.filter(el => {
            return el.id !== action.counterId;
        });
        return {
            ...state,
            results: newResults
        }
    }
    return state;
};

export default reducer;