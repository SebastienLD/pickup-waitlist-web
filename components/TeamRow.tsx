import { useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
//import styles from './TeamRow.module.scss';

type Props = {
  teamId: string;
  inTeam: boolean;
  handleInTeamChange: (inTeam: boolean) => void;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TeamRow: React.FC<Props> = ({ teamId, inTeam, handleInTeamChange }) => {

  interface Team {
    name: string;
    numPlayers: number;
  }
  const [numPlayers, setNumPlayers] = useState<number>(0);
  const [inThisTeam, setInThisTeam] = useState<boolean>(false);
  const handleJoinTeam = () => {
    setNumPlayers(numPlayers+1);
    handleInTeamChange(true);
    setInThisTeam(true);
  }
  const handleLeaveTeam = () => {
    setNumPlayers(numPlayers-1);
    handleInTeamChange(false);
    setInThisTeam(false);
  }

  const joinButton = () =>{
    return (
      <Button
        size="small" 
        variant="outlined"
        onClick={handleJoinTeam}
      >
        Join
      </Button>
    )
  }

  const cannotJoinButton = () =>{
    return (
      <Button
        disabled
        size="small" 
        variant="outlined"
      >
        Join
      </Button>
    )
  }

  const leaveButton = () =>{
    return (
      <Button
        size="small" 
        variant="outlined"
        color="error"
        onClick={handleLeaveTeam}
      >
        Leave
      </Button>
    )
  }

  return (
    <Item>
      <Grid container spacing={2} columns={12}>
          <Grid item xs={4}>
            {teamId}
          </Grid>
          <Grid item xs={4}>
              {numPlayers}
          </Grid>
          <Grid item xs={4}>
            {(inThisTeam) ?
              leaveButton() :
              ((numPlayers < 5 && !inTeam) ?
                joinButton() : cannotJoinButton())
            }
          </Grid>
      </Grid>
    </Item>
  )
};

export default TeamRow;