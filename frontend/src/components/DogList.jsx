import DogItem from "./DogItem";
import s from "../styles/WalkList.module.css";

export default function DogList({ dogs }) {
  return (
    <ul className={s.listWalks}>
      {dogs &&
        dogs.map((w) => {
          return (
            <DogItem
              key={w.id}
              id={w.id}
              name={w.name}
              size={w.size}
              gender={w.gender}
              breed={w.breed}
              image={w.image}
              castrated={w.castrated}
            />
          );
        })}
    </ul>
  );
}
