import React, { useState, useEffect } from 'react';
import './MainComponent.scss';

const OBJECTS_PER_PAGE = 10;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomPairNumbers = totalCount => {
  const firstNumber = getRandomInt(1, totalCount)
  let secondNumber = getRandomInt(1, totalCount);
  while (firstNumber === secondNumber) secondNumber = getRandomInt(1, totalCount); // make sure it's not the same number
  return [firstNumber, secondNumber];
}

function MainComponent() {
  const [resourceName, setResourceName] = useState('starships');
  const [resourcesCount, setResourcesCount] = useState(null);
  const [resourcesPairNumbers, setResourcesPairNumbers] = useState([null, null]);
  const [pair, setPair] = useState([null, null]);

  // get total resources count and set initial pair
  useEffect(() => {
    fetch(`https://swapi.co/api/${resourceName}`)
      .then(results => results.json())
      .then(data => {
        setResourcesCount(data.count)
        setResourcesPairNumbers(getRandomPairNumbers(data.count))
      });
  }, [])

  // get data for given pair
  useEffect(() => {
    const urls = resourcesPairNumbers.map((number, i) => {
      if (!number) return;
      const objectsPage = Math.ceil(number / OBJECTS_PER_PAGE)
      return `https://swapi.co/api/${resourceName}?page=${objectsPage}`
    })

    Promise.all(urls.map((url, i) =>
      fetch(url)
      .then(response => response.json())
      .then(data => {
        const number = resourcesPairNumbers[i];
        const numberInResultsArray = (number - 1) % OBJECTS_PER_PAGE
        return data.results[numberInResultsArray]
      }
    )))
    .then(data => setPair(data))
  }, resourcesPairNumbers)

  return (
    <div>
      <h1>SW fights!</h1>
      {
        pair.map((object, i) => (
          <div key={i}>{ object ? object.name : 'Loading...'}</div>
        ))
      }
      <button onClick={() => {
        setResourcesPairNumbers(getRandomPairNumbers(resourcesCount))
      }}>Get new data</button>
    </div>
  );
}

export default MainComponent;
