import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
//import styles from './TeamRow.module.scss';

type Props = {
  teamId: string;
  playerTeamId: string;
  setPlayerTeamId: (playerId: string) => void;
  BASE_API: string;
  playerId: string;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TeamRow: React.FC<Props> = ({ teamId, playerTeamId, setPlayerTeamId, BASE_API, playerId }) => {

  interface Team {
    name: string;
    numPlayers: number;
  }

  const [numPlayers, setNumPlayers] = useState<number>(0);
  const [inThisTeam, setInThisTeam] = useState<boolean>(teamId === playerTeamId);
  const [teamName, setTeamName] = useState<string>("");
  const [createdEpoch, setCreatedEpoch] = useState<Date>(new Date(1649613004));

  const postJoinTeam = async () => {
    const res = await fetch(BASE_API + "/team/join", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"teamId": teamId, "playerId": playerId})
    });
  }

  const postLeaveTeam = async () => {
    const res = await fetch(BASE_API + "/team/leave", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"playerId": playerId})
    });
  }

  const handleJoinTeam = () => {
    if (playerId.trim() !== "") {
      setNumPlayers(numPlayers+1);
      setPlayerTeamId(teamId);
      setInThisTeam(true);
      postJoinTeam();
    } else {
      alert("Must add name before joining team");
    }
   
  }
  const handleLeaveTeam = () => {
    setNumPlayers(numPlayers-1);
    setPlayerTeamId("");
    setInThisTeam(false);
    postLeaveTeam();
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
    setNumPlayers(data.members);
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
            {createdEpoch.getHours() % 12}:{String(createdEpoch.getMinutes()).padStart(2, '0')}
          </Grid>
          <Grid item xs={4}>
            {(inThisTeam) ?
              leaveButton() :
              ((numPlayers < 5 && (playerTeamId === "")) ?
                joinButton() : cannotJoinButton())
            }
          </Grid>
      </Grid>
    </Item>
  )
};

export default TeamRow;