import { Repository } from "./repository.model";

export interface SearchResult {
    totalCount: number;
    items: Repository[];
}
