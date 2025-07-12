import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import { useSelector } from 'react-redux';
import CardLoading from './CardLoading';
import CardProduct from './CardProduct';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { validURLConvert } from '../utils/validURLConvert';

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const loadingCardNumber = new Array(6).fill(null);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
        },
      });

      const { data: responseData } = response;
      console.log(responseData);
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);
  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };
  const handleRedirectProductListPage = () => {
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    const url = `/${validURLConvert(name)}-${id}/${validURLConvert(
      subcategory?.name
    )}-${subcategory?._id}`;

    return url;
  };
  const redirectURL = handleRedirectProductListPage();

  return (
    <div className="">
      <div className="w-full max-w-screen-xl mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md:text-xl p-4 group-hover:text-green-700 transition-all duration-300 lg:text-left md:text-center">
          {name}
        </h3>
        {/* <h3 className="font-semibold text-lg md:text-xl p-4 group-hover:text-green-700 transition-all duration-300 hidden md:block">
          {name}
        </h3> */}
        <Link to={redirectURL} className="text-green-600 hover:text-green-400">
          See All
        </Link>
      </div>
      <div className="relative flex items-center ">
        <div
          className="flex gap-4 md:gap-6 lg:gap-8 w-full max-w-screen-xl mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth "
          ref={containerRef}
        >
          {loading &&
            loadingCardNumber.map((_, index) => {
              return (
                <CardLoading key={"CategoryWiseProductDisplay123" + index} />
              );
            })}

          {data.map((p, index) => {
            return (
              <CardProduct
                data={p}
                key={p._id + "CategoryWiseProductDisplay" + index}
                className="relative transition duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:border hover:border-green-400 rounded"
              />
            );
          })}
        </div>
        <div className="w-full max-w-screen-xl left-0 right-0  mx-auto  px-2  absolute hidden lg:flex justify-between">
          <button
            onClick={handleScrollLeft}
            className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
