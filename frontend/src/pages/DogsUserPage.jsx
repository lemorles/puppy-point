import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getDogsByUser,
  getDogs,
  deleteDogById,
  getBreeds,
  getDogById,
} from "../actions/dogActions";
import Pagination from "react-js-pagination";
import { useToastContext } from "../context/ToastContext";
import {
  Button,
  SimpleGrid,
  Text,
  Select,
  FormControl,
  Heading,
} from "@chakra-ui/react";
import s from "../styles/DogsCard.module.css";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { RiFilterOffLine } from "react-icons/ri";
import styles from "../styles/Post.module.css";

export default function DogsUserPage() {
  const dispatch = useDispatch();
  const { dogs, breeds } = useSelector((state) => state.dog);
  const { user } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const pageRange = 5;
  const [input, setInput] = useState({
    breed: "",
    gender: "",
    size: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(input);
    const query = urlParams.toString();

    if (user?.role === "owner") {
      dispatch(getDogsByUser(user.id, query));
    }

    if (user?.role === "admin") {
      dispatch(getDogs(query));
    }

    dispatch(getBreeds());
  }, [dispatch, user, input]);

  const handleChange = (e) => {
    setCurrentPage(1);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeAutocomplete = (e) => {
    setInput({
      ...input,
      breed: e.target.innerText,
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

  const handleClickReset = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setInput({
      breed: "",
      gender: "",
      size: "",
    });
  };

  return (
    <>
      <div>
        <Heading as="h2" size="xl" mb="80px">
          {user?.role === "admin" ? " Perros" : " Mis mascotas"}
        </Heading>
      </div>
      <div className={s.filters}>
        <Select
          placeholder="Género"
          borderColor="orange.500"
          maxW="150px"
          name="gender"
          value={input.gender}
          onChange={handleChange}
          mr="10px"
        >
          <option value={"F"}>Femenino</option>
          <option value={"M"}>Masculino</option>
        </Select>
        <Select
          placeholder="Tamaño"
          borderColor="orange.500"
          maxW="150px"
          name="size"
          value={input.size}
          onChange={handleChange}
          mr="10px"
        >
          <option value="small">Pequeño</option>
          <option value="medium">Mediano</option>
          <option value="large">Grande</option>
          <option value="giant">Muy grande</option>
        </Select>
        <FormControl maxW="200px" mr="10px">
          <AutoComplete openOnFocus>
            <AutoCompleteInput
              placeholder="Busca por raza..."
              autoComplete="off"
              variant="filled"
              name="breed"
              value={input.breed}
              onChange={handleChange}
              borderColor="orange.500"
              maxW="200px"
            />
            <AutoCompleteList>
              {breeds &&
                breeds.map((e) => (
                  <AutoCompleteItem
                    key={`option-${e.id}`}
                    value={e.name}
                    id={e.id}
                    textTransform="capitalize"
                    onClick={handleChangeAutocomplete}
                  >
                    {e.name}
                  </AutoCompleteItem>
                ))}
            </AutoCompleteList>
          </AutoComplete>
        </FormControl>
        <Button
          onClick={handleChange}
          colorScheme="orange"
          maxW="100px"
          mr="10px"
        >
          Buscar
        </Button>
        <button className={styles.filter__clean} onClick={handleClickReset}>
          <RiFilterOffLine title="Limpiar filtros" />
        </button>
      </div>
      {dogs && <DogListResume dogs={applyPagination(dogs)} />}

      <div className={s.paginacion}>
        {dogs && dogs.length > 0 && (
          <Pagination
            activeClass="activeLink"
            activePage={currentPage}
            itemsCountPerPage={recordPerPage}
            totalItemsCount={dogs && dogs.length}
            pageRangeDisplayed={pageRange}
            onChange={handlePageChange}
            firstPageText="<<"
            prevPageText="<"
            nextPageText=">"
            lastPageText=">>"
            color="white"
          />
        )}
      </div>
    </>
  );
}

function DogListResume({ dogs }) {
  return (
    <SimpleGrid columns={{ base: 1 }} spacing={{ base: 2, lg: 2 }}>
      {dogs &&
        dogs.map((w) => {
          return (
            <DogListResumeItem
              key={w.id}
              id={w.id}
              name={w.name}
              size={w.size}
              gender={w.gender}
              breed={w.breed}
              image={w.image}
            />
          );
        })}
    </SimpleGrid>
  );
}

function DogListResumeItem({ id, name, size, gender, breed, image }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const addToast = useToastContext();
  const { user } = useSelector((state) => state.user);
  const { dog } = useSelector((state) => state.dog);

  const handleDelete = () => {
    var opcion = window.confirm(`¿Estas seguro de eliminar a ${name}?`);
    if (opcion) {
      dispatch(deleteDogById(id, addToast));
    }
  };

  const handleEdit = () => {
    dispatch(getDogById(id));
    history.push(`/dogs/${id}/edit`);
  };

  useEffect(() => {
    if (dog) dispatch(getDogsByUser(user.id, ""));
  }, [dispatch, user, dog]);

  return (
    <div className={s.card}>
      <div className={s.id}>{id}</div>
      <img src={image} alt={`${name}`} className={s.image} />
      <div className={s.flexCard}>
        <div className={s.nameBreed}>
          <Text fontSize={"20px"} fontWeight={"bold"}>
            {name}
          </Text>
          <Text fontSize={"17px"} fontWeight={"normal"}>
            {breed?.name}
          </Text>
        </div>

        <div>
          <Text fontSize={"17px"} fontWeight={"normal"} mr="10px">
            <b>GENERO</b> {`${translateGender(gender)}`.toUpperCase()}
          </Text>
        </div>
        <div>
          <Text fontSize={"17px"} fontWeight={"normal"}>
            <b>TAMAÑO</b> {`${translateSize(size)}`.toUpperCase()}
          </Text>
        </div>
      </div>

      {user?.role === "admin" ? (
        <></>
      ) : (
        <>
          <Button
            width={"80px"}
            size={"sm"}
            bg="orange.100"
            onClick={(e) => handleEdit(e, id)}
            marginLeft={5}
          >
            Editar
          </Button>
          <Button
            width={"80px"}
            size={"sm"}
            bg="orange.100"
            onClick={(e) => handleDelete(e, id)}
            marginX={5}
          >
            Eliminar
          </Button>
        </>
      )}
    </div>
  );
}

const translateSize = (size) => {
  switch (size) {
    case "small":
      return "Pequeño";
    case "medium":
      return "Mediano";
    case "large":
      return "Grande";
    case "giant":
      return "Extra grande";
    default:
      break;
  }
};

const translateGender = (gender) => {
  switch (gender) {
    case "M":
      return "macho";
    case "F":
      return "hembra";
    default:
      break;
  }
};
