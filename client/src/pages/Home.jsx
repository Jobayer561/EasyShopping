/* eslint-disable no-unused-vars */
import React from 'react'
import banner from '../assets/banner2.png'
import banner_mobile from '../assets/banner_mobile.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { validURLConvert } from '../utils/validURLConvert'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
 const Home = () => {
  const loadingCategory = useSelector(state=> state.product.loadingCategory)
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListPage = (id,cat)=>{
    console.log(id,cat)
    const subcategory = subCategoryData.find(sub => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });
      return filterData ? true : null;

    });
    const url = `/${validURLConvert(cat)}-${id}/${validURLConvert(
      subcategory.name
    )}-${subcategory._id}`;

    navigate(url);
    console.log(url); 
   }
  return (
    <section className="bg-white shadow-md p-4 rounded">
      <div className="container mx-auto">
        <div
          className={`w-full h-full min-h-48 bg-blue-100 ${
            !banner && "animate-pulse my-2"
          }`}
        >
          <img
            src={banner}
            className="w-full h-full hidden lg:block"
            alt="banner"
          />
          <img
            src={banner_mobile}
            className="w-full h-full lg:hidden"
            alt="banner"
          />
        </div>
      </div>

      <div className="w-full max-w-screen-xl mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {loadingCategory
          ? new Array(12).fill(null).map((c, index) => (
              <div
                key={index + "loadingCategory"}
                className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
              >
                <div className="bg-blue-100 min-h-24 rounded"></div>
                <div className="bg-blue-100 h-8 rounded"></div>
              </div>
            ))
          : categoryData.map((cat, index) => (
              <div
                key={cat._id + "displayCategory"}
                className="w-full h-full cursor-pointer hover:shadow-md p-1 rounded transition duration-300 ease-in-out transform hover:-translate-y-1"
                onClick={() => handleRedirectProductListPage(cat._id, cat.name)}
              >
                <div>
                  <img
                    src={cat.image}
                    className="w-full h-full object-scale-down"
                  />
                </div>
              </div>
            ))}
      </div>

      {categoryData?.map((c, index) => {
        return (
          <CategoryWiseProductDisplay
            key={c?._id + "CategoryWiseProduct"}
            id={c?._id}
            name={c?.name}
          />
        );
      })}
    </section>
  );
}
export default Home
