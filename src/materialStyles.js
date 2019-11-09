import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  pageTitle: {
    marginTop: 32,
    marginBottom: 8,
    textAlign: 'center',
  },
  pageSubtitle: {
    marginBottom: 48,
    textAlign: 'center',
  },
  gridElementTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    minHeight: 250,
  },
  cardTitle: {
    fontSize: 20,
  },
  resultText: {
    marginTop: 32,
    marginBottom: 32,
    textAlign: 'center',
  }
}))