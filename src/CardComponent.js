import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './materialStyles'


const renderStarshipData = (object) => {
  return (
    <Typography variant="body2" component="p">
      Crew: {object.crew}
    </Typography>
  )
}

const renderPersonData = (object) => {
  return (
    <Typography variant="body2" component="p">
      Mass: {object.mass}
    </Typography>
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