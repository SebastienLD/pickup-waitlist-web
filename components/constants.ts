import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

//export const BASE_API = "http://localhost:5000";
//export const BASE_API = "http://172.20.10.2:5000";
export const BASE_API = "http://ec2-54-241-202-168.us-west-1.compute.amazonaws.com";


export interface Player {
    playerId: string;
    name: string;
    teamId?: string;
    created: string;
}

export interface Team {
    teamId: string;
    teamName: string;
    created: string;
    court: number;
    players: Player[];
}

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

export const getWaitTime = (teams: Team[]) => {
    let courtOneTeams: Team[] = [];
    let courtTwoTeams: Team[] = [];
    let courtThreeTeams: Team[] = [];
    teams.map((team: Team) => {
        if (team.court === 1) {
            courtOneTeams.push(team);
        } else if (team.court === 2) {
            courtTwoTeams.push(team);
        } else if (team.court === 3) {
            courtThreeTeams.push(team);
        }
    })
    const minTeams = Math.min(
        courtOneTeams.length,
        courtTwoTeams.length,
        courtThreeTeams.length
    )
    return (minTeams > 1) ? (minTeams - 1) * 20 : 0;
} 