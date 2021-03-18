import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  containerClock: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textFieldClock: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function CenteredGrid({submitValue,route}) {
  const [userName,setUserName]=React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [error,seterror]= React.useState(false);
  const [success,SetSuccess]=React.useState(false);
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };
  const classes = useStyles();
    
  const handelUserChange=(e)=>{
      setUserName(e.target.value);
    }
  
const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
    };

const clearData=()=>{
  seterror(false);
  setUserName('');
  setSelectedDate(new Date('2014-08-18T21:11:54'));
  setStartTime('');
  setEndTime('')

}
const Validate=()=>{
  if(userName==''||startTime==''||endTime=='') {return false};
  if(selectedDate=='2014-08-18T21:11:54') {return false};;
  const nreg=/^[a-zA-Z ]*$/;
  if(!userName.match((nreg))||!startTime.match(nreg)||!endTime.match(nreg)) {return false};;
  return true;
}
const submitData=()=>{
  if(Validate())
  {const data={
    "route": route,
    "name":userName,
    "date":selectedDate,
    "starttime":startTime,
    "endtime":endTime
  }
  clearData();
  submitValue(data);}
  else{
    seterror(true);
  }
  
}
  return (
    <div className={classes.root}>
      {error?<Alert severity="error">Values incorrect or empty</Alert>:''}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          <TextField id="standard-basic" label="Rider Name" value={userName} onChange={handelUserChange} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
                  <TextField
                id="date"
                label="Pick A Date"
                type="date"
                defaultValue={selectedDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={selectedDate}
                onChange={handleDateChange}
              />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          <TextField
        id="time"
        label="source"
        type="text"
        className={classes.textFieldClock}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
          value={startTime}
          onChange={handleStartTimeChange}
      />


          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          <TextField
        id="time"
        label="Destination"
        type="text"
        className={classes.textFieldClock}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
          value={endTime}
          onChange={handleEndTimeChange}
      />
          
          </Paper>
        </Grid>
        <Grid item xs={3}>
        <Button variant="contained" color="secondary" onClick={clearData}>Cancle</Button><span>    </span>  
          <Button variant="contained" color="primary" onClick={submitData}> Submit </Button>
          </Grid>
      </Grid>
    </div>
  );
}
