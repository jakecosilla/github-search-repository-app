import { Action } from "redux";
import { SearchResult } from "../models/github-search-result.model";


  export interface FetchDataAction extends Action {
    type: 'FETCH_DATA';
    payload: { query: string, page: number, perPage: number };
  }
  
  export interface FetchDataSuccessAction extends Action {
    type: 'FETCH_DATA_SUCCESS';
    payload: SearchResult;
  }
  
  export interface FetchDataErrorAction extends Action{
    type: 'FETCH_DATA_ERROR';
    payload: string;
  }
  
  export interface ChangePageAction extends Action {
    type: 'CHANGE_PAGE';
    payload: number;
  }
  
  export interface ChangePerPageAction extends Action {
    type: 'CHANGE_PER_PAGE';
    payload: number;
  }
  
  export interface SetTotalPageAction extends Action {
    type: 'SET_TOTAL_PAGE';
    payload: number;
  }

  export type RepositoryActionTypes = FetchDataAction | FetchDataSuccessAction | FetchDataErrorAction | ChangePageAction | ChangePerPageAction | SetTotalPageAction;
  