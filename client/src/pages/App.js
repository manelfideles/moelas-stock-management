import List from '../components/List';
import SearchBar from '../components/SearchBar';
import { Page } from '@geist-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/App.module.css';

function App() {

  const [drinks, setDrinks] = useState([]);
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    const first = axios.get('http://localhost:9000/drinks');
    const second = axios.get('http://localhost:9000/cocktails');
    first.then((res) => setDrinks(res.data))
    second.then((res) => setCocktails(res.data))
  }, [])

  return (
    <Page className={styles.home}>
      <SearchBar />
      <div className={styles.content}>
        <List bevType='drinks' beverages={drinks}></List>
        <List bevType='cocktails' beverages={cocktails}></List>
      </div>
    </Page>
  );
}

export default App;
