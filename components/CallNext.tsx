import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
//import styles from './CallNext.module.scss';

type Props = {
  addTeam: (newTeam: string) => void;
};

const CallNext: React.FC<Props> = ({ addTeam }) => {
  
  const [teamName, setTeamName] = useState("");
  const handleButtonPress = (teamName: string) => {
    if (teamName.trim() !== "") {
      addTeam(teamName);
      setTeamName("");
    } else {
      alert("You must enter a valid team name!");
    }
  }

  return (
    <Box sx={{ width: '100' }}> 
      <TextField 
        variant='outlined'
        size="small"
        value={teamName}
        placeholder="Enter Team Name"
        onChange={(event) => setTeamName(event.target.value)}
      />
      <Button 
        variant="contained"
        onClick={() => handleButtonPress(teamName)}  
      >Add Team</Button>
    </Box>
  );
};

export default CallNext;