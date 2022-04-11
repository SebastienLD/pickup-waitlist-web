import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TeamRow from './TeamRow';
//import styles from './TeamQueue.module.scss';

type Props = {
  teamIds: Array<string>;
};

const TeamQueue: React.FC<Props> = ({ teamIds }) => {

  const [inTeam, setInTeam] = useState<boolean>(false);

  return (
    <Box sx={{ width: '100' }}>
      <Grid container spacing={2} columns={12}>
          <Grid item xs={4}>
             Team Name
          </Grid>
          <Grid item xs={4}>
              # Players
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
            />
          )
        })}
      </Stack>
    </Box>
  );
};

export default TeamQueue;