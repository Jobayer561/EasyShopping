import React from 'react'
import { DisplayPriceInTaka } from '../utils/DisplayPriceInTaka';
import { priceWithDiscount } from '../utils/PriceWithDiscount';
import { Link } from 'react-router-dom';
import { validURLConvert } from '../utils/validURLConvert';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import { useState } from 'react';
// import Axios from '../utils/Axios';
// import toast from 'react-hot-toast';
// // import { useGlobalContext } from '../../provider/GlobalProvider';
import AddToCartButton from './AddToCartButton';
const CardProduct = ({data}) => {
    const url = `/product/${validURLConvert(data.name)}-${data._id}`;
    // const [loading,setLoading]=useState(false)
  
    return (
      <Link
        to={url}
        className="border border-gray-200 py-2  lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white "
      >
        <div className="min-h-20 max-h-24 lg:max-h-32 rounded overflow-hidden">
          <img
            src={data.image[0]}
            className="w-full h-full object-scale-down scale-125"
          />
        </div>
        <div className="flex items-center gap-1">
          <div className="rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50">
            10 Min
          </div>

          <div>
            {Boolean(data.discount) && (
              <p className="text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full">
                {data.discount}% discount
              </p>
            )}
          </div>
        </div>
        <div className="font-medium text-ellipsis line-clamp-2">
          {data.name}
        </div>
        <div className="w-fit gap-2 px-2 lg:px-0 text-sm lg:text-base">
          {data.unit}
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="font-semibold">
              {DisplayPriceInTaka(priceWithDiscount(data.price, data.discount))}
            </div>
          </div>
          <div className="">
            {data.stock == 0 ? (
              <p className='text-red-600 text-sm'>Out of Stock!</p>
            ) : (
             <AddToCartButton data = {data}/>
            )}
          </div>
        </div>{" "}
      </Link>
    );
    }
export default CardProduct