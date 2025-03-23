import { useState, useEffect } from 'react';
import { DINNERS_IN } from './constants';
// import { getDinnerOfType } from './utils';
import { Section } from './components/Section/Section';

const SPREADSHEET_ID = '1w81GOhHKQ9xAQTGobgl5Mojb4RD_0RCA140dUmhycOw';
const API_KEY = 'AIzaSyCSiVi1WHmCLtAcbv_FzXMxwwOPaLmSWWc';
const API_CALL_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A:ZZZ?key=${API_KEY}`;

const DinnersIn = () => {
  const [data, setData] = useState([]);
  const [selections, setSelections] = useState({ chicken: null, beef: null, other: null, wildcard: null });
  const [exclusions, setExclusions] = useState([]);
  
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        {Object.keys(selections).map(type => {
          const selection = selections[type];
          const setSelection = newSelection => setSelections({ ...selections, [type]: newSelection });
          return (
            <Section 
              key={type} type={type} 
              setSelection={setSelection} 
              selection={selection} dinners={type === 'wildcard' ? data : data.filter(dinner => dinner.type === type)}
              exclusions={exclusions}
              setExclusions={setExclusions}
            />
          );
        })}
    </div>
  );
};

export default DinnersIn;
