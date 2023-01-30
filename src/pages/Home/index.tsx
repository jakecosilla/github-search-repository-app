import React from 'react';
import Search from '../../components/Search';
import './styles.css'

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to GitHub Search </h1>
        <p>Search for any repository on GitHub</p>
      </div>
      <div className="home-search">
        <Search />
      </div>
    </div>
  );
}

export default Home;
