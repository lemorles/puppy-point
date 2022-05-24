import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyWalks } from "../actions/walkActions";
import WalkList from "./WalkList";
import { getUserById } from "../actions/userActions";
import { Button, Heading } from "@chakra-ui/react";
import { getNotifications } from "../actions/notificationsActions";

export default function HomeWalker() {
  const dispatch = useDispatch();
  const { walks } = useSelector((state) => state.walk);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) dispatch(getNotifications(user.id));
    if (user) dispatch(getUserById(user.id));
    if (user) dispatch(getMyWalks(user.id, ""));
  }, [dispatch, user]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <Heading as="h2" size="xl" mb="10px" mr="15px">
          Paseos ofrecidos
        </Heading>
        <Button
          as="a"
          variant={"link"}
          fontSize={"sm"}
          fontWeight={400}
          href={"/users/walks"}
          cursor="pointer"
        >
          Ver todos
        </Button>
      </div>
      <WalkList walks={walks.slice(0, 3)} />
    </>
  );
}
