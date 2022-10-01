import { useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { BASE_API, Team, Player } from './constants';
import Tooltip from '@mui/material/Tooltip';

timeDelta.addLocale(enLocale);

type Props = {
  team: Team;
  setTeam: (team: Team) => void;
  teamId: string;
  player: Player | null;
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

const TeamRow: React.FC<Props> = ({ team, setTeam, teamId, player, initCourt }) => {

  const [numPlayers, setNumPlayers] = useState<number>(team.players.length);
  const [teamName, setTeamName] = useState<string>(team.teamName);
  const [createdEpoch, setCreatedEpoch] = useState<Date>(new Date(Number(team.created) * 1000));
  const [showTooltip, setShowTooltip] = useState(false);

  const postJoinTeam = async () => {
    if (player === null) 
      return;
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
    if (player === null) 
      return;
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
    if (player === null)
      return;
    if (player.playerId.trim() !== "") {
      setNumPlayers(numPlayers+1);
      postJoinTeam();
    } else {
      alert("Must add name before joining team");
    }
   
  }
  const handleLeaveTeam = () => {
    setNumPlayers(numPlayers-1);
    postLeaveTeam();
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

  const getTimeSince = (date: Date) => {
    const now = new Date(Date.now());
    console.log("First", now);
    console.log("Second", date);
    const delta = Math.abs(now.getTime() - date.getTime());
    return `${Math.floor(delta / 60000)} minutes`;
  }

  const getPlayerListForToolTip = () => {
    let playerList: string = "Players:\n";
    team.players.map((player) => {
      playerList += `${player.name}\n`;
    })
    return (
      <div style={{whiteSpace: 'pre-line'}}>
        {playerList}
      </div>
    );
  };

  return (
    <Item>
      <Grid container spacing={2} columns={12}>
          <Grid item xs={3}>
            {teamName}
          </Grid>
          <Grid item xs={3}>
            <Tooltip 
              open={showTooltip}        
              onMouseEnter={() => { setShowTooltip(true) }}
              onMouseLeave={() => { setShowTooltip(false) }}
              placement="top-start"
              title={getPlayerListForToolTip()}>
              <div>{numPlayers}</div>
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            {/* {(createdEpoch.getHours() === 0) ?
              12 : createdEpoch.getHours() % 12}:{String(createdEpoch.getMinutes()).padStart(2, '0')}{(createdEpoch.getHours() < 12) ? "am" :"pm"} */}
            {getTimeSince(createdEpoch)}
          </Grid>
          <Grid item xs={3}>
            {(player !== null) ? 
              (player.teamId === team.teamId) ?
                leaveButton() :
                ((numPlayers < 5 && (player.teamId === undefined)) ?
                  joinButton() : cannotJoinButton()) :
              cannotJoinButton()
            }
          </Grid>
      </Grid>
    </Item>
  )
};

export default TeamRow;