import React from "react";
import { Spinner } from "@chakra-ui/react";
import styles from "../styles/Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.wrapper}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="orange.100"
        size="xl"
      />
    </div>
  );
}
