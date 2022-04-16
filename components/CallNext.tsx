import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
//import styles from './CallNext.module.scss';

type Props = {
  addTeamId: (newTeam: string) => void;
  BASE_API: string;
};

const CallNext: React.FC<Props> = ({ addTeamId, BASE_API }) => {
  
  const [teamName, setTeamName] = useState("");
  const [court, setCourt] = useState(0);
  const handleButtonPress = async (teamName: string) => {

    let teamId = undefined;
    if (teamName.trim() !== "" && court > 0) {
      setTeamName(""); 
      const res = await fetch(BASE_API + "/team/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"teamName": teamName, "created": (Date.now()/1000)})
      });
      const data = await res.json();
      addTeamId(data.teamId);
      teamId = data.teamId;
    } else if (court < 1) {
      alert("Select your court!");
    } else {
      alert("You must enter a valid team name!");
    }

    if (court > 0 && teamId !== undefined) {
      const res = await fetch(BASE_API + "/court/join", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"teamId": teamId, "court": court})
      });
      const data = await res.json();
    }
   
  }

  return (
    <Box sx={{ width: '100' }}> 
    <Grid container spacing={2} columns={15}>
      <Grid item xs={6}>
         <TextField 
            variant='outlined'
            size="small"
            value={teamName}
            placeholder="Enter New Team Name"
            onChange={(event) => setTeamName(event.target.value)}
          />
      </Grid>
      <Grid item xs={4}>
        <FormControl sx={{ minWidth: 90 }} size="small">
          <InputLabel id="demo-simple-select-label">Court</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={court}
              label="Court"
              onChange={(event) => setCourt(event.target.value as number)}
            >
              <MenuItem value={0}>Select</MenuItem>
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
            </Select>
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <Button 
          variant="contained"
          onClick={() => handleButtonPress(teamName)}  
        >Add</Button>
      </Grid>
      </Grid>
    </Box>
  );
};

export default CallNext;