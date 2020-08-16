import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import theme from '../../utils/theme'

const CssTextField = withStyles({
    root: {
      '& input': {
        backgroundColor: theme.fontMainColor,
        borderRadius: 5
      },
      '& .MuiInputBase-root': {
        backgroundColor: "#fff"
      },
      '& label.Mui-focused': {
        color: theme.mainColor,
        borderColor: theme.mainColor
      },
      '& .MuiFilledInput-underline:after': {
        borderBottomColor: theme.mainColor,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: theme.mainColor,
        },
        '&.Mui-focused fieldset': {
          borderColor:  theme.mainColor,
        },
        '&:hover fieldset': {
          borderColor: theme.mainColor,
        },
      }
    },
})(TextField);

export default CssTextField