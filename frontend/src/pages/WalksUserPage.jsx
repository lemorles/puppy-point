import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styles from "../styles/WalksPage.module.css";
import { getWalks, getMyWalks } from "../actions/walkActions";
import s from "../styles/WalksCard.module.css";
import {
  Heading,
  Select,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  Box,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { RiFilterOffLine } from "react-icons/ri";
import Pagination from "react-js-pagination";
import PlacesAutocomplete from "react-places-autocomplete";
import { normalize } from "../utils/location";
import Loader from "../components/Loader";

export default function WalksPage() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const history = useHistory();
  const urlParams = new URLSearchParams(search);
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState();
  const [touched, setTouched] = useState();
  const [filter, setFilter] = useState({
    shift: "",
    day: "",
    castrated: "all",
    order: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { walks, isLoading } = useSelector((state) => state.walk);
  const recordPerPage = 6;
  const pageRange = 5;

  useEffect(() => {
    setFilter((filter) => ({
      ...filter,
      shift: urlParams.get("shift"),
      day: urlParams.get("day"),
      castrated: urlParams.get("castrated") || "all",
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (user?.role === "walker") {
      dispatch(getMyWalks(user.id, search));
    }

    if (user?.role === "admin") {
      dispatch(getWalks(search));
    }
  }, [dispatch, search, user]);

  const addParams = (key, value) => {
    urlParams.set(key, value);
    history.replace({ search: urlParams.toString() });
  };

  const deleteParams = () => {
    if (search !== "") history.replace({ search: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input === "" || input === null) {
      const { errors, touched } = validate(input);
      setErrors(errors);
      setTouched(touched);
      return;
    }

    setCurrentPage(1);
    addParams("location", normalize(input));
  };

  const handleChange = (e) => {
    addParams(e.target.name, e.target.value);
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
    setCurrentPage(1);
  };

  const handleClickReset = (e) => {
    e.preventDefault();

    setInput("");
    setFilter({
      shift: "",
      day: "",
      castrated: "all",
      order: "",
    });
    deleteParams();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const applyPagination = (data) => {
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;

    return data.slice(firstIndex, lastIndex);
  };

  const handleSelect = (value, placeId) => {
    setInput(value);
  };

  const handleChangeAutocomplete = (value) => {
    setInput(value);
    const { errors, touched } = validate(value);
    setErrors(errors);
    setTouched(touched);
  };

  const handleChangeRadio = (value) => {
    setFilter({
      ...filter,
      castrated: value,
    });
    addParams("castrated", value);
    setCurrentPage(1);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div>
        <Heading as="h2" size="xl" mb="80px">
          {user?.role === "admin" ? " Paseos" : " Mis Paseos"}
        </Heading>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.perfilfield}>
          <FormControl isInvalid={touched && errors}>
            <PlacesAutocomplete
              value={input}
              onChange={handleChangeAutocomplete}
              onSelect={handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Busca tu ciudad...",
                    })}
                    className={styles.inputSearch}
                  />

                  <div>
                    {suggestions.map((suggestion, index) => {
                      return (
                        <div
                          key={`${suggestion}${index}`}
                          className={styles.suggestions}
                          {...getSuggestionItemProps(suggestion)}
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <FormErrorMessage>{errors}</FormErrorMessage>
            <Button
              colorScheme="orange"
              type="submit"
              w="100%"
              mb="3"
              mt="20px"
              size={"lg"}
            >
              Buscar
            </Button>
          </FormControl>
        </div>

        <div className={styles.filter__wrapper}>
          <div className={styles.filter__select}>
            <Select
              placeholder="Filtrar por día"
              name="day"
              value={filter.day || ""}
              onChange={handleChange}
              mb="3"
            >
              <option value="monday">Lunes</option>
              <option value="tuesday">Martes</option>
              <option value="wednesday">Miercoles</option>
              <option value="thursday">Jueves</option>
              <option value="friday">Viernes</option>
              <option value="saturday">Sabado</option>
              <option value="sunday">Domingo</option>
            </Select>
          </div>
          <div className={styles.filter__select}>
            <Select
              placeholder="Filtrar por turno"
              name="shift"
              value={filter.shift || ""}
              onChange={handleChange}
              mb="3"
            >
              <option value="morning">Mañana</option>
              <option value="afternoon">Tarde</option>
              <option value="evening">Noche</option>
            </Select>
          </div>
          <div className={styles.filter__switch}>
            <FormLabel display={"flex"} alignItems="center" m="0" mr="2">
              ¿Aceptan sin castrar?
            </FormLabel>
            <Stack spacing={5} direction="row" mt="1">
              <RadioGroup
                onChange={handleChangeRadio}
                value={filter.castrated}
                name="castrated"
              >
                <Radio colorScheme="orange" value="all" mr="2">
                  Todos
                </Radio>
                <Radio colorScheme="orange" value="yes" mr="2">
                  Sí
                </Radio>
                <Radio colorScheme="orange" value="no" mr="2">
                  No
                </Radio>
              </RadioGroup>
            </Stack>
          </div>
          <Select
            placeholder="Precio"
            name="order"
            value={filter.order || ""}
            onChange={handleChange}
          >
            <option value={"ASC"}>Economico</option>
            <option value={"DESC"}>Caro</option>
          </Select>
        </div>
      </form>

      <div className={styles.results__wrapper}>
        <Heading as="h1" size="md">
          {walks && walks.length ? walks.length : 0} resultados encontrados
        </Heading>
        <button className={styles.filter__clean} onClick={handleClickReset}>
          <RiFilterOffLine title="Limpiar filtros" />
        </button>
      </div>
      <Box mb="20px">
        <WalkUserList walks={applyPagination(walks)} />
      </Box>
      {walks && walks.length > 0 && (
        <Pagination
          activeClass="activeLink"
          activePage={currentPage}
          itemsCountPerPage={recordPerPage}
          totalItemsCount={walks && walks.length}
          pageRangeDisplayed={pageRange}
          onChange={handlePageChange}
          firstPageText="<<"
          prevPageText="<"
          nextPageText=">"
          lastPageText=">>"
          color="white"
        />
      )}
    </>
  );
}

// MAPEO DE PASEOS
export function WalkUserList({ walks }) {
  return (
    <SimpleGrid columns={{ base: 1 }} spacing={{ base: 2, lg: 2 }}>
      {walks &&
        walks.map((w) => {
          return (
            <WalkUserItem
              key={w.id}
              id={w.id}
              location={w.location}
              image={w.image}
              price={w.price}
              walker={w.user}
            />
          );
        })}
    </SimpleGrid>
  );
}

// CARD DE PASEOS DESIGN
export function WalkUserItem({ id, location, image, price, walker }) {
  return (
    <>
      <div className={s.card}>
        <div className={s.id}>
          <Text textAlign={"center"} fontWeight="bold">
            {id}
          </Text>
        </div>
        <div className={s.cardWalk}>
          <div className={s.flexCard}>
            <img src={image} alt={image} className={s.image} />
            <Text
              fontSize={"17px"}
              fontWeight={"bold"}
              textAlign="start"
              ml="20px"
            >
              PASEO EN {location?.split(",")[0].toUpperCase()}
            </Text>
          </div>

          <div className={s.flexCardWalk}>
            <img src={walker?.image} alt={walker?.name} className={s.image} />
            <div>
              <Text fontSize={"17px"} fontWeight={"bold"}>
                {walker?.firstName.toUpperCase()}
              </Text>
              <Text fontSize={"17px"} fontWeight={"bold"}>
                {walker?.lastName.toUpperCase()}
              </Text>
            </div>
            <Text fontSize={"17px"} fontWeight={"normal"}>
              ${price}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}

const validate = (input) => {
  let errors = "";
  let touched = "";

  if (input === "" || input === null) {
    errors = "La ciudad es requerida";
    touched = true;
  }

  return { errors, touched };
};
