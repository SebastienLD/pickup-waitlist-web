import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TeamRow from './TeamRow';
//import styles from './TeamQueue.module.scss';

type Props = {
  teamIds: Array<string>;
  BASE_API: string;
};

const TeamQueue: React.FC<Props> = ({ teamIds, BASE_API }) => {

  const [inTeam, setInTeam] = useState<boolean>(false);

  return (
    <Box sx={{ width: '100' }}>
      <Grid container spacing={2} columns={16}>
          <Grid item xs={4}>
            Name
          </Grid>
          <Grid item xs={4}>
              # Players
          </Grid>
          <Grid item xs={4}>
              Time
          </Grid>
          <Grid item xs={4}>
              Join Team
          </Grid>
      </Grid>
      <Stack spacing={2}>
        {teamIds.map((teamId: string) => {
          return (
            <TeamRow 
              key={teamId}
              teamId={teamId}
              inTeam={inTeam}
              handleInTeamChange={setInTeam}
              BASE_API={BASE_API}
            />
          )
        })}
      </Stack>
    </Box>
  );
};

export default TeamQueue;