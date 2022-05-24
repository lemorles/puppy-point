import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createWalk } from "../actions/walkActions";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Text,
  Textarea,
  Select,
  Grid,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import PlacesAutocomplete from "react-places-autocomplete";
import { uploadImage } from "../utils/image";
import { useToastContext } from "../context/ToastContext";

const renderButtons = [
  { id: 1, name: "Monday-Morning", style: { order: 1 } },
  { id: 2, name: "Tuesday-Morning", style: { order: 1 } },
  { id: 3, name: "Wednesday-Morning", style: { order: 1 } },
  { id: 4, name: "Thursday-Morning", style: { order: 1 } },
  { id: 5, name: "Friday-Morning", style: { order: 1 } },
  { id: 6, name: "Saturday-Morning", style: { order: 1 } },
  { id: 7, name: "Sunday-Morning", style: { order: 1 } },
  { id: 8, name: "Monday-Afternoon", style: { order: 2 } },
  { id: 9, name: "Tuesday-Afternoon", style: { order: 2 } },
  { id: 10, name: "Wednesday-Afternoon", style: { order: 2 } },
  { id: 11, name: "Thursday-Afternoon", style: { order: 2 } },
  { id: 12, name: "Friday-Afternoon", style: { order: 2 } },
  { id: 13, name: "Saturday-Afternoon", style: { order: 2 } },
  { id: 14, name: "Sunday-Afternoon", style: { order: 2 } },
  { id: 15, name: "Monday-Evening", style: { order: 3 } },
  { id: 16, name: "Tuesday-Evening", style: { order: 3 } },
  { id: 17, name: "Wednesday-Evening", style: { order: 3 } },
  { id: 18, name: "Thursday-Evening", style: { order: 3 } },
  { id: 19, name: "Friday-Evening", style: { order: 3 } },
  { id: 20, name: "Saturday-Evening", style: { order: 3 } },
  { id: 21, name: "Sunday-Evening", style: { order: 3 } },
];

