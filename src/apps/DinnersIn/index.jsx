import { useState, useEffect } from 'react';
import { DINNERS_IN } from './constants';
import { getDinnerOfType } from './utils';
import './index.css';

const SPREADSHEET_ID = '1w81GOhHKQ9xAQTGobgl5Mojb4RD_0RCA140dUmhycOw';
const API_KEY = 'AIzaSyCSiVi1WHmCLtAcbv_FzXMxwwOPaLmSWWc';
const API_CALL_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A:ZZZ?key=${API_KEY}`;

const DinnersIn = () => {
  const [data, setData] = useState();
  const [dinners, setDinners] = useState({ chicken: null, beef: null, other: null, wildcard: null });
  const [exclusions, setExclusions] = useState([]);

  const getRandomDinnerOfType = type => {
    const dinner = getDinnerOfType(type === 'wildcard' ? null : type, exclusions, data);
    setDinners({ ...dinners, [type]: dinner.name });    
  };

  const exclude = (dinner, type) => {
    setExclusions([...exclusions, dinner]);
    getRandomDinnerOfType(type);
  };
  
  useEffect(() => {
    const fetchData = async () => {
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
    
        setData(dinners);
      } catch (err) {
        console.error(err);
        setData(DINNERS_IN);
      }
    };
    fetchData();
  }, []);

  const renderDinners = () => Object.keys(dinners).map(type => {
    const dinner = dinners[type];
    return (
      <div key={type}>
        <span>{type}: {dinners[type]}</span>
        <button type="button" onClick={() => getRandomDinnerOfType(type)}>random</button>
        <button type="button" onClick={() => exclude(dinner, type)}>exclude</button>
      </div>
    );
  });

  const removeExclusion = dinner => {
    setExclusions(exclusions.filter(el => el !== dinner));
  };

  const renderExclusions = () => exclusions.map(dinner => 
    <div key={dinner}>
      <span>{dinner}</span>
      <button type="button" onClick={() => removeExclusion(dinner)}>remove</button>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        {renderDinners()}
        <div>
          <span>Exclusions below:</span>
          {renderExclusions()}
        </div>
    </div>
  );
};

export default DinnersIn;
