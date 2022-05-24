import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ordenes from "./../components/Ordenes";
import {
  getOrderByUser,
  getAllOrders,
  getOrderFilter,
} from "../actions/orderActions";
import { getAcceptedReservesWalker } from "../actions/reserveActions";
import { getNotifications } from "../actions/notificationsActions";
import {
  Input,
  Box,
  Heading,
  Select,
  StylesProvider,
  Button,
  Stack,
} from "@chakra-ui/react";
import ReserveAccepted from "./../components/ReservesAccepted";
import { clearChat } from "../actions/chatActions";
import { RiFilterOffLine } from "react-icons/ri";
import Pagination from "react-js-pagination";

export default function CuentaCorriente() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const { reservesAccepted } = useSelector((state) => state.reserve);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const pageRange = 5;
  const [input, setInput] = useState({
    fullName: "",
    status: "",
  });

  useEffect(() => {
    if (user) dispatch(getNotifications(user.id));
    if (user?.role === "owner") {
      dispatch(getOrderByUser(user.id, ""));
    }
    if (user?.role === "walker") {
      dispatch(getAcceptedReservesWalker(user.id));
    }
    if (user?.role === "admin") {
      dispatch(getAllOrders());
    }
    // if (Object.keys(input).length) {
    //   dispatch(getOrderFilter(input));
    // }
    dispatch(clearChat());
  }, [dispatch, user]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "fullName") {
      return setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    } else {
      setInput((prevInput) => {
        const newInput = { ...prevInput, [e.target.name]: e.target.value };
        dispatch(getOrderFilter(newInput));
        return newInput;
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getOrderFilter(input));
  };

  const handleClickReset = (e) => {
    e.preventDefault();
    setInput((prevInput) => {
      const newInput = { status: "", fullName: "" };
      dispatch(getOrderFilter(newInput));
      return newInput;
    });
  };

  const applyPagination = (data) => {
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;

    return data.slice(firstIndex, lastIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <Heading as="h2" size="xl" mb="10px">
          {user?.role === "owner"
            ? "Mis compras"
            : user?.role === "admin"
            ? "Ordenes"
            : "Mis ventas"}
        </Heading>
      </div>

      <div>
        <ul>
          {user?.role === "owner" ? (
            <>
              {orders &&
                orders?.map((order) => {
                  return (
                    <Ordenes id={order.id} key={`${order.id}`} order={order} />
                  );
                })}
            </>
          ) : user?.role === "walker" ? (
            <>
              {reservesAccepted &&
                reservesAccepted?.map((reserve) => {
                  return (
                    <ReserveAccepted
                      id={reserve.id}
                      key={`${reserve.id}`}
                      reserve={reserve}
                    />
                  );
                })}{" "}
            </>
          ) : (
            <Box maxW="7xl" justifyContent={"center"}>
              <Stack
                spacing={{ base: 2, sm: 6 }}
                direction={{ base: "column", sm: "row" }}
                m={"20px"}
                align="center"
                justify={"center"}
              >
                <Select
                  borderColor="orange.500"
                  maxW="150px"
                  name="status"
                  value={input.status}
                  onChange={handleChange}
                  marginRight={"10px"}
                >
                  <option value={""}>Estado</option>
                  <option value={"pending"}>Pendiente</option>
                  <option value={"approved"}>Aprobado</option>
                  <option value={"rejected"}>Rechazados</option>
                </Select>
                <Box>
                  <Input
                    placeholder="Busca usuario..."
                    maxW="200px"
                    borderColor="orange.500"
                    type="text"
                    name="fullName"
                    value={input.fullName}
                    onChange={handleChange}
                    marginRight={"9px"}
                  />
                  <Button
                    onClick={handleSearch}
                    colorScheme="orange"
                    maxW="60px"
                    h="40px"
                    mb={1.5}
                  >
                    Buscar
                  </Button>
                </Box>

                <Box>
                  <button
                    className={StylesProvider.filter_clean}
                    onClick={handleClickReset}
                  >
                    <RiFilterOffLine title="Limpiar filtros" />
                  </button>
                </Box>
              </Stack>
              {orders &&
                orders?.map((order) => {
                  return (
                    <Ordenes
                      orders={applyPagination(orders)}
                      id={order.id}
                      key={`${order.id}`}
                      order={order}
                    />
                  );
                })}
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems="center"
                marginTop={"2em"}
              >
                {orders && orders.length > 0 && (
                  <Pagination
                    activeClass="activeLink"
                    activePage={currentPage}
                    itemsCountPerPage={recordPerPage}
                    totalItemsCount={orders && orders.length}
                    pageRangeDisplayed={pageRange}
                    onChange={handlePageChange}
                    firstPageText="<<"
                    prevPageText="<"
                    nextPageText=">"
                    lastPageText=">>"
                    color="white"
                  />
                )}
              </Box>
            </Box>
          )}
        </ul>
      </div>
    </>
  );
}
