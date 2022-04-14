import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
//import styles from './GetNameModal.module.scss';

type Props = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleChangeName: (name: string) => void;
};

const GetNameModal: React.FC<Props> = ({ open, handleOpenChange, handleChangeName }) => {
  
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = () => {
    handleChangeName(playerName);
    setPlayerName("");
  }

  return (
   
      <Box>
        <TextField 
            variant='outlined'
            size="small"
            value={playerName}
            placeholder="Enter Your Name"
            onChange={(event) => setPlayerName(event.target.value)}
        />
        <Button 
            variant="contained"
            onClick={handleSubmit}  
        >Submit</Button>
      </Box>
  
  )
};

export default GetNameModal;