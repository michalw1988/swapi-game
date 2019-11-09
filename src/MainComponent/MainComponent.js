import React, { useState, useEffect } from 'react'
import './MainComponent.scss'

const OBJECTS_PER_PAGE = 10
const RESOURCE_FIGHT_ATTRIBUTES = {
  'starships': 'crew',
  'people': 'mass',
}
const FIGHT_RESUTLS_TEXTS = [
  'There is no winner in this fight. Both sides are eqeal.',
  'Side 1 won this fight!',
  'Side 2 won this fight!',
  'Winner cannot be determined in this fight. Some parameters are unknown.'
]

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomPairNumbers = totalCount => {
  const firstNumber = getRandomInt(1, totalCount)
  let secondNumber = getRandomInt(1, totalCount)
  while (firstNumber === secondNumber) secondNumber = getRandomInt(1, totalCount) // make sure it's not the same number
  return [firstNumber, secondNumber]
}

function MainComponent() {
  const [resourceName, setResourceName] = useState('people')
  const [resourcesCount, setResourcesCount] = useState(null)
  const [resourcesPairNumbers, setResourcesPairNumbers] = useState([null, null])
  const [pair, setPair] = useState([null, null])
  const [winnerNumber, setWinnerNumber] = useState(null)
  const [sidesStats, setSidesStats] = useState([0, 0])

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
      if (!number) return
      const objectsPage = Math.ceil(number / OBJECTS_PER_PAGE)
      return `https://swapi.co/api/${resourceName}?page=${objectsPage}`
    })

    Promise.all(urls.map((url, i) =>
      fetch(url)
      .then(response => response.json())
      .then(data => {
        const number = resourcesPairNumbers[i]
        const numberInResultsArray = (number - 1) % OBJECTS_PER_PAGE
        return data.results[numberInResultsArray]
      }
    )))
    .then(data => {
      setPair(data);
      declareWinner(data, resourceName)
    })
  }, resourcesPairNumbers)

  const declareWinner = (data, resourceName) => {
    const fightAttribute = RESOURCE_FIGHT_ATTRIBUTES[resourceName];
    let winnerNumber = 0 // a tie
    if (parseInt(data[0][fightAttribute], 10) > parseInt(data[1][fightAttribute], 10)) {
      winnerNumber = 1
      updateSideStats(0)
    }
    else if (parseInt(data[0][fightAttribute], 10) < parseInt(data[1][fightAttribute], 10)) {
      winnerNumber = 2
      updateSideStats(1)
    }
    else if (data[0][fightAttribute] === 'unknown' || data[1][fightAttribute] === 'unknown') winnerNumber = 3 // when one of the sides has unknown parameters
    setWinnerNumber(winnerNumber)
  }

  const updateSideStats = sideNumber => {
    const newSidesStats = [...sidesStats]
    let newSideWinCount = newSidesStats[sideNumber]
    newSidesStats[sideNumber] = ++newSideWinCount
    setSidesStats(newSidesStats)
  }

  return (
    <div>
      <h1>SW fights!</h1>
      {
        pair.map((object, i) => {
          if (!object) return <div key={i}>Loading...</div>

          return (
            <div key={i}>
              <h2>{ object.name}</h2>
              <div>Fight attribute: {object.crew || object.mass}</div>
            </div>
          )
        })
      }

      <br/>
      <h2>{FIGHT_RESUTLS_TEXTS[winnerNumber]}</h2>

      <div>Side 1: {sidesStats[0]}</div>
      <div>Side 2: {sidesStats[1]}</div>

      <br/>
      <button onClick={() => {
        setResourcesPairNumbers(getRandomPairNumbers(resourcesCount))
      }}>Let's fight again</button>
    </div>
  );
}

export default MainComponent
