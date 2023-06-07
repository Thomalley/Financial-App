import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
    paddingBottom: 80,
    paddingTop: 80,
    '& .MuiInputBase-input': {
      position: 'relative',
      top: 0,
      left: 0,
    },
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
  },

  backButton: {
    marginLeft: theme.spacing(2),
  },

  card: {
    backgroundColor: theme.palette.background.dark,
    width: 1200,
    height: 550,
    overflow: 'visible',
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%',
    },
  },

  contentLogin: {
    padding: theme.spacing(8, 4, 3, 4),
    display: 'flex',
    marginTop: '3%',
    flexDirection: 'column',
    alignItems: 'center',
  },

  magicBoxContent: {
    display: 'flex',
    marginTop: '30%',
    flexDirection: 'column',
    alignItems: 'center',
  },

  magicBox: {
    height: 548,
    maxWidth: 587,
    background: theme.palette.background.gradient,
    position: 'absolute',
    top: 230,
    transition: '2s',
    borderRadius: '5px',
    zIndex: 1,
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
