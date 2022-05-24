import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogsByUser } from "../actions/dogActions";
import { getAllWalks } from "../actions/walkActions";
import { Button, Heading } from "@chakra-ui/react";
import WalkList from "./WalkList";
import DogList from "./DogList";
import { getNotifications } from "../actions/notificationsActions";
import { NavLink } from "react-router-dom";

export default function HomeOwner() {
  const dispatch = useDispatch();
  const { dogs } = useSelector((state) => state.dog);
  const { walks } = useSelector((state) => state.walk);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) dispatch(getNotifications(user.id));
    if (user) dispatch(getDogsByUser(user.id));
    if (user) dispatch(getAllWalks());
  }, [dispatch, user]);

  return (
    <>
      {/* dogs */}
      <div style={{ display: "flex" }}>
        <Heading as="h2" size="xl" mb="10px" mr="15px">
          Mis mascotas
        </Heading>

        <Button
          variant={"link"}
          fontSize={"sm"}
          fontWeight={400}
          cursor="pointer"
        >
          <NavLink to={"/users/dogs"}>Ver todas</NavLink>
        </Button>
      </div>
      <DogList dogs={dogs.slice(0, 3)} />

      {/* walks */}
      <div style={{ display: "flex" }}>
        <Heading as="h2" size="xl" mb="10px" mr="15px">
          Paseos cercanos
        </Heading>
        <Button
          as="a"
          variant={"link"}
          fontSize={"sm"}
          fontWeight={400}
          href={"/walks"}
          cursor="pointer"
        >
          Ver todos
        </Button>
      </div>
      <WalkList walks={walks.slice(0, 3)} />
    </>
  );
}
