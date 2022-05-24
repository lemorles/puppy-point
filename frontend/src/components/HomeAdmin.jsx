import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminDashCard from "./AdminDashCard";
import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { IoPawOutline } from "react-icons/io5";
import { getDogs } from "../actions/dogActions";
import { getAllReserves } from "../actions/reserveActions";
import { getAllWalks } from "../actions/walkActions";
import { getAllUsers } from "../actions/userActions";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Link } from "react-router-dom";
import {
  getAllUsersByChartRole,
  getAllWalksByChart,
  getDogsByChart,
} from "../actions/chartActions";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function HomeAdmin() {
  const dispatch = useDispatch();

  const allWalks = useSelector((state) => state.walk.walks);
  const allReserves = useSelector((state) => state.reserve.reserves);
  const allUsers = useSelector((state) => state.user.allUsers);
  const allDogs = useSelector((state) => state.dog.dogs);
  const { dataPieDogs, dataDoughnutRole, dataStackedBarWalk } = useSelector(
    (state) => state.chart
  );

  const options = {
    responsive: true,
    maintainAspecRatio: true,
  };
  const optionsBar = {
    responsive: true,
    plugins: {
      legend: false,
    },
  };

  const setingPieDogs = {
    labels: dataPieDogs.breedName,
    datasets: [
      {
        data: dataPieDogs.breedNum,
        backgroundColor: dataPieDogs.colors,
        color: useColorModeValue("gray.800", "white"),
      },
    ],
  };
  const setingDoughnutRole = {
    labels: dataDoughnutRole.roleName,
    datasets: [
      {
        data: dataDoughnutRole.roleNum,
        backgroundColor: dataDoughnutRole.colors,
        color: useColorModeValue("gray.800", "white"),
      },
    ],
  };
  const setingStackBarDays = {
    labels: [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ],
    datasets: [
      {
        data: dataStackedBarWalk.dayNum,
        backgroundColor: dataStackedBarWalk.colors,
      },
    ],
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getAllReserves());
    dispatch(getAllWalks());
    dispatch(getAllUsers());
    dispatch(getDogsByChart());
    dispatch(getAllUsersByChartRole());
    dispatch(getAllWalksByChart());
  }, [dispatch]);

  // console.log(allUsers);
  return (
    <>
      <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"left"}
          fontSize={"3xl"}
          py={4}
          fontWeight={"bold"}
        >
          Actividad
        </chakra.h1>
        <SimpleGrid
          mb={4}
          columns={{ base: 1, md: 4 }}
          spacing={{ base: 5, lg: 8 }}
        >
          <Link to="users/walks">
            <AdminDashCard
              name="PASEOS"
              number={allWalks ? allWalks.length : "0"}
              icon={<FiServer size={"3em"} />}
            />
          </Link>
          <Link to="ordenes">
            <AdminDashCard
              name="RESERVAS"
              number={allReserves ? allReserves.length : "0"}
              icon={<GoLocation size={"3em"} />}
            />
          </Link>
          <Link to="users">
            <AdminDashCard
              name="USUARIOS"
              number={allUsers ? allUsers.length : "0"}
              icon={<BsPerson size={"3em"} />}
            />
          </Link>
          <Link to="users/dogs">
            <AdminDashCard
              name="PERROS"
              number={allDogs ? allDogs.length : "0"}
              icon={<IoPawOutline size={"3em"} />}
            />
          </Link>
        </SimpleGrid>
      </Box>
      <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"left"}
          fontSize={"3xl"}
          py={4}
          fontWeight={"bold"}
        >
          Graficos
        </chakra.h1>
        <SimpleGrid
          mb={4}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 5, lg: 8 }}
        >
          <Stat
            px={{ base: 2, md: 5 }}
            py={"4"}
            shadow={"xl"}
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.800")}
            maxW={"100%"}
          >
            <Text
              color={useColorModeValue("gray.800", "white")}
              fontSize="30px"
              textAlign={"center"}
              mb="20px"
            >
              Razas de perros
            </Text>
            <Pie data={setingPieDogs} options={options} />
          </Stat>
          <Stat
            px={{ base: 2, md: 5 }}
            py={"4"}
            shadow={"xl"}
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.800")}
            maxW={"100%"}
          >
            <Text
              color={useColorModeValue("gray.800", "white")}
              fontSize="30px"
              textAlign={"center"}
              mb="20px"
            >
              Usuarios
            </Text>
            <Doughnut data={setingDoughnutRole} options={options} />
          </Stat>
          <Stat
            px={{ base: 2, md: 5 }}
            py={"4"}
            shadow={"xl"}
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.800")}
            maxW={"100%"}
          >
            <Text
              color={useColorModeValue("gray.800", "white")}
              fontSize="30px"
              textAlign={"center"}
              mb="20px"
            >
              Paseos por día
            </Text>
            <Bar data={setingStackBarDays} options={optionsBar} />
          </Stat>
        </SimpleGrid>
      </Box>
    </>
  );
}
