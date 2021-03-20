import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
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
  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().slice(0,10));
  const [startTime, setStartTime] = React.useState('Stop 1');
  const [endTime, setEndTime] = React.useState('Stop 7');
  const [error,seterror]= React.useState(false);
  const [success,SetSuccess]=React.useState(false);
  const [defDate, setDefDate] = React.useState(new Date().toISOString().slice(0,10));
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
  setSelectedDate(new Date().toISOString().slice(0,10));
  setStartTime('Stop 1');
  setEndTime('Stop 7')

}
const Validate=()=>{
  if(userName=='') {return false};
  if(selectedDate=='') {return false};;
  const nreg=/^[a-zA-Z ]*$/;
  if(startTime==endTime) return false;
  if(!userName.match((nreg))) {return false};;
  return true;
}
const submitData=()=>{
  console.log(selectedDate);
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
                  min:{defDate}
                }}
                value={selectedDate}
                onChange={handleDateChange}
              />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>

        <InputLabel htmlFor="source destination">Source</InputLabel>
        <NativeSelect
          value={startTime}
          onChange={handleStartTimeChange}
          inputProps={{
            name: 'age',
            id: 'age-native-helper',
          }}
        >
          <option value={'Stop 1'}>Stop 1</option>
          <option value={'Stop 2'}>Stop 2</option>
          <option value={'Stop 3'}>Stop 3</option>
          <option value={'Stop 4'}>Stop 4</option>
          <option value={'Stop 5'}>Stop 5</option>
          <option value={'Stop 6'}>Stop 6</option>
          <option value={'Stop 7'}>Stop 7</option>
        </NativeSelect>


          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          <InputLabel htmlFor="source destination">Destination</InputLabel>
        <NativeSelect
          value={endTime}
          onChange={handleEndTimeChange}
          inputProps={{
            name: 'age',
            id: 'age-native-helper',
          }}
        >
          <option value={'Stop 1'}>Stop 1</option>
          <option value={'Stop 2'}>Stop 2</option>
          <option value={'Stop 3'}>Stop 3</option>
          <option value={'Stop 4'}>Stop 4</option>
          <option value={'Stop 5'}>Stop 5</option>
          <option value={'Stop 6'}>Stop 6</option>
          <option value={'Stop 7'}>Stop 7</option>
        </NativeSelect>
          
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
