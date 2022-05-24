import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import {
  createComments,
  deletePost,
  getPostComments,
  getPostDetail,
} from "../actions/postAction";
import styles from "../styles/Post.module.css";
import { roles } from "../routes/roles";
import { Button } from "@chakra-ui/react";
import PostComment from "../components/PostComment";
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Container,
  Textarea,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { getToken } from "../utils/auth";
import Loader from "../components/Loader";
import { useToastContext } from "../context/ToastContext";

export default function PostDetailPage() {
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const { comment, comments, isLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const token = getToken();
  const addToast = useToastContext();

  const hanldeClickDelete = () => {
    dispatch(deletePost(params.id, history, "/posts", addToast));
  };

  const handleClickEdit = () => {
    history.push(`/posts/${params.id}/edit`);
  };

  useEffect(() => {
    dispatch(getPostDetail(params.id));
    if (comment) dispatch(getPostComments(params.id));
  }, [dispatch, params.id, comment]);

  //   MODAL
  const [input, setInput] = useState({
    comments: "",
    likes: 0,
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateComment = () => {
    dispatch(createComments({ ...input, userId: user.id }, params.id));
    dispatch(getPostComments(params.id));
  };

  if (isLoading) return <Loader />;

  if (post) {
    return (
      <div>
        <Navbar />
        <Container maxW={"900px"} p="12">
          <Heading as="h1" marginBottom="5px">
            {post.title}
          </Heading>
          <Heading as="h2" size="md" fontWeight="normal">
            {post.subtitle}
          </Heading>
          <Box
            marginTop={{ base: "1", sm: "5" }}
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              justifyContent="center"
              marginTop={{ base: "3", sm: "0" }}
            >
              <Image
                margin="10px 0 15px"
                borderRadius="lg"
                src={post.image}
                alt="some good alt text"
                objectFit="contain"
              />

              <Text as="p" marginTop="2" color="gray.500" fontSize="lg">
                {post.body}
              </Text>
              <HStack
                marginTop="15px"
                marginBottom="25px"
                spacing="2"
                display="flex"
                alignItems="center"
              >
                <Image
                  borderRadius="full"
                  boxSize="40px"
                  src={post && post.user && post.user.image}
                  alt={post && post.user && post.user.firstName}
                />
                <Text fontWeight="medium">{`${
                  post && post.user && post.user.firstName
                } ${post && post.user && post.user.lastName}`}</Text>
                <Text>—</Text>
                <Text>
                  {new Date(post.updatedAt).toLocaleDateString("es-es", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </HStack>
            </Box>
          </Box>
          {token ? (
            <>
              <Heading as="h2" marginTop="5" marginBottom="10px">
                Publica tus comentarios aquí
              </Heading>

              <Textarea
                name="comments"
                placeholder="Escribe tu comentario..."
                onChange={handleChange}
                marginBottom="10px"
                maxH="300px"
              />

              <Button colorScheme="orange" onClick={handleCreateComment}>
                Publicar
              </Button>
            </>
          ) : (
            <div>
              <p>Para dejar tus comentarios debes estar registrado.</p>
              <Link to="/login">
                <Button colorScheme="orange" marginTop="10px">
                  Ingresar
                </Button>
              </Link>
            </div>
          )}
          <PostComment
            comments={comments}
            postId={post.id}
            userId={post.userId}
          />
        </Container>

        {user && user.role === roles.ADMIN && (
          <div className={styles.containButton}>
            <Button onClick={handleClickEdit} className={styles.editButton}>
              Editar
            </Button>
            <Button onClick={hanldeClickDelete} className={styles.deleteButton}>
              Eliminar
            </Button>
          </div>
        )}
      </div>
    );
  }
}
