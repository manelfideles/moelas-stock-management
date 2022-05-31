import styles from '../styles/App.module.css';
import { Page, Text } from '@geist-ui/core';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [drinks, setDrinks] = useState();

  useEffect(() => {
    axios.get('http://localhost:9000/drinks')
      .then((res) => { setDrinks(res.data); console.log(res.data); })
  }, [])

  return (
    <Page className={styles.home}>
      <Text h2>Moelas Stock Management</Text>
      {drinks}
    </Page>
  );
}

export default App;
