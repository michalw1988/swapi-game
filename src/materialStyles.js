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
  card: {
    minHeight: 200,
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
}))