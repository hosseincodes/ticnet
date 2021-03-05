import {makeStyles} from "@material-ui/styles";

export default makeStyles(theme => ({
  paper: {
    width: '50rem',
    height: 'max-content',
    margin: '3rem auto'
  },
  header: {
    background: "#DDE",
    height: '5rem',
  },
  headerText: {
    fontSize: '2.5rem',
    marginRight: '1rem',
  },
  middle: {
    background: "white",
    height: '20rem',
    overflowY: 'auto'
  },
  messageParent: {
    marginTop: '1rem',
  },
  message_reverse: {
    flexDirection: "row-reverse"
  },
  message: {
    border: "1px solid #ebebeb",
    borderRadius: '2rem',
    backgroundColor: 'white',
    padding: '1rem 1.5rem'
  },
  sender: {
    color: "#aaa",
    fontSize: "0.8rem",
    marginBottom: "0.5rem"
  },
  date: {
    color: "#aaa",
    fontSize: "0.8rem",
    marginTop: "0.5rem"
  },
  messageMe: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: "relative",
    background: "#ebebeb",
    borderRadius: ".4em",
    "&:after": {
      "content": "''",
      "position": "absolute",
      "right": "0",
      "top": "50%",
      "width": "0",
      "height": "0",
      "border": "20px solid transparent",
      "borderLeftColor": "#ebebeb",
      "borderRight": "0",
      "borderBottom": "0",
      "marginTop": "-10px",
      "marginRight": "-20px"
    }
  },
  messageHe: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: "relative",
    background: "#ebebeb",
    borderRadius: ".4em",
    '&:after': {
      "content": "''",
      "position": "absolute",
      "left": "0",
      "top": "50%",
      "width": "0",
      "height": "0",
      "border": "20px solid transparent",
      "borderRightColor": "#ebebeb",
      "borderLeft": "0",
      "borderBottom": "0",
      "marginTop": "-10px",
      "marginLeft": "-20px"
    }
  },
  avatar: {
    width: "4rem",
    borderRadius: "50%",
    marginLeft: '1rem'
  },
  footer: {
    background: "#DDE",
    height: 'max-content'
  },
  input: {
    flex: "1",
    width: '100%',
    background: "#fafafa",
    margin: "1rem",
    padding: "1rem",
    border: "2px solid #cacaca",
    borderRadius: "1rem",
    height: "4rem",
  },
  btnSend: {
    margin: "1rem",
  }, deleteBtn: {
    width: '1rem',
    height: '1rem'
  },
  userItem: {
    padding: '1rem 1.5rem',
    fontSize: '1.5rem',
    backgroundColor: "#1ABC9C",
    color: "white",
    borderRadius: '1rem',
    border: "5px solid transparent",
    margin: "0.5rem 0.5rem "
  },
  userItemActive: {
    border: "5px solid #0A9C7C"
  },
  soundWave: {
    display: "none"
  },
  attachIcon: {
    padding: "0.5rem",
    width: "3rem",
    height: "3rem",
    backgroundColor: "#16A085",
    color: "white",
    borderRadius: "15%",
    marginRight:'1rem'
  },
  attachLink: {
    display: "flex",
    color: "unset",
    textDecoration: "none",
    alignItems: "center"
  }
}))