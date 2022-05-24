import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Dog.module.css";

export default function Dog({ id, name, image, size, breed, gender, path }) {
  if (path === "/home-owner") {
    return (
      <li>
        <Link to={`/dogs/${id}`} className={styles.card}>
          <img src={image} alt="dog" className={styles.imageWalk} />
          <div className={styles.userWrapper}>
            <p className={styles.name}>{name}</p>
            <p className={styles.breed}>{breed}</p>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <li className={styles.card}>
      <img src={image} alt="dog" className={styles.imageWalk} />
      <p>{name}</p>
      <p>{breed}</p>
      <p>{size}</p>
      <p>{gender}</p>
    </li>
  );
}
