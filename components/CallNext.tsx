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
import { BASE_API, Team, Player } from './constants';

type Props = {
  player: Player;
  addTeam: (team: Team) => void;
  court: number;
  setPlayer: (player: Player) => void;
};

const CallNext: React.FC<Props> = ({ addTeam, court, player, setPlayer }) => {
  
  const handleButtonPress = async () => {
    const res = await fetch(BASE_API + "/team/create", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"created": (Date.now()/1000), "playerId": player.playerId, "court": court})
    });
    const data: Team = await res.json();
    addTeam({
      "teamId": data.teamId,
      "court": court,
      "created": data.created,
      "teamName": data.teamName,
      "players": [player],
    });
    let copyPlayer = player;
    copyPlayer.teamId = data.teamId; 
    setPlayer(copyPlayer)
  }

  return (
    <Box sx={{ width: '100' }}> 
    {/* <Grid container spacing={2} columns={15}>
      <Grid item xs={6}>
         <TextField 
            variant='outlined'
            size="small"
            value={teamName}
            placeholder="Team Name"
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
      <Grid item xs={5}> */}
        <Button 
          variant="contained"
          onClick={handleButtonPress}
          disabled={(player.teamId !== undefined)} 
        >Call Next!</Button>
    </Box>
  );
};

export default CallNext;