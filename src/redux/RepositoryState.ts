import { SearchResult } from "../models/github-search-result.model";
import { Action } from "redux";

export interface RepositoryState {
    query: string;
    results: SearchResult | null;
    loading: boolean;
    error?: string | null,
    page: number;
    perPage: number;
    totalPages: number;
}

export interface RepositoryAction extends Action {
    payload: RepositoryState
}
