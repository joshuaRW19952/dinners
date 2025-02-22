import { useState, useEffect } from 'react';
import { DINNERS_IN } from './constants';
import './index.css';

const SPREADSHEET_ID = '1w81GOhHKQ9xAQTGobgl5Mojb4RD_0RCA140dUmhycOw';
const API_KEY = 'AIzaSyCSiVi1WHmCLtAcbv_FzXMxwwOPaLmSWWc';
const API_CALL_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A:ZZZ?key=${API_KEY}`;

/**
 * Make an API to google sheets and call passed function with the result
 * @param {function} setDinners callback to set dinners into state
 */
const getDinnersFromSpreadsheet = async setDinners => {
  try {
    const { values } = await fetch(API_CALL_URL).then(response => response.json());
    const columns = values[0];
    const rows = values.slice(1);

    const dinners = rows.map(row => {
      return columns.reduce((acc, columnName, columnNum) => {
        acc[columnName] = row[columnNum];
        return acc;
      }, {});
    });

    setDinners(dinners);
  } catch (err) {
    // fallback to static data
    console.error(err);
    return DINNERS_IN;
  }
};

const DinnersIn = () => {
  const [dinners, setDinners] = useState();

  // load data from external source
  useEffect(() => {
    getDinnersFromSpreadsheet(setDinners);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>{(dinners || []).map(dinner => {
      const { name, type, time, ingredients, sides, images } = dinner;
      return (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
          {name}
          <ul>
            <li>type: {type}</li>
            <li>time: {time}</li>
            <li>ingredients: {ingredients}</li>
            <li>sides: {sides}</li>
            <li>images: {images}</li>
          </ul>
        </div>
      );
    })}</div>
  );
};

export default DinnersIn;
