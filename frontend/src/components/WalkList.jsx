import WalkItem from "./WalkItem";
import styles from "../styles/WalkList.module.css";

export default function WalkList({ walks }) {
  return (
    <ul className={styles.listWalks}>
      {walks &&
        walks.map((w) => {
          return (
            <WalkItem
              key={w.id}
              id={w.id}
              location={w.location}
              description={w.description}
              image={w.image}
              price={w.price}
              walker={w.user}
              weekdays={w.weekdays}
            />
          );
        })}
    </ul>
  );
}
