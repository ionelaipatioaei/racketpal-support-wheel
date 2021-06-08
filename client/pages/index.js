import axios from "axios";
import moment from "moment";

import styles from "../styles/Home.module.css";

import Calendar from "../components/CustomCalendar";

function Home({ schedule }) {
  // NOTE: Moment picks a date which is one day ahead so subtracting 1 day pick the correct turn
  const dateToCheckFor = Date.now() - 1000 * 60 * 60 * 24;
  let nearestDate;

  schedule.schedule.forEach(date => {
    let diff = moment(date.start).diff(moment(dateToCheckFor), "days");
    if (diff > 0) {
      if (nearestDate) {
        if (moment(date.start).diff(moment(nearestDate), "days") < 0) {
          nearestDate = date;
        }
      } else {
        nearestDate = date;
      }
    }
  });

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1>RacketPal - Support Wheel of Fate</h1>
        <h2>Next: {nearestDate.engineer}</h2>
      </nav>
      <div className={styles.calendar}>
        <Calendar data={schedule} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await axios.get(`${process.env.API_ENDPOINT}/schedule/now`);
  return {
    props: {
      schedule: res.data
    }
  };
}

export default Home;