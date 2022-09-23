import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { modalStyle } from './constants';

type Props = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleUserSubmission: (name: string, email: string) => void;
};

const GetNameModal: React.FC<Props> = ({ 
  open, handleOpenChange, handleUserSubmission
}) => {
  
  const [playerName, setPlayerName] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");

  const handleSubmit = () => {
    handleUserSubmission(playerName, playerEmail);
    handleOpenChange(false);
  }

  return (
   
    <Modal
      open={open}
      onClose={() => handleOpenChange(false)}  
    >
        <Box sx={modalStyle}>
          <TextField
              sx={{width: "300px"}}
              variant='outlined'
              size="small"
              value={playerName}
              placeholder="Enter Your Name"
              onChange={(event) => setPlayerName(event.target.value)}
          />
          <TextField
              sx={{width: "300px", mb: "0.5em", mt: "0.5em"}}
              variant='outlined'
              size="small"
              value={playerEmail}
              placeholder="Enter Your Email"
              onChange={(event) => setPlayerEmail(event.target.value)}
          />
          <Button 
              variant="contained"
              onClick={handleSubmit}  
              >Create User</Button>
        </Box>
    </Modal>
  )
};

export default GetNameModal;