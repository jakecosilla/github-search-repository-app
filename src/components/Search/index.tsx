import React, { useState, useEffect } from 'react';
import { useThrottle } from 'react-use';
import './styles.css';
import CustomLoader from '../CustomLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { searchRepositoriesAction } from '../../redux/RepositoryActions';
import { RootState } from '../../redux/Store';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const throttledQuery = useThrottle(query, 2000);
  const perPageOptions = [10, 20, 30, 40, 50];

  const { results, loading, error, totalPages } = useSelector((state: RootState) => ({
    results: state.results,
    loading: state.loading,
    error: state.error,
    totalPages: state.totalPages,
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage >= 1 && nextPage <= totalPages) {
      setPage(nextPage);
    }
  };

  useEffect(() => {
    if (throttledQuery.trim()) {
      dispatch<any>(searchRepositoriesAction(throttledQuery, page, perPage));
    }
  }, [throttledQuery, page, perPage]);

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔎 Search for repositories"
        />
      </form>

      {error && (
        <div className="search__error">
          {error}
        </div>
      )}
      <div className="custom-loader-container">
        {loading && (<CustomLoader />)}
      </div>
      {results && (
        <>
          <div className="search__results">
            {results.items.map((repository) => (
              <div key={repository.html_url} className="search__result">
                <a href={repository.html_url} className="search__result-link">
                  {repository.name}
                </a>
                <p className="search__result-description">{repository.description}</p>
              </div>
            ))}
          </div>
          <div className="search__pagination">
            <button
              className="search__pagination-button"
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
            >
              <FontAwesomeIcon icon={faStepBackward} />
            </button>
            <button
              className="search__pagination-button"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>
            <span className="search__pagination-page">
              {page} of {totalPages}
            </span>
            <button
              className="search__pagination-button"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              <FontAwesomeIcon icon={faCaretRight} />
            </button>
            <button
              className="search__pagination-button"
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
            >
              <FontAwesomeIcon icon={faStepForward} />
            </button>
            <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
              {perPageOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;

