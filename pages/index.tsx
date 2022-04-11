import { useState } from 'react';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import TeamQueue from '../components/TeamQueue'
import CallNext from '../components/CallNext'

const Home: NextPage = () => {

  const initArray: Array<string> = [];
  const [teamIds, setTeamIds] = useState(initArray);
  const [inTeam, setInTeam] = useState<boolean>(false);
  const addTeam = (newTeam: string) => {
    const currTeam = [...teamIds];
    currTeam.push(newTeam);
    setTeamIds(currTeam);
  };

  return (
    <div className={styles.container}>
      <div className={styles.waitlist}>WAITLIST</div>
      <CallNext addTeam={addTeam}/>
      <TeamQueue teamIds={teamIds}/>
    </div>
  )
}

export default Home
