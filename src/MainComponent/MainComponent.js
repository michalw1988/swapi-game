import React, { useState, useEffect } from 'react'
import './MainComponent.scss'
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  pageTitle: {
    marginTop: 32,
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  card: {
    minWidth: 275,
  },
  cardTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  resultText: {
    marginTop: 32,
    marginBottom: 32,
    textAlign: 'center',
  }
}));


const ButtonWrapper = styled.div`
  text-align: center;
`;

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
  const [resourceName, setResourceName] = useState('starships')
  const [resourcesCount, setResourcesCount] = useState(null)
  const [resourcesPairNumbers, setResourcesPairNumbers] = useState([null, null])
  const [pair, setPair] = useState([null, null])
  const [winnerNumber, setWinnerNumber] = useState(null)
  const [sidesStats, setSidesStats] = useState([0, 0])

  const classes = useStyles();

  // get total resources count and set initial pair
  useEffect(() => {
    fetch(`https://swapi.co/api/${resourceName}`)
      .then(results => results.json())
      .then(data => {
        setResourcesCount(data.count)
        setResourcesPairNumbers(getRandomPairNumbers(data.count))
      });
  }, [resourceName])

  // get data for given pair
  useEffect(() => {
    const urls = resourcesPairNumbers.map((number, i) => {
      if (!number) return null
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
  }, [resourcesPairNumbers, resourceName])

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
      <Typography variant="h3" className={classes.pageTitle}>Star Wars fights</Typography>

      <Grid container spacing={3}>
        {
          pair.map((object, i) => {
            return (
              <Grid item xs={6} key={i}>
                <Typography variant="h5" className={classes.cardTitle}>Side {i+1} ({sidesStats[i]} points)</Typography>
                {
                  object && <Card className={classes.card} >
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {object.name}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Fight attribute: {object.crew || object.mass}
                      </Typography>
                    </CardContent>
                  </Card>
                }
              </Grid>
            )
          })
        }
      </Grid>

      <Typography variant="h5" className={classes.resultText}>
        {FIGHT_RESUTLS_TEXTS[winnerNumber]}
      </Typography>
      
      <ButtonWrapper>
        <Button variant="contained"
          color="primary"
          className={classes.button}
          onClick={() =>setResourcesPairNumbers(getRandomPairNumbers(resourcesCount))} >
          Let's fight again
        </Button>
      </ButtonWrapper>
    </div>
  );
}

export default MainComponent
