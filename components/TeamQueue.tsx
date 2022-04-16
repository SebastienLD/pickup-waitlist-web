import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TeamRow from './TeamRow';
//import styles from './TeamQueue.module.scss';

type Props = {
  teamIds: Array<string>;
  BASE_API: string;
  playerId: string;
};

const TeamQueue: React.FC<Props> = ({ teamIds, BASE_API, playerId }) => {

  const [playerTeamId, setPlayerTeamId] = useState<string>("");

  const init = async () => {
    if (playerId !== "") {
      const res = await fetch(BASE_API + "/player/team", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"playerId": playerId})
      });
      const data = await res.json();
      setPlayerTeamId((data.teamId !== "None") ? data.teamId : "");
    }  
  }

  useEffect(() => {
    init();
  }, [playerId]);

  return (
    <Box sx={{ width: '100' }}>
      <Grid container spacing={2} columns={15}>
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
              Court
          </Grid>
          <Grid item xs={3}>
              Join
          </Grid>
      </Grid>
      <Stack spacing={2}>
        {teamIds.map((teamId: string) => {
          return (
            <TeamRow 
              key={teamId}
              teamId={teamId}
              BASE_API={BASE_API}
              playerId={playerId}
              playerTeamId={playerTeamId}
              setPlayerTeamId={setPlayerTeamId}
            />
          )
        })}
      </Stack>
    </Box>
  );
};

export default TeamQueue;