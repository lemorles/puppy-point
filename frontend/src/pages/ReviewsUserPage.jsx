import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsByWalkerId } from "../actions/reviewActions";
import ReviewList from "../components/ReviewList";
import { Heading, Box, SimpleGrid, Badge, Flex, Stack } from "@chakra-ui/react";
import Pagination from "react-js-pagination";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import Loader from "../components/Loader";


export default function WalksUserPage() {
  const dispatch = useDispatch();

  const { reviews, isLoading } = useSelector((state) => state.review);
  const { user } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const pageRange = 5;

  const applyPagination = (data) => {
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    return data.slice(firstIndex, lastIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (user?.role === "walker") {
      dispatch(getReviewsByWalkerId(user.id));
    }
  }, [dispatch, user]);

  if (isLoading) return <Loader />;

  return (
    <>
      {/* <Heading as="h2" size="xl" mb="80px">
        {user?.role === "admin" ? " Mis reseñas" : ""}
      </Heading> */}
      <SimpleGrid row={2} spacing={15} display={"flex"} justifyContent={"center"}>
      <Box   
        rounded={"20px"}
        p={12}
        boxShadow={'0 5px 20px 0px rgb(222 110 34 / 43%)'}
        >
      <Heading fontSize={"25px"}>Calificación</Heading>
        <Rating reviews={reviews} />
      </Box>
      </SimpleGrid>

      <Flex
        direction={{ base: "column", md: "column" }}
        justifyContent={"center"}
        margin={1}
        padding={1}
      >
        <Stack>
        <ReviewList reviews={applyPagination(reviews)} />
        </Stack>
        <Stack alignSelf={"center"} m={10} marginLeft={"11rem"}>
          {reviews && reviews.length > 0 && (
          <Pagination
          activeClass="activeLink"
          activePage={currentPage}
          itemsCountPerPage={recordPerPage}
          totalItemsCount={reviews && reviews.length}
          pageRangeDisplayed={pageRange}
          onChange={handlePageChange}
          firstPageText="<<"
          prevPageText="<"
          nextPageText=">"
          lastPageText=">>"
          color="white"
          />
          )}
        </Stack>
      </Flex>
    </>
  );
}

function Rating({ reviews }) {
  const amount = reviews
    .map((r) => r.rating)
    .reduce((prev, curr) => prev + curr, 0);

  const prom = amount / reviews.length;

  return (
    <SimpleGrid row={3} spacing={4} justifyContent="center">
      <Box display="flex" mt="5" alignItems="center">
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
