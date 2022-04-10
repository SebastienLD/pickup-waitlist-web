import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
//import styles from './TeamQueue.module.scss';

type Props = {
  teamIds: Array<string>;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TeamQueue: React.FC<Props> = ({ teamIds }) => {

  return (
    <Box sx={{ width: '100' }}>
      <Stack spacing={2}>
        {teamIds.map((teamId) => {
          return <Item key={teamId}>{teamId}</Item>
        })}
      </Stack>
    </Box>
  );
};

export default TeamQueue;