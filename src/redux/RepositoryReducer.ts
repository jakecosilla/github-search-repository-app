import { RepositoryActionTypes } from './RepositoryActionTypes';
import { RepositoryState } from './RepositoryState';

const initialState: RepositoryState = {
    query: '',
    results: null,
    loading: false,
    error: null,
    page: 1,
    perPage: 10,
    totalPages: 0,
};

const repositoryReducer = (state = initialState, action: RepositoryActionTypes): RepositoryState => {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, query: action.payload.query, page: action.payload.page, perPage: action.payload.perPage, loading: true, error: null };
        case 'FETCH_DATA_SUCCESS':
            return { ...state, results: action.payload, loading: false };
        case 'CHANGE_PAGE':
            return { ...state, page: action.payload };
        case 'CHANGE_PER_PAGE':
            return { ...state, perPage: action.payload };
            case 'SET_TOTAL_PAGE':
                return { ...state, loading: false, totalPages: action.payload };
        case 'FETCH_DATA_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
    console.log(state);
};

export default repositoryReducer;
