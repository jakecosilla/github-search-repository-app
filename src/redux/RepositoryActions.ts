import axios from 'axios';
import { Action } from "redux";
import { Dispatch } from 'react';
import { SearchResult } from '../models/github-search-result.model';
import { ChangePageAction, ChangePerPageAction, FetchDataAction, FetchDataErrorAction, FetchDataSuccessAction, SetTotalPageAction, } from './RepositoryActionTypes';

export const fetchData = (query: string, page: number, perPage: number): FetchDataAction => ({
    type: 'FETCH_DATA',
    payload: { query, page, perPage },
});

export const fetchDataSuccess = (data: SearchResult): FetchDataSuccessAction => ({
    type: 'FETCH_DATA_SUCCESS',
    payload: data,
});

export const fetchDataError = (error: string): FetchDataErrorAction => ({
    type: 'FETCH_DATA_ERROR',
    payload: error,
});

export const changePage = (page: number): ChangePageAction => ({
    type: 'CHANGE_PAGE',
    payload: page,
});

export const changePerPage = (perPage: number): ChangePerPageAction => ({
    type: 'CHANGE_PER_PAGE',
    payload: perPage,
});

export const setTotalPage = (perPage: number): SetTotalPageAction => ({
    type: 'SET_TOTAL_PAGE',
    payload: perPage,
});

export const searchRepositoriesAction = (query: string, page: number, perPage: number) => {
    return function (dispatch: Dispatch<Action>) {
        dispatch(fetchData(query, page, perPage));
        dispatch(changePage(page));
        dispatch(changePerPage(perPage));
        axios.get(`https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=${perPage}`)
            .then(response =>  {
                dispatch(fetchDataSuccess(response.data))
                dispatch(setTotalPage(response.data.total_count ));
            })
            .catch(error => dispatch(fetchDataError(error.message)))
    }
}