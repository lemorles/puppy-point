import React from "react";
import {SimpleGrid} from "@chakra-ui/react";
import Review from './Review'

export default function ReviewList({ reviews }) {
  return (
      <SimpleGrid spacing={"18"} mt={16} mx={"auto"}>
        { reviews && reviews.map((review) => (
          <Review {...review} key={review.id} />
        ))}
      </SimpleGrid>
  );
}
