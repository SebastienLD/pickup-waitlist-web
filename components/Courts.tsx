import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
//import styles from './Courts.module.scss';

type Props = {
  teamIds: Array<string>;
  BASE_API: string;
  courtOneTeams: Array<string>;
  courtTwoTeams: Array<string>;
  courtThreeTeams: Array<string>;
  addTeamToCourt: (court: number, teamId: string) => void;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Courts: React.FC<Props> = ({ teamIds, BASE_API, courtOneTeams, courtTwoTeams, courtThreeTeams, addTeamToCourt }) => {

  interface Team {
    name: string;
    numPlayers: number;
  }

  interface TeamId {
    id: string;
  }

  const getCourt = async (court: number) => {
    const res = await fetch(BASE_API + "/court/get", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"court": court}),
    });
    const data = await res.json();
    data.teamIds.map((teamId: TeamId) => {
      addTeamToCourt(court, teamId.id);
    });
  }

  useEffect(() => {
    getCourt(1);
    getCourt(2);
    getCourt(3);
  }, []);

  return (
      <Grid container spacing={2} columns={12}>
          
          <Grid item xs={4}>
            <Item>
            <Grid>{courtOneTeams.length > 0 ? courtOneTeams[0] : "No Team"} vs.</Grid>
            <Grid>{courtOneTeams.length > 1 ? courtOneTeams[1] : "No Team"}</Grid>
            </Item>
          </Grid>
          
         
          <Grid item xs={4}> 
            <Item>
            <Grid>{courtTwoTeams.length > 0 ? courtTwoTeams[0] : "No Team"} vs.</Grid>
            <Grid>{courtTwoTeams.length > 1 ? courtTwoTeams[1] : "No Team"}</Grid>
            </Item>
          </Grid>
         
        
          <Grid item xs={4}>
            <Item>
            <Grid>{courtThreeTeams.length > 0 ? courtThreeTeams[0] : "No Team"} vs.</Grid>
            <Grid>{courtThreeTeams.length > 1 ? courtThreeTeams[1] : "No Team"}</Grid>
            </Item>
          </Grid>
         
    </Grid>
  )
};

export default Courts;