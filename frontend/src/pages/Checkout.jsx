import React, { useEffect } from "react";
import Order from "./../components/Order";
import { useToastContext } from "../context/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import { /* useParams, */ useHistory, NavLink } from "react-router-dom";
import { getNotifications } from "../actions/notificationsActions";
import {
  getPendingReservesOwner,
  payOrder,
  updateOrderStatus,
} from "../actions/reserveActions";
import { FaArrowRight } from "react-icons/fa";
import {
  Button,
  Center,
  Spinner,
  Heading,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";

export default function Payment() {
  const addToast = useToastContext();
  const dispatch = useDispatch();
  const history = useHistory();
  const { orderId } = useSelector((state) => state.reserve);
  const { user } = useSelector((state) => state.user);
  const urlParams = new URLSearchParams(window.location.search);
  const payment_id = urlParams.get("payment_id");
  const status = urlParams.get("status");
  const collectionId = urlParams.get("collection_id");

  const payload = {
    payment_id,
    status,
    user,
    orderId,
  };

  useEffect(() => {
    console.log("checkout");
    if (user) dispatch(getNotifications(user.id));
    if (payload?.status === "approved") {
      dispatch(updateOrderStatus(payload, history, "/miscompras", addToast));
    }
    if (payload?.status === "rejected") {
      dispatch(updateOrderStatus(payload, history, "/checkout", addToast));
    }
    if (payload?.status === "pending") {
      dispatch(updateOrderStatus(payload, history, "/checkout", addToast));
    }
    if (payload?.status === "in_process") {
      dispatch(updateOrderStatus(payload, history, "/checkout", addToast));
    }

    if (collectionId && collectionId === "null") history.push("/checkout");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      {payment_id?.length > 0 ? (
        <Stack justify="center" p={6} my={2}>
          <Center py={6}>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Estamos procesando su pago
            </Heading>
          </Center>
          <Center py={6}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="orange.100"
              size="xl"
            />
          </Center>
        </Stack>
      ) : (
        <Checkout />
      )}
    </>
  );
}

function Checkout() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const { reservesPending } = useSelector((state) => state.reserve);

  const totalAmount = reservesPending
    ?.map((item) => item.walk.price * parseInt(item.dogCount))
    .reduce((prev, curr) => prev + parseInt(curr), 0);

  const reserves = reservesPending.map((reserve) => reserve.id);
  const payload = { totalAmount, user, reserves };

  useEffect(() => {
    if (user) dispatch(getPendingReservesOwner(user.id));
  }, [dispatch, user]);

  const handlePay = (e) => {
    e.preventDefault();
    if (reservesPending) dispatch(payOrder(payload, history));
  };

  return (
    <>
      <div>
        <Heading as="h2" size="xl" mb="10px">
          Checkout
        </Heading>
      </div>

      <Order />

      {reservesPending?.length > 0 ? (
        <></>
      ) : (
        <>
          <Stack
            w={{ sm: "full", md: "full" }}
            height={{ sm: "full", md: "full" }}
            direction={{ base: "column", md: "column" }}
            justify="space-between"
            textAlign="center"
            fontSize="4x1"
          >
            <Text
              mt={20}
              fontSize="lg"
              textTransform={"uppercase"}
              fontWeight={900}
              letterSpacing={1}
            >
              EL CARRITO ESTA VACIO
            </Text>
            <NavLink to="/walks">
              <Button mt={10} width="200px" colorScheme="blue">
                Seguir comprando
              </Button>
            </NavLink>
          </Stack>
        </>
      )}

      {reservesPending?.length > 0 ? (
        <Flex
          width="full"
          direction={{ base: "column", md: "column" }}
          alignItems={"center"}
          rounded={"lg"}
        >
          <Heading
            textTransform={"uppercase"}
            fontWeight={500}
            fontSize="4x1"
            margin={2}
          >
            TOTAL $ {totalAmount} .-
          </Heading>

          <Flex
            width="full"
            direction={{ base: "column", md: "row" }}
            justify="space-around"
            rounded={"lg"}
            alignItems={"center"}
          >
            <NavLink to="/walks">
              <Button
                mt={2}
                width="200px"
                mh="20px"
                fontSize="md"
                colorScheme="blue"
              >
                Seguir comprando
              </Button>
            </NavLink>
            <Button
              mt={2}
              width="200px"
              colorScheme="blue"
              onClick={handlePay}
              fontSize="md"
              rightIcon={<FaArrowRight />}
            >
              Confirmar compra
            </Button>
          </Flex>
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
}
