import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    '& .MuiOutlinedInput-root': {
      '&.Mui-error fieldset': {
        borderColor: theme.palette.text.error2,
      },
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: theme.palette.text.error2,
    },
    '& .MuiFormHelperText-root.Mui-error': {
      color: theme.palette.text.error2,
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
  },

  container: {
    maxWidth: '70%',
    height: '750px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  card: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '66%',
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      flexBasis: '50%',
    },
  },

  contentLogin: {
    padding: theme.spacing(8, 4, 3, 4),
    display: 'flex',
    marginTop: '3%',
    flexDirection: 'column',
    alignItems: 'center',
  },

  magicBox: {
    height: '73.6%',
    width: '32.6%',
    background: theme.palette.background.gradient,
    position: 'absolute',
    top: 134,
    transition: '2s',
    borderRadius: '5px',
    zIndex: 1,
  },

  magicBoxContent: {
    display: 'flex',
    marginTop: '35%',
    flexDirection: 'column',
    alignItems: 'center',
  },

  magicBoxBtn: {
    borderRadius: '18px',
    padding: '12px 23px',
  },
  // [theme.breakpoints.down('md')]: {
  //   display: 'none',
  // },

}));

export default useStyles;
