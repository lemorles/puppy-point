import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPost,
  getPostsByCategory,
  getPostsByTitle,
} from "../actions/postAction";
import PostCard from "../components/Post";
import styles from "../styles/Post.module.css";
import { Button, Input, Select, useColorModeValue } from "@chakra-ui/react";
import { Box, Heading, Text, Image } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Pagination from "react-js-pagination";
import { RiFilterOffLine } from "react-icons/ri";
import Curiosidad from "../assets/Curiosidad.jpg";
import Servicio from "../assets/Servicio.jpg";
import Cuidados from "../assets/Cuidados.jpg";
import Noticia from "../assets/Noticia.jpg";
import Logo from "../assets/logo.png";

export default function PostPage() {
  const { posts } = useSelector((state) => state.post);
  const colorModeValue = useColorModeValue;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 6;
  const pageRange = 5;
  const [input, setInput] = useState({
    title: "",
  });
  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    if (input.title.length) {
      dispatch(getPostsByTitle(input.title));
    } else if (input.title === "") {
      dispatch(getPost());
    }
  };

  const handleFilterCategory = (e) => {
    setCurrentPage(1);
    dispatch(getPostsByCategory(e.target.value));
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
    dispatch(getPost());
    setCurrentPage(1);
    setInput({
      title: "",
      category: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className={styles.containPostPage}>
        <div className={styles.containPostInfo}>
          <Box textAlign="center" py={10} px={6}>
            {/* <CheckCircleIcon boxSize={"50px"} color={"green.500"} /> */}
            <Image
              src={Logo}
              alt={Logo}
              w="50px"
              h="50px"
              mr="auto"
              ml="auto"
            />
            <Heading as="h1" size="xl" mb={2}>
              Puppy Point
            </Heading>
            <Text as="h2" size="large" mt={1} mb={2}>
              Blog especializado en Caninos
            </Text>
            <Text color={"gray.500"} maxW="80%" margin="auto">
              En Puppy Point encontrarás toda la información relevante sobre
              perros para que así puedas conocer más acerca de tu compañero
              peludo desde trucos para su adiestramiento y educación, tips de
              alimentación y salud, primeros pasos para el cuidado de un
              cachorro y un sinfín de curiosidades caninas que te dejarán la
              boca abierta.
            </Text>
          </Box>
          {/* <Box textAlign="start" py={10} px={6} display="flex"> */}
          <div className={styles.topics}>
            {/* <CheckCircleIcon boxSize={"50px"} color={"green.500"} /> */}
            <Box
              flexDir="column"
              bg={colorModeValue("white", "gray.900")}
              p="20px"
              mt="10px"
              borderRadius="10px"
            >
              <Image
                mr={"auto"}
                ml="auto"
                borderRadius="full"
                boxSize="150px"
                objectFit={"cover"}
                objectPosition="Center"
                src={Curiosidad}
                alt={Curiosidad}
              />
              <Heading as="h2" size="xl" mt={6} mb={2}>
                Curiosidades
              </Heading>
              <Text color={"gray.500"} mt={6} mb={2}>
                ¿Te has preguntado alguna vez que hace a los perros tan
                especiales? Aquí te contamos algunas de las curiosidades más
                sorprendentes sobre los perros que te ayudarán a entender un
                poco más a tu peludo.
              </Text>
            </Box>
            <Box
              flexDir="column"
              bg={colorModeValue("white", "gray.900")}
              p="20px"
              mt="10px"
              borderRadius="10px"
            >
              <Image
                mr={"auto"}
                ml="auto"
                borderRadius="full"
                boxSize="150px"
                objectFit={"cover"}
                objectPosition="Center"
                src={Servicio}
                alt={Servicio}
              />
              <Heading as="h2" size="xl" mt={6} mb={2}>
                Servicios
              </Heading>
              <Text color={"gray.500"} mt={6} mb={2}>
                El adiestramiento y el entrenamiento canino es parte
                indispensable en la vida de un perro. En nuestra web te contamos
                algunos métodos de entrenamiento específico para darle el mejor
                entrenamiento a tu perro.
              </Text>
            </Box>
            <Box
              flexDir="column"
              bg={colorModeValue("white", "gray.900")}
              p="20px"
              mt="10px"
              borderRadius="10px"
            >
              <Image
                mr={"auto"}
                ml="auto"
                borderRadius="full"
                boxSize="150px"
                objectFit={"cover"}
                objectPosition="Center"
                src={Noticia}
                alt={Noticia}
              />
              <Heading as="h2" size="xl" mt={6} mb={2}>
                Noticias
              </Heading>
              <Text color={"gray.500"} mt={6} mb={2}>
                Una correcta alimentación y una dieta balanceada es uno de los
                pilares principales en la vida de un perro. En nuestra web te
                contaremos algunas dietas a seguir y alimentos que debes evitar
                a toda costa.
              </Text>
            </Box>
            <Box
              flexDir="column"
              bg={colorModeValue("white", "gray.900")}
              p="20px"
              mt="10px"
              borderRadius="10px"
            >
              <Image
                mr={"auto"}
                ml="auto"
                borderRadius="full"
                boxSize="150px"
                objectFit={"cover"}
                objectPosition="Center"
                src={Cuidados}
                alt={Cuidados}
              />
              <Heading as="h2" size="xl" mt={6} mb={2}>
                Cuidados
              </Heading>
              <Text color={"gray.500"} mt={6} mb={2}>
                La salud, la higiene y el cuidado de un perro es muy importante
                para poder garantizarle una calidad de vida óptica. En esta
                categoría te contamos cuidados básicos para mantener a tu perro
                en forma y enfermedades comunes que podrían afectar a tu perro y
                cómo evitarlas.
              </Text>
            </Box>
          </div>
        </div>
        {/* Lista de todos los post */}
        <div className={styles.buttonsSearch}>
          <Select
            placeholder="Tema"
            borderColor="orange.500"
            maxW="280px"
            name="category"
            mr={"10px"}
            value={input.category}
            onChange={handleFilterCategory}
          >
            <option value="services">Servicios</option>
            <option value="tipsCare">Cuidados</option>
            <option value="random">Random</option>
            <option value="updates">Noticias</option>
          </Select>
          <Input
            placeholder="Busca por titulo..."
            maxW="200px"
            borderColor="orange.500"
            type="text"
            name="title"
            value={input.title}
            onChange={handleChange}
            marginRight="4px"
          />
          <Button
            onClick={handleSearch}
            colorScheme="orange"
            maxW="100px"
            mr={"10px"}
            p="0 30px"
          >
            Buscar
          </Button>
          <button className={styles.filterClean} onClick={handleClickReset}>
            <RiFilterOffLine title="Limpiar filtros" />
          </button>
        </div>
        <div className={styles.containPostPageCard}>
          {posts &&
            applyPagination(posts).map((e) => {
              return (
                <PostCard
                  key={e.id}
                  id={e.id}
                  image={e.image}
                  title={e.title}
                  subtitle={e.subtitle}
                  updatedAt={e.updatedAt}
                  user={e.user}
                />
              );
            })}
        </div>
        <div className={styles.pagination}>
          {posts && posts.length > 0 && (
            <Pagination
              activeClass="activeLink"
              activePage={currentPage}
              itemsCountPerPage={recordPerPage}
              totalItemsCount={posts && posts.length}
              pageRangeDisplayed={pageRange}
              onChange={handlePageChange}
              firstPageText="<<"
              prevPageText="<"
              nextPageText=">"
              lastPageText=">>"
              color="white"
            />
          )}
          {/* <PostCard posts={applyPagination(posts)} /> */}
        </div>
      </div>
    </>
  );
}