export default function NewWalkPage() {
  const colorModeValue = useColorModeValue;
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();
  const id = user ? user.id : 1;
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    location: "",
    description: "",
    price: "",
    userId: id,
    maxDogs: "",
    weekdays: [],
    image: "",
    castrated: "",
  });
  const [touched, setTouched] = useState({});
  const [address, setAddress] = React.useState("");
  const addToast = useToastContext();

  const handleSelect = (value) => {
    setAddress(value);
    setInput({
      ...input,
      location: value,
    });
    const { errors } = validate({
      ...input,
      location: value,
    });

    setErrors(errors);
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    const { errors } = validate({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(errors);
    setTouched({ ...touched, [e.target.name]: true });
  };

  //---------------------------------------------------------

  const handleChangeCheckboxes = (selected) => {
    const selectedCheckboxes = input.weekdays;
    const findIdx = selectedCheckboxes.indexOf(selected);

    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(selected);
    }

    setInput({
      ...input,
      weekdays: selectedCheckboxes,
    });

    const { errors } = validate({
      ...input,
      weekdays: selectedCheckboxes,
    });

    setErrors(errors);
    setTouched({ ...touched, weekdays: true });
  };

  //---------------------------------------------------------

  const handleFileInputChange = async (e) => {
    const image = await uploadImage(e.target.files[0]);

    setInput({ ...input, image });
    const { errors, touched } = validate({ ...input, image });
    setErrors(errors);
    setTouched({ ...touched, image: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { errors } = validate(input);

    if (Object.keys(errors).length) {
      const { errors, touched } = validate({
        ...input,
        [e.target.name]: e.target.value,
      });
      setErrors(errors);
      setTouched(touched);
    } else {
      dispatch(createWalk(input, history, "/home", addToast));
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack
        w={"full"}
        maxW={"md"}
        bg={colorModeValue("white", "gray.700")}
        justify="center"
        rounded={"xl"}
        boxShadow={"lg"}
        p={8}
        my={2}
      >
        <Heading fontSize={"4xl"} textAlign={"center"}>
          CREAR PASEO
        </Heading>

        <Stack spacing={4}>
          <FormControl isInvalid={touched.location && errors.location}>
            <FormLabel>Ubicación</FormLabel>
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  {/* <input */}
                  <Input
                    {...getInputProps({
                      placeholder: "Buscar ubicación...",
                    })}
                    // className={styles.inputSearch}
                    name="location"
                    type="text"
                  />

                  <div>
                    {loading ? <div>..Cargando</div> : null}

                    {suggestions.map((suggestion, index) => {
                      return (
                        <Text
                          key={`${suggestion}${index}`}
                          // className={styles.suggestions}
                          {...getSuggestionItemProps(suggestion)}
                        >
                          {suggestion.description}
                        </Text>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <FormErrorMessage>{errors.location}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={touched.description && errors.description}>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              resize={"vertical"}
              name="description"
              value={input.description}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.description}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={touched.price && errors.price}>
            <FormLabel>Precio</FormLabel>
            <Input
              type="text"
              name="price"
              value={input.price}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.price}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={touched.maxDogs && errors.maxDogs}>
            <FormLabel>Número máximo de perros por paseo</FormLabel>
            <Select
              placeholder="Cantidad"
              name="maxDogs"
              onChange={handleChange}
              value={input.maxDogs}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Select>

            <FormErrorMessage>{errors.maxDogs}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={touched.castrated && errors.castrated}>
            <FormLabel>Permite perros sin castrar</FormLabel>
            <Select
              placeholder="Permite"
              name="castrated"
              onChange={handleChange}
              value={input.castrated}
            >
              <option value="yes">Si</option>
              <option value="no">No</option>
            </Select>

            <FormErrorMessage>{errors.castrated}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={touched.image && errors.image}>
            <FormLabel>Imagen del Paseo</FormLabel>
            <Input
              name="image"
              type="file"
              onChange={handleFileInputChange}
              accept="image/*"
            />
            <FormErrorMessage>{errors.image}</FormErrorMessage>

            <Stack direction="row" align={"center"} justify={"center"}>
              {input.image && (
                <Image boxSize="200px" src={input.image} alt="paseo" />
              )}
            </Stack>
          </FormControl>
          <FormControl isInvalid={touched.weekdays && errors.weekdays}>
            <Grid
              templateColumns={"repeat(8, 1fr)"}
              templateRows={"repeat(4, auto)"}
              alignItems="center"
              justifyItems={"center"}
            >
              <Text>{""}</Text>
              <Text>L</Text>
              <Text>M</Text>
              <Text>M</Text>
              <Text>J</Text>
              <Text>V</Text>
              <Text>S</Text>
              <Text>D</Text>
              <Text style={{ order: 1 }}>Mañana</Text>
              <Text style={{ order: 2 }}>Tarde</Text>
              <Text style={{ order: 3 }}>Noche</Text>
              {renderButtons.map((button) => {
                return (
                  <input
                    key={button.id}
                    type="checkbox"
                    onChange={() => handleChangeCheckboxes(button.name)}
                    selected={input.weekdays.includes(button.name)}
                    style={button.style}
                    // bg={button.text ? "orange" : ""}
                    // _hover={{ bg: "orange" }}
                  />
                );
              })}
            </Grid>
            <FormErrorMessage>{errors.weekdays}</FormErrorMessage>
          </FormControl>
          <Stack spacing={6} align={"center"} justify={"center"}>
            <Button
              size="lg"
              bg={"orange.100"}
              color={"white"}
              _hover={{
                bg: "orange.400",
              }}
              onClick={handleSubmit}
            >
              Crear
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
}

function validate(input) {
  let errors = {};
  let touched = {};
  let regexNum = /^([0-9])*$/;

  if (!input.location.trim()) {
    errors.location = "La ubicacion es requerida";
    touched.location = true;
  }

  if (!input.description) {
    errors.description = "La descripción es requerida";
    touched.description = true;
  }

  if (!input.price) {
    errors.price = "El precio es requerido";
    touched.price = true;
  } else if (!regexNum.test(input.price)) {
    errors.price = "El precio debe ser numerio y mayor a 0";
    touched.price = true;
  }

  if (!input.maxDogs) {
    errors.maxDogs = "Se debe elegil como minimo 1 perro";
    touched.maxDogs = true;
  }

  if (!input.image) {
    errors.image = "La imagen es requerida";
    touched.image = true;
  }

  if (!input.weekdays.length) {
    errors.weekdays = "Debes seleccionar al menos un turno";
    touched.weekdays = true;
  }

  if (!input.castrated) {
    errors.castrated = "Se debe elegil si permite perros sin castrar";
    touched.castrated = true;
  }
  return { errors, touched };
}
