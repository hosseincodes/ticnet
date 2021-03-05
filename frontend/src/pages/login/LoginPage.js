import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import useStyle from './style'
import classNames from 'classnames';


const LoginPage = (props) => {

  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("");


  //methods
  const validation = (user) => {
    console.log("validation", user);
    if (!user.name)
      return "شما باید نام را وارد کنید";
    else if (user.gender === "" || user.gender === -1)
      return "شما باید جنیسیت خود را انتخاب کنید";
    return null;
  }
  const submit = () => {
    console.log(name, gender);
    const error = validation({name, gender});
    if (error)
      return alert(error);
    props.history.push({
      pathname: "chatroom",
      state: {
        name,
        gender,
      }
    });
  }

  const classes = useStyle();
  return (
    <Grid container direction={"column"}>
      <Grid item>
        <Typography className={classes.headerText}>
          چت روم یونیک
        </Typography>
      </Grid>
      <Grid item container justify={"center"} alignItems={"center"} spacing={2}>
        <Grid item>
          <label className={classes.label}>نام</label>
        </Grid>
        <Grid item>
          <TextField id="outlined-basic" variant="outlined"
                     value={name} onChange={e => setName(e.target.value)}/>
        </Grid>
      </Grid>
      <Grid item container justify={"center"} alignItems={"center"}
            spacing={2} style={{marginTop: '2rem'}}>
        <Grid item>
          <label className={classes.label}>جنسیت</label>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" className={classNames(classes.formControl, classes.formControl1)}>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={gender}
              onChange={e => setGender(e.target.value)}
              label="gender"
            >
              <MenuItem value={-1}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>آقا</MenuItem>
              <MenuItem value={1}>خانم</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item container justify={"center"}>
        <Button variant="contained" color="primary" className={classes.button} onClick={submit}>
          ورود به چت روم
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginPage;