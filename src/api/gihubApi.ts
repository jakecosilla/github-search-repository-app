import axios from "axios";
import { SearchResult } from "../models/github-search-result.model";

export const searchRepository = async (throttledQuery: string, page: number, perPage: number) => {
  return await axios.get<SearchResult>(
    `https://api.github.com/search/repositories?q=${throttledQuery}&page=${page}&per_page=${perPage}`
  );
};
