import React from "react";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.order);

  console.log("order Items", orders);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow p-5 text-center border-b">
        <h1 className="text-2xl font-bold text-gray-700">🛒 My Orders</h1>
      </div>

      {/* Content Centered */}
      <div className="flex justify-center py-8 px-4">
        <div className="w-full max-w-2xl space-y-6">
          {!orders[0] && <NoData />}

          {orders.map((order, index) => (
            <div
              key={order._id + index + "order"}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 border"
            >
              {/* Order ID */}
              <p className="text-sm text-gray-500 mb-2">
                Order No :{" "}
                <span className="font-mono text-blue-600">
                  {order?.orderId}
                </span>
              </p>

              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={order.product_details.image[0]}
                  alt={order.product_details.name}
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <p className="text-lg font-medium text-gray-800">
                  {order.product_details.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
