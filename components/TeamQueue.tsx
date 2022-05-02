import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TeamRow from './TeamRow';
//import styles from './TeamQueue.module.scss';
import { BASE_API, Team, Player} from './constants';

type Props = {
  teams: Team[];
  setTeam: (team: Team) => void;
  player: Player;
  setPlayer: (player: Player) => void;
};

const TeamQueue: React.FC<Props> = ({ teams, setTeam, player, setPlayer }) => {


  const [playerTeamId, setPlayerTeamId] = useState<string | undefined>(player.teamId);

  // const init = async () => {
  //   if (player !== null) {
  //     const res = await fetch(BASE_API + "/player/team", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({"playerId": player.playerId})
  //     });
  //     const data = await res.json();
  //     setPlayerTeamId((data.teamId !== "None") ? data.teamId : "");
  //   }
  // }

  // useEffect(() => {
  //   init();
  // }, [playerId]);
  return (
    <Box sx={{ width: '100' }}>
      <Grid container spacing={2} columns={12}>
          <Grid item xs={3}>
            Name
          </Grid>
          <Grid item xs={3}>
            Players
          </Grid>
          <Grid item xs={3}>
              Time
          </Grid>
          <Grid item xs={3}>
              Join
          </Grid>
      </Grid>
      <Stack spacing={2}>
        {teams.map((team: Team) => {
          return (
            <TeamRow 
              key={team.teamId}
              team={team}
              setTeam={setTeam}
              teamId={team.teamId}
              player={player}
              setPlayerTeamId={setPlayerTeamId}
              initCourt={team.court}
            />
          )
        })}
      </Stack>
    </Box>
  );
};

export default TeamQueue;