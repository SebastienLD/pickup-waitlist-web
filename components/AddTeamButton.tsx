import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
//import styles from './AddTeamButton.module.scss';

type Props = {
  addTeam: (newTeam: string) => void;
};

const AddTeamButton: React.FC<Props> = ({ addTeam }) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [teamName, setTeamName] = useState("");

  return (
    <Box sx={{ width: '100' }}> 
    
      <TextField 
        variant='outlined'
        value={teamName}
        onChange={(event) => setTeamName(event.target.value)}
      />
      <Button 
        variant="contained"
        onClick={() => addTeam(teamName)}  
      >Add Team</Button>
    </Box>
  );
};

export default AddTeamButton;