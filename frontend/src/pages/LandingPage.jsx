import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../styles/Landing.module.css";
import { selectOptionRegister } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import hero from "../assets/hero.webp";
import hire from "../assets/hire.jpg";
import earn from "../assets/earn.jpg";
import gym from "../assets/gym.jpg";
import sociability from "../assets/sociability.jpg";
import routine from "../assets/routine.jpg";
import find from "../assets/find.png";
import star from "../assets/star.png";
import security from "../assets/security.png";
import camera from "../assets/camera.png";
import passion from "../assets/passion.png";
import ball from "../assets/ball.jpg";
import { Heading, Text, Button } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import PlacesAutocomplete from "react-places-autocomplete";
import { setLocation, setPlaceId } from "../actions/locationActions";
import { getLocationWithPlaceId } from "../utils/location";
import Location from "../components/Location";

export default function Landing() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState("");
  const { compoundLatLng, lat, placeId } = useSelector(
    (state) => state.location
  );

  const handleSelect = (value, placeId) => {
    setInput(value);
    dispatch(setPlaceId(placeId));
  };

  const handleRegister = (e, option) => {
    e.preventDefault();

    dispatch(selectOptionRegister(option));
    history.push("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.length) {
      if (!lat) {
        // dispatch(setPlaceId(place_id));
      } else {
        dispatch(setPlaceId(placeId));
      }

      // const search = normalize(input);
      // return history.push(`/walks?location=${search}`);
      const location = await getLocationWithPlaceId(placeId);
      dispatch(setLocation(location));
      return history.push(`/walks?location=${input}`);
    }

    // dispatch(setPlaceId(null));
    history.push("/walks");
  };

  const handleClickLocation = (compound) => {
    setInput(compound);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <Navbar />
      </header>
      <main>
        <section className={styles.hero}>
          <div className={styles.hero__content}>
            <Heading as="h1" size="3xl">
              Sácalos a la felicidad
            </Heading>
            <Text fontSize="md" marginTop={3}>
              Los perros felices hacen felices a los dueños.
            </Text>
            {lat && (
              <Location
                onClick={handleClickLocation}
                compound={compoundLatLng}
              />
            )}
            <PlacesAutocomplete
              value={input}
              onChange={setInput}
              onSelect={handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <div>
                  <input
                    {...getInputProps({ placeholder: "Busca tu ciudad..." })}
                    className={styles.inputSearch}
                  />

                  <div>
                    {suggestions.map((suggestion) => {
                      return (
                        <div
                          key={suggestion.placeId}
                          className={styles.suggestions}
                          id={suggestion.placeId}
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
              size="lg"
              isFullWidth={true}
              marginTop={5}
              onClick={handleSubmit}
            >
              Buscar
            </Button>
          </div>
          <img className={styles.heroImg} src={hero} alt="portada" />
        </section>

        <section className={styles.how}>
          <div className={styles.wrapper__how}>
            <div className={styles.how__content}>
              <div className={styles.how__content_wrapper}>
                <Heading as="h2" size="2xl">
                  ¿Cómo funciona PuppyPoint?
                </Heading>
                <Text fontSize="md" marginTop={5}>
                  Publica tu búsqueda y rápidamente comenzarás a recibir
                  propuestas de paseadores dispuestos a brindar el servicio.
                  Elige el que más te guste y contrátalo online de manera
                  segura.
                </Text>
              </div>
              <img src={ball} alt="perro" className={styles.how__content_img} />
            </div>
            <div className={styles.how__cardlist}>
              <div className={styles.how__carditem}>
                <img src={find} height="40px" alt="icon" />
                <Heading as="h2" size="xl" className={styles.color__orange}>
                  Encuentra
                </Heading>
                <Text fontSize="md" marginTop={2} textAlign="center">
                  Paseadores y cuidadores calificados en tu zona.
                </Text>
              </div>
              <div className={styles.how__carditem}>
                <img src={star} height="40px" alt="icon" />
                <Heading as="h2" size="xl" className={styles.color__orange}>
                  Contrata
                </Heading>
                <Text fontSize="md" marginTop={2} textAlign="center">
                  Elige días y horarios de acuerdo a tus necesidades.
                </Text>
              </div>
              <div className={styles.how__carditem}>
                <img src={security} height="40px" alt="icon" />
                <Heading as="h2" size="xl" className={styles.color__orange}>
                  Garantizado
                </Heading>
                <Text fontSize="md" marginTop={2} textAlign="center">
                  Si no estás conforme con la persona elegida te devolvemos el
                  dinero.
                </Text>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.why}>
          <div className={styles.why__content}>
            <Heading as="h2" size="2xl">
              ¿Le estas dando a tu perro lo que necesita?
            </Heading>
            <Text fontSize="md" marginTop={5}>
              El paseo diario es una actividad fundamental para la calidad de
              vida de tu perro.
            </Text>
          </div>

          <div className={styles.why__cardlist}>
            <div className={styles.why__carditem}>
              <img src={gym} className={styles.whyImg} alt="ejercicio" />
              <Heading as="h2" size="xl" className={styles.color__orange}>
                Ejercicio
              </Heading>
              <Text
                fontSize="md"
                marginTop={2}
                textAlign="center"
                className={styles.why__carditem_desc}
              >
                Un perro sin gym tiene energía de sobra, y salir sólo para usar
                el baño no es suficiente.
              </Text>
            </div>
            <div className={styles.why__carditem}>
              <img
                src={sociability}
                className={styles.whyImg}
                alt="sociabilidad"
              />
              <Heading as="h2" size="xl" className={styles.color__orange}>
                Sociabilidad
              </Heading>
              <Text
                fontSize="md"
                marginTop={2}
                textAlign="center"
                className={styles.why__carditem_desc}
              >
                Muchos problemas de conducta y salud de los perros se deben a
                que pasan muchas horas en soledad.
              </Text>
            </div>
            <div className={styles.why__carditem}>
              <img src={routine} className={styles.whyImg} alt="rutina" />
              <Heading as="h2" size="xl" className={styles.color__orange}>
                Rutina
              </Heading>
              <Text
                fontSize="md"
                marginTop={2}
                textAlign="center"
                className={styles.why__carditem_desc}
              >
                Mantener una rutina diaria significa mejor comportamiento y
                mayor inteligencia para tu perro.
              </Text>
            </div>
          </div>
        </section>

        <section className={styles.hire}>
          <div className={styles.wrapper__hire}>
            <div className={styles.hire__content}>
              <Heading as="h2" size="2xl">
                ¿Por que contratar desde Puppy Point?
              </Heading>
              <img
                src={hire}
                alt="perro"
                className={styles.hire__content_img}
              />
            </div>

            <div className={styles.hire__cardlist}>
              <div className={styles.hire__carditem}>
                <img src={camera} height="40px" alt="camera" />
                <Heading as="h2" size="xl" className={styles.color__orange}>
                  Control
                </Heading>
                <Text fontSize="md" marginTop={2} textAlign="center">
                  Siempre sabrás dónde y cómo está tu perro ya que constamente
                  recibirás actualizaciones de fotos durante los paseos o
                  estadías.
                </Text>
              </div>
              <div className={styles.hire__carditem}>
                <img src={star} height="40px" alt="star" />
                <Heading as="h2" size="xl" className={styles.color__orange}>
                  Calificación
                </Heading>
                <Text fontSize="md" marginTop={2} textAlign="center">
                  Quienes se ofrecen en nuestro sitio saben que serán
                  calificados por sus clientes y por eso se esfuerzan al máximo
                  en brindar el mejor servicio.
                </Text>
              </div>
              <div className={styles.hire__carditem}>
                <img src={passion} height="40px" alt="pasion" />
                <Heading as="h2" size="xl" className={styles.color__orange}>
                  Pasión
                </Heading>
                <Text fontSize="md" marginTop={2} textAlign="center">
                  Tu perro es tan importante para nosotros como para tí.
                </Text>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.earn}>
          <div className={styles.earn__content}>
            <Heading as="h2" size="2xl">
              ¿Como ganar dinero con Puppy Point?
            </Heading>
            <img src={earn} alt="dinero" className={styles.earn__content_img} />
          </div>

          <div className={styles.earn__cardlist}>
            <div className={styles.earn__carditem}>
              <Heading
                as="h2"
                size="xl"
                className={`${styles.earn__carditem_number} ${styles.bg__orange}`}
              >
                1
              </Heading>
              <div>
                <Heading as="h2" size="xl" className={styles.color__orange}>
                  Registro
                </Heading>
                <Text fontSize="md" marginTop={2}>
                  Crea tu cuenta y completa tu perfil con tus datos, fotos,
                  precio, disponibilidad de días y horarios, zona, etc. Nosotros
                  revisaremos tu perfil y te avisaremos cuando haya sido
                  aprobado.
                </Text>
              </div>
            </div>

            <div className={styles.earn__carditem}>
              <Heading
                as="h2"
                size="xl"
                className={`${styles.earn__carditem_number} ${styles.bg__yellow}`}
              >
                2
              </Heading>
              <div>
                <Heading as="h2" size="xl" className={styles.color__orange}>
                  Contratación
                </Heading>
                <Text fontSize="md" marginTop={2}>
                  Los clientes podrán hacerte consultas y, si se deciden por tí,
                  te enviarán una solicitud de contratación. Podrás elegir
                  aceptar o no cada pedido de contratación que recibas.
                </Text>
              </div>
            </div>

            <div className={styles.earn__carditem}>
              <Heading
                as="h2"
                size="xl"
                className={`${styles.earn__carditem_number} ${styles.bg__brown}`}
              >
                3
              </Heading>
              <div>
                <Heading as="h2" size="xl" className={styles.color__orange}>
                  Servicio
                </Heading>
                <Text fontSize="md" marginTop={2}>
                  Una vez aceptado el pedido de contratación recibirás los datos
                  del cliente para encontrarse. Tus clientes podrán calificarte
                  a través de nuestra web, así que brindales lo mejor de tí!
                </Text>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.walker}>
          <Heading as="h2" size="xl">
            ¿Entonces, quieres ser paseador?
          </Heading>
          <Button
            colorScheme="orange"
            size="lg"
            marginTop={8}
            onClick={(e) => handleRegister(e, "walker")}
          >
            Haz click aquí para registrarte
          </Button>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footer__wrapper}>
          <Heading as="p" size="sm" className={styles.footer__desc}>
            © PUPPYPOINT 2022 All Rights Reserved.
          </Heading>
        </div>
      </footer>
    </div>
  );
}
