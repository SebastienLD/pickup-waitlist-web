import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
//import styles from './CallNext.module.scss';

type Props = {
  addTeamId: (newTeam: string) => void;
  BASE_API: string;
};

const CallNext: React.FC<Props> = ({ addTeamId, BASE_API }) => {
  
  const [teamName, setTeamName] = useState("");
  const handleButtonPress = async (teamName: string) => {

    if (teamName.trim() !== "") {
      
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
        placeholder="Enter New Team Name"
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