import React, { useEffect, useState } from "react";
import CardLoading from "../components/CardLoading";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import noData from "../assets/nothing here yet.webp";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingArrayCard = new Array(10).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const location = useLocation();

  // Get search query from URL (?q=...)
  const queryParams = new URLSearchParams(location.search);
  const searchText = queryParams.get("q") || "";

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText, // empty string means fetch all
          page: page,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        if (responseData.page === 1) {
          setData(responseData.data);
        } else {
          setData((prevData) => [...prevData, ...responseData.data]);
        }
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Refetch and reset data when searchText changes
  useEffect(() => {
    setPage(1);
    setData([]); // Reset data when search changes
    // eslint-disable-next-line
  }, [searchText]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [searchText, page]);

  const handleFetchMore = () => {
    if (page < totalPage) {
      setPage((prevData) => prevData + 1);
    }
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results : {data.length}</p>
        <InfiniteScroll
          dataLength={data.length}
          hasMore={page < totalPage}
          next={handleFetchMore}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4">
            {data.map((p, index) => {
              return (
                <CardProduct data={p} key={p?._id + "searchProduct" + index} />
              );
            })}

            {loading &&
              loadingArrayCard.map((_, index) => {
                return <CardLoading key={"loadingSearchPage" + index} />;
              })}
          </div>
        </InfiniteScroll>
        {!data[0] && !loading && (
          <div className="flex flex-col justify-center items-center w-full  mx-auto">
            <img
              src={noData}
              className="w-full h-full max-w-xs max-h-xs block"
            />
            <p className="font-semibold my-2">No Data found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
