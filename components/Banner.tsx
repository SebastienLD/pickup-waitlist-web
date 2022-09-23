import { Team, Player, Item, getWaitTime } from '../components/constants';
import styles from '../styles/Home.module.css';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    player: Player | null;
    teams: Team[];
    setNameModalOpen: (nameModalOpen: boolean) => void;
}

const Banner: React.FC<Props> = ({ player, teams, setNameModalOpen }) => {

    return (
        <Item>
            <div className={styles.waitlist}>
                {(player !== null) ? "Hi, " + player.name : ""} <EditIcon fontSize="small" onClick={() => setNameModalOpen(true)}/>
                {` Wait Time ~ ${getWaitTime(teams)} minutes`}
            </div>
        </Item>
    )
};

export default Banner;

