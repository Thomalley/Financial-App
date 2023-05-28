import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  homeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100vh',
    '& h4': {
      color: theme.palette.secondary.silver,
      fontWeight: '200',
      marginTop: '60px',
    },
    '& a': {
      color: theme.palette.primary.main,
      fontSize: '18px',
    },
    '& div': {
      minWidth: '280px',
    },
    '& img': {
      display: 'block',
      margin: 'auto',
    },
    '& .MuiTextField-root': {
      marginBottom: '10px',
    },
  },
  home: {
    color: 'white',
    '& a': {
      margin: '50px 10px',
      '&:link': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
      },
      '&:visited': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
      },
      '&:hover': {
        color: '#ccc',
        textDecoration: 'underline',
      },
    },
  },
  homeLink: {
    padding: '40px 10px',
    textAlign: 'center',
  },
  image: {
    maxWidth: '280px',
    maxHeight: '100%',
  },
}));

export default useStyles;
