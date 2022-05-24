import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styles from "../styles/WalksPage.module.css";
import { getWalks } from "../actions/walkActions";
import WalkList from "../components/WalkList";
import {
  Heading,
  Select,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { RiFilterOffLine } from "react-icons/ri";
import Navbar from "../components/Navbar";
import Pagination from "react-js-pagination";
import PlacesAutocomplete from "react-places-autocomplete";
import { setLocation, setPlaceId } from "../actions/locationActions";
import Loader from "../components/Loader";
import Location from "../components/Location";
import { getLocationWithPlaceId } from "../utils/location";

export default function WalksPage() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const history = useHistory();
  const urlParams = new URLSearchParams(search);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState({
    shift: "",
    day: "",
    castrated: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { walks, walksRecommended, isLoading } = useSelector(
    (state) => state.walk
  );
  const { province, compound, lat, compoundLatLng } = useSelector(
    (state) => state.location
  );
  const recordPerPage = 6;
  const pageRange = 5;

  useEffect(() => {
    setFilter((filter) => ({
      ...filter,
      shift: urlParams.get("shift"),
      day: urlParams.get("day"),
      castrated: urlParams.get("castrated") || "all",
    }));

    setInput(compound || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    dispatch(getWalks(search, province));
  }, [dispatch, search, province]);

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
      return;
    }

    setCurrentPage(1);
    addParams("location", input);
    // dispatch(getWalks(search, province));
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
    });
    deleteParams();
    dispatch(setPlaceId(null));
    dispatch(
      setLocation({ city: null, province: null, country: null, compound: null })
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const applyPagination = (data) => {
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;

    return data.slice(firstIndex, lastIndex);
  };

  const handleSelect = async (value, placeId) => {
    setInput(value);
    dispatch(setPlaceId(placeId));

    const location = await getLocationWithPlaceId(placeId);
    dispatch(setLocation(location));
  };

  const handleChangeRadio = (value) => {
    setFilter({
      ...filter,
      castrated: value,
    });
    addParams("castrated", value);
    setCurrentPage(1);
  };

  const handleClickLocation = (compound) => {
    setInput(compound);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <Heading as="h1" size="xl" mb="10">
          Encontrá los paseos disponibles.
        </Heading>
        {lat && (
          <Location onClick={handleClickLocation} compound={compoundLatLng} />
        )}
        <div className={styles.containerSignun}>
          <div className={styles.boxSignun}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.perfilfield}>
                <FormControl>
                  <PlacesAutocomplete
                    value={input}
                    onChange={setInput}
                    onSelect={handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                    }) => (
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
              </div>
            </form>
          </div>
        </div>
        <div className={styles.results__wrapper}>
          <Heading as="h1" size="md">
            {walks && walks.length ? walks.length : 0} resultados encontrados
          </Heading>
          <button className={styles.filter__clean} onClick={handleClickReset}>
            <RiFilterOffLine title="Limpiar filtros" />
          </button>
        </div>
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
          />
        )}

        {walks && <WalkList walks={applyPagination(walks)} />}

        {walksRecommended && (
          <>
            <Heading as="h2" size="lg" mb="15px">
              {province &&
                `Paseos cerca de ${province.replace(/\b\w/g, (l) =>
                  l.toUpperCase()
                )}`}
            </Heading>
            <WalkList walks={walksRecommended.slice(0, 7)} />
          </>
        )}
      </div>
    </>
  );
}
