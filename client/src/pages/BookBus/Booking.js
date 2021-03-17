import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Entry from "./Entry"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: '100px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const submitValue=(data)=>{
      console.log("data -->",data);
      fetch(process.env.pythonip+':5000/postData', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => console.log("message",data));
        }

  

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Silver Line    <b>423</b></Typography>
          <Typography className={classes.secondaryHeading}>Terminal A --- South Station </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Entry submitValue={submitValue} route={423}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Cross Town     <b>327</b></Typography>
          <Typography className={classes.secondaryHeading}>
            Harward Square --- Nubian Station
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Entry submitValue={submitValue} route={327}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}> Qupark    <b>596</b></Typography>
          <Typography className={classes.secondaryHeading}>
          Newburyport --- Rockport
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Entry submitValue={submitValue} route={596}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Sprint Line     <b>321</b></Typography>
          <Typography className={classes.secondaryHeading}>
          Northeaster University --- Black Bay
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Entry submitValue={submitValue} route={321}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
