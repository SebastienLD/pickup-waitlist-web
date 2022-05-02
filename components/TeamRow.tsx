import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
//import styles from './TeamRow.module.scss';
import { BASE_API, Team, Player } from './constants';

type Props = {
  team: Team;
  setTeam: (team: Team) => void;
  teamId: string;
  player: Player;
  setPlayerTeamId: (playerId: string) => void;
  initCourt: number;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TeamRow: React.FC<Props> = ({ team, setTeam, teamId, player, setPlayerTeamId, initCourt }) => {

  const [numPlayers, setNumPlayers] = useState<number>(team.players.length);
  const [inThisTeam, setInThisTeam] = useState<boolean>(team.teamId === player.teamId);
  const [teamName, setTeamName] = useState<string>(team.teamName);
  const [createdEpoch, setCreatedEpoch] = useState<Date>(new Date(Number(team.created) * 1000));
  const [court, setCourt] = useState(team.court);

  const postJoinTeam = async () => {
    const res = await fetch(BASE_API + "/team/join", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"teamId": teamId, "playerId": player.playerId})
    });
    const data = await res.json();
    let playerCopy = player;    playerCopy.teamId = teamId;
    let teamCopy: Team = team;
    let teamPlayers: Player[] = team.players;
    teamPlayers.push(playerCopy);
    teamCopy.players = teamPlayers;
    setTeam(teamCopy);
  }

  const postLeaveTeam = async () => {
    const res = await fetch(BASE_API + "/team/leave", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"playerId": player.playerId})
    });
    let playerCopy = player;
    playerCopy.teamId = undefined;
    let teamCopy: Team = team;
    let teamPlayers: Player[] = [];
    team.players.map((teamPlayer) => {
      if (teamPlayer.playerId !== player.playerId) {
        teamPlayers.push(teamPlayer);
      }
    })
    teamCopy.players = teamPlayers;
    setTeam(teamCopy);
  }

  const handleJoinTeam = () => {
    if (player.playerId.trim() !== "") {
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

  // const init = async () => {
  //   const res = await fetch(BASE_API + "/team/get", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({"teamId": teamId})
  //   });
  //   const data = await res.json();
  //   console.log(data);
  //   setTeamName(data.teamName);
  //   const createdNum = Number(data.created);
  //   const miliseconds = createdNum * 1000;
  //   const dateCreated = new Date(miliseconds)
  //   setCreatedEpoch(dateCreated);
  //   setNumPlayers(data.members);
  //   setCourt(data.court);
  // }

  // useEffect(() => {
  //   init();
  // }, []);

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
        {(team.players.length === 5) ? "Full" : "Join"}
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
          <Grid item xs={3}>
            {teamName}
          </Grid>
          <Grid item xs={3}>
            {numPlayers}
          </Grid>
          <Grid item xs={3}>
            {(createdEpoch.getHours() === 0) ? 12 : createdEpoch.getHours() % 12}:{String(createdEpoch.getMinutes()).padStart(2, '0')}{(createdEpoch.getHours() < 12) ? "am" : "pm"}
          </Grid>
          <Grid item xs={3}>
            {(player.teamId === team.teamId) ?
              leaveButton() :
              ((numPlayers < 5 && (player.teamId === undefined)) ?
                joinButton() : cannotJoinButton())
            }
          </Grid>
      </Grid>
    </Item>
  )
};

export default TeamRow;