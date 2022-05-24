import {
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import ReviewList from "../components/ReviewList";
import Loader from "./Loader";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Modal, Image, Box } from "@chakra-ui/react";
import { getReviewsByWalkerId } from "../actions/reviewActions";
import { useDispatch, useSelector } from "react-redux";

export default function WalkerReview({ isOpen, onClose, walk }) {
  const { reviews, isLoading } = useSelector((state) => state.review);
  const dispatch = useDispatch();

  useEffect(() => {
    if (walk) dispatch(getReviewsByWalkerId(walk?.userId));
  }, [dispatch, walk]);

  if (isLoading) return <Loader />;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      >
        <ModalContent>
          <ModalCloseButton />
          <SimpleGrid rows={3} spacing={5} justifyContent="center">
            <Box>
              <ModalHeader>
                {walk?.user?.firstName} {walk?.user?.lastName}
              </ModalHeader>
            </Box>
            <Box
              marginLeft={3}
              rounded={"lg"}
              pos={"relative"}
              boxSize={"170px"}
              _after={{
                transition: "all .3s ease",
                content: '""',
                borderRadius: "full",
                w: "full",
                h: "full",
                pos: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "orange.400",
                filter: "blur(15px)",
                zIndex: -1,
              }}
              _groupHover={{
                _after: {
                  filter: "blur(20px)",
                },
              }}
            >
              <Image
                borderRadius="full"
                boxSize="170px"
                objectFit="cover"
                src={walk?.user?.image}
                alt={"img"}
              />
            </Box>
            <Box>
              <Rating reviews={reviews} />
            </Box>
          </SimpleGrid>
          <ReviewList reviews={reviews} />
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}

function Rating({ reviews }) {
  const amount = reviews
    .map((r) => r.rating)
    .reduce((prev, curr) => prev + curr, 0);

  const prom = amount / reviews.length;

  return (
    <SimpleGrid row={2} spacing={4} justifyContent="center">
      <Box display="flex" mt="2" alignItems="center">
        {Array(5)
          .fill("")
          .map((_, i) => {
            const roundedRating = Math.round(prom * 2) / 2;

            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: "1" }}
                  color={i < prom ? "teal.500" : "gray.300"}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
            }
            return <BsStar key={i} style={{ marginLeft: "1" }} />;
          })}
      </Box>
      <Badge ml="2" p="1" fontSize="0.8em" colorScheme="orange">
        {reviews.length} REVIEWS
      </Badge>
    </SimpleGrid>
  );
}
