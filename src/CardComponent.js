import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './materialStyles'


const renderStarshipData = (object) => {
  return (
    <>
      <Typography component="p">Class: {object.starship_class}</Typography>
      <Typography component="p">Length [m]: {object.length}</Typography>
      <Typography component="p"><strong>Crew: {object.crew}</strong></Typography>
      <Typography component="p">Cost [credits]: {object.cost_in_credits}</Typography>
      <Typography component="p">Cargo [tonnes]: {object.cargo_capacity}</Typography>
      <Typography component="p">Consumables: {object.consumables}</Typography>
      <Typography component="p">Hyperdrive rating: {object.hyperdrive_rating}</Typography>
    </>
  )
}

const renderPersonData = (object) => {
  return (
    <>
      <Typography component="p">Gender: {object.gender}</Typography>
      <Typography component="p">Bigth year: {object.bigth_year}</Typography>
      <Typography component="p">Height: {object.height}</Typography>
      <Typography component="p"><strong>Mass [kg]: {object.mass}</strong></Typography>
      <Typography component="p">Skin color: {object.skin_color}</Typography>
      <Typography component="p">Hair color: {object.hair_color}</Typography>
      <Typography component="p">Eye color: {object.eye_color}</Typography>
    </>
  )
}

const CardComponent = ({object, index, sidesStats, resourceName}) => {
  const classes = useStyles()

  return (
    <Grid item sm={6} xs={12}>
      <Typography variant="h5" className={classes.gridElementTitle}>Side {index + 1} ({sidesStats[index]} points)</Typography>
      {
        <Card className={classes.card}>
          {
            object && <CardContent>
              <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                {object.name}
              </Typography>
              { resourceName === 'starships' && renderStarshipData(object) }
              { resourceName === 'people' && renderPersonData(object) }
            </CardContent>
          }
        </Card>
      }
    </Grid>
  )
}

export default CardComponent