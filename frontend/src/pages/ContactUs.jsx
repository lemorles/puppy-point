import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Heading, Box} from "@chakra-ui/react";
import NewHelp from "../components/HelpCreate";
import { getHelps } from "../actions/helpAction";
import ContactUsCard from "../components/ContactUsCard";
import Pagination from "react-js-pagination";

export default function ContactUs() {
  const { user } = useSelector((state) => state.user);
  const { helps } = useSelector((state) => state.help);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 6;
  const pageRange = 5;

  useEffect(() => {
    dispatch(getHelps());
  }, [dispatch]);

  const applyPagination = (data) => {
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;

    return data.slice(firstIndex, lastIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // call API to get data based on pageNumber
  };

  if (user.role === "admin") {
    return (
       <Box maxW="7xl" justifyContent={"center"}>

        <Heading as="h2" size="xl" mb="80px">
          Contacto
        </Heading>
          <Stack spacing={5}>
            {helps && 
              applyPagination(helps).map((e) => {
                return (
                  <ContactUsCard 
                  key={e.id}
                  id={e.id}
                  subject={e.subject}
                  updatedAt={e.updatedAt}
                  user={e.user}
                  />
                  );
                })}
          </Stack>
          <Box
              display={"flex"}
              justifyContent={"center"}
              marginTop={"2em"}
              marginRight={"1em"}
              >

            {helps && helps.length > 0 && (
              <Pagination 
                activeClass="activeLink"
                activePage={currentPage}
                itemsCountPerPage={recordPerPage}
                totalItemsCount={helps && helps.length}
                pageRangeDisplayed={pageRange}
                onChange={handlePageChange}
                firstPageText="<<"
                prevPageText="<"
                nextPageText=">"
                lastPageText=">>"
                color="white"
                />
                )}
            </Box>

      
        </Box>
    );
  } else {
    return (
      <>
        {" "}
        <Heading as="h2" size="xl" mb="20px">
          Contactanos
        </Heading>
        <NewHelp />
      </>
    );
  }
}
