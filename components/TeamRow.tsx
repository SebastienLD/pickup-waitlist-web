import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
//import styles from './TeamRow.module.scss';

type Props = {
  teamId: string;
  inTeam: boolean;
  handleInTeamChange: (inTeam: boolean) => void;
  BASE_API: string;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TeamRow: React.FC<Props> = ({ teamId, inTeam, handleInTeamChange, BASE_API }) => {

  interface Team {
    name: string;
    numPlayers: number;
  }

  const [numPlayers, setNumPlayers] = useState<number>(0);
  const [inThisTeam, setInThisTeam] = useState<boolean>(false);
  const [teamName, setTeamName] = useState<string>("");
  const [createdEpoch, setCreatedEpoch] = useState<Date>(new Date(1649613004));
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

  const init = async () => {
    const res = await fetch(BASE_API + "/team/get", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"teamId": teamId})
    });
    const data = await res.json();
    console.log(data);
    setTeamName(data.teamName);
    const createdNum = Number(data.created);
    const miliseconds = createdNum * 1000;
    const dateCreated = new Date(miliseconds)
    setCreatedEpoch(dateCreated);
  }

  useEffect(() => {
    init();
  }, []);

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
      <Grid container spacing={2} columns={16}>
          <Grid item xs={4}>
            {teamName}
          </Grid>
          <Grid item xs={4}>
            {numPlayers}
          </Grid>
          <Grid item xs={4}>
            {createdEpoch.getHours()}:{createdEpoch.getMinutes()}
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