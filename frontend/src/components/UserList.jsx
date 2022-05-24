import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editRol,
  getAllUsers,
  getUsersByName,
  editUserStatus,
  ResetPasswordAdmin,
} from "../actions/userActions";
import { useToastContext } from "../context/ToastContext";
import UsersCard from "./UsersCard";
import {
  Box,
  chakra,
  SimpleGrid,
  Input,
  Button,
  Select,
  Stack,
} from "@chakra-ui/react";
import { RiFilterOffLine } from "react-icons/ri";
import Pagination from "react-js-pagination";

export default function UserList() {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const pageRange = 5;

  const [input, setInput] = useState({
    fullName: "",
    role: "",
    order: "ASC",
  });

  useEffect(() => {
    if (Object.keys(input).length) {
      dispatch(getUsersByName(input));
    }
  }, [dispatch, input]);

  const handleChange = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    if (e.target.name === "fullName") {
      return setInput({ ...input, [e.target.name]: e.target.value });
    }
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.fullName === "") {
      dispatch(getAllUsers());
    } else if (input.fullName) {
      dispatch(getUsersByName(input));
    }
  };

  const handleClickReset = (e) => {
    e.preventDefault();

    setInput({
      fullName: "",
      role: "",
      order: "ASC",
    });
  };

  const applyPagination = (data) => {
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;

    return data.slice(firstIndex, lastIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // call API to get data based on pageNumber
  };

  return (
    <Box maxW="7xl" justifyContent={"center"}>
      <chakra.h1
        textAlign={"left"}
        fontSize={"3xl"}
        fontWeight={"bold"}
        mb="20px"
      >
        Usuarios
      </chakra.h1>
      <Stack
        spacing={{ base: 2, sm: 6 }}
        direction={{ base: "column", sm: "row" }}
        marginBottom={"20px"}
        align="center"
        justify={"center"}
      >
        <Select
          borderColor="orange.500"
          maxW="150px"
          name="order"
          value={input.order}
          onChange={handleChange}
        >
          <option value={"ASC"}>A-Z</option>
          <option value={"DESC"}>Z-A</option>
        </Select>
        <Select
          borderColor="orange.500"
          maxW="150px"
          name="role"
          value={input.role}
          onChange={handleChange}
        >
          <option value={""}>Rol</option>
          <option value={"admin"}>ADMIN</option>
          <option value={"owner"}>OWNER</option>
          <option value={"walker"}>WALKER</option>
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
        <button onClick={handleClickReset}>
          <RiFilterOffLine title="Limpiar filtros" />
        </button>
      </Stack>

      {allUsers && (
        <UsersList allUsers={applyPagination(allUsers)} input={input} />
      )}
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems="center"
        marginTop={"2em"}
      >
        {allUsers && allUsers.length > 0 && (
          <Pagination
            activeClass="activeLink"
            activePage={currentPage}
            itemsCountPerPage={recordPerPage}
            totalItemsCount={allUsers && allUsers.length}
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
  );
}

function UsersList({ allUsers, input }) {
  const addToast = useToastContext();
  const dispatch = useDispatch();

  const handleSet = (e, id) => {
    e.preventDefault();
    dispatch(editRol(id, { role: "admin" }));
    dispatch(getUsersByName(input));
  };

  const handleUnset = (e, id) => {
    e.preventDefault();
    dispatch(editRol(id, { role: "owner" }));
    dispatch(getUsersByName(input));
  };

  const handleActive = (e, id) => {
    e.preventDefault();
    dispatch(editUserStatus(id, { status: "active" }, addToast));
    dispatch(getUsersByName(input));
  };

  const handleLocked = (e, id) => {
    e.preventDefault();
    dispatch(editUserStatus(id, { status: "locked" }, addToast));
    dispatch(getUsersByName(input));
  };

  const handleResetPassword = (e, email) => {
    e.preventDefault();
    dispatch(ResetPasswordAdmin(email, addToast));
    dispatch(getUsersByName(input));
  };

  return (
    <SimpleGrid columns={{ base: 1 }} spacing={{ base: 2, lg: 2 }}>
      {allUsers?.map((u) => {
        return (
          <UsersCard
            key={u.id}
            id={u.id}
            name={`${u.firstName} ${u.lastName}`}
            email={u.email}
            role={u.role}
            image={u.image}
            status={u.status}
            handleSet={handleSet}
            handleUnset={handleUnset}
            handleActive={handleActive}
            handleLocked={handleLocked}
            handleResetPassword={handleResetPassword}
          />
        );
      })}
    </SimpleGrid>
  );
}
