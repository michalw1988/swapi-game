import React, { useState, useEffect } from 'react'
import { OBJECTS_PER_PAGE, RESOURCE_FIGHT_ATTRIBUTES, FIGHT_RESUTLS_TEXTS } from './consts'
import { getRandomPairNumbers} from './helpers'
import { ButtonWrapper, FightResultWrapper, LoaderComponent } from './HelperComponents'
import CardComponent from './CardComponent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './materialStyles'


const GameComponent = () => {
  const [loadingContent, setLoadingContent] = useState(false)
  const [resourceName, setResourceName] = useState('starships')
  const [resourcesCount, setResourcesCount] = useState(null)
  const [resourcesPairNumbers, setResourcesPairNumbers] = useState([null, null])
  const [pair, setPair] = useState([null, null])
  const [winnerNumber, setWinnerNumber] = useState(null)
  const [sidesStats, setSidesStats] = useState([0, 0])
  const classes = useStyles()

  // get total resources count and set initial pair
  useEffect(() => {
    setLoadingContent(true)
    fetch(`https://swapi.co/api/${resourceName}`)
      .then(results => results.json())
      .then(data => {
        setResourcesCount(data.count)
        setResourcesPairNumbers(getRandomPairNumbers(data.count))
        setLoadingContent(false)
      })
  }, [resourceName])

  // get data for given pair
  useEffect(() => {
    const urls = resourcesPairNumbers.map((number, i) => {
      if (!number) return null
      const objectsPage = Math.ceil(number / OBJECTS_PER_PAGE)
      return `https://swapi.co/api/${resourceName}?page=${objectsPage}`
    })
    
    setLoadingContent(true)
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
      setPair(data)
      declareWinner(data, resourceName)
      setLoadingContent(false)
    })
  }, [resourcesPairNumbers, resourceName])

  const declareWinner = (data, resourceName) => {
    const fightAttribute = RESOURCE_FIGHT_ATTRIBUTES[resourceName]
    let winnerNumber = 0 // a tie
    if (parseInt(data[0][fightAttribute], 10) > parseInt(data[1][fightAttribute], 10)) {
      winnerNumber = 1
      updateSideStats(0)
    }
    else if (parseInt(data[0][fightAttribute], 10) < parseInt(data[1][fightAttribute], 10)) {
      winnerNumber = 2
      updateSideStats(1)
    }
    else if (data[0][fightAttribute] === 'unknown' || data[1][fightAttribute] === 'unknown') winnerNumber = 3 // when one of the sides has key parameter unknown
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
      {
        loadingContent && 
        <LoaderComponent>
          <CircularProgress />
        </LoaderComponent>
      }

      <Typography variant="h3" className={classes.pageTitle}>Star Wars fights</Typography>
      <Typography variant="h6" className={classes.pageSubtitle}>{resourceName.toUpperCase()}</Typography>

      <Grid container spacing={3}>
        <CardComponent object={pair[0]} index={0} sidesStats={sidesStats} resourceName={resourceName} />
        <CardComponent object={pair[1]} index={1} sidesStats={sidesStats} resourceName={resourceName} />
      </Grid>

      <FightResultWrapper>
        <Typography variant="h5" className={classes.resultText}>
          {!loadingContent && FIGHT_RESUTLS_TEXTS[winnerNumber]}
        </Typography>
      </FightResultWrapper>
      
      <ButtonWrapper>
        <Button variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            setPair([null, null])
            setResourcesPairNumbers(getRandomPairNumbers(resourcesCount))
          }}>
          Let's fight again
        </Button>
      </ButtonWrapper>

      <ButtonWrapper>
        <Button variant="contained"
          id="change-resource-button"
          className={classes.button}
          onClick={() => {
            setResourceName(resourceName === 'starships' ? 'people' : 'starships')
            setResourcesPairNumbers([null, null])
            setPair([null, null])
            setWinnerNumber(null)
            setSidesStats([0, 0])
          }}>
          Play with {resourceName === 'starships' ? 'people' : 'starships'} now
        </Button>
      </ButtonWrapper>
    </div>
  )
}

export default GameComponent
