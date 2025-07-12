import React, { useState } from "react";
import logo from "../assets/logo_cropped.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import { DisplayPriceInTaka } from "../utils/DisplayPriceInTaka";
import { useGlobalContext } from "../../provider/GlobalProvider";
import DisplayCartItem from "./DisplayCartItem";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const { totalPrice, totalQty } = useGlobalContext();
  const [openCartSection, setOpenCartSection] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  return (
    <header className="h-24 lg:h-20 sticky top-0 z-40 bg-white border-b shadow-sm flex flex-col justify-center overflow-x-hidden">
      {/* Top Row */}
      {!(isSearchPage && isMobile) && (
        <div className="w-[100vw] max-w-[1440px] mx-auto flex items-center justify-between px-4 overflow-hidden">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              width={140}
              height={30}
              alt="logo"
              className="hidden lg:block"
            />
            <img
              src={logo}
              width={100}
              height={40}
              alt="logo"
              className="lg:hidden"
            />
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:block w-[400px]">
            <Search />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Mobile User Icon */}
            <button
              className="text-neutral-700 lg:hidden active:text-black"
              onClick={handleMobileUser}
            >
              <FaRegCircleUser size={26} />
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Account Dropdown */}
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="flex items-center gap-1 cursor-pointer hover:text-emerald-600 active:text-emerald-700 transition"
                  >
                    <span className="text-sm font-semibold">Account</span>
                    {openUserMenu ? (
                      <GoTriangleUp size={20} />
                    ) : (
                      <GoTriangleDown size={20} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md border w-52 z-50">
                      <UserMenu close={handleCloseUserMenu} />
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="text-sm px-3 py-1 rounded hover:bg-gray-100 active:bg-gray-200 transition font-medium"
                >
                  Login
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={() => setOpenCartSection(true)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 active:bg-green-700 px-4 py-2 rounded-lg text-white shadow-md transition"
              >
                <div className="animate-bounce">
                  <BsCart4 size={24} />
                </div>
                <div className="text-left leading-tight text-sm font-semibold">
                  {cartItem[0] ? (
                    <>
                      <p>{totalQty} Items</p>
                      <p className="text-xs font-normal">
                        {DisplayPriceInTaka(totalPrice)}
                      </p>
                    </>
                  ) : (
                    <p>My Cart</p>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search */}
      <div className="lg:hidden px-4 mt-1">
        <Search />
      </div>

      {/* Cart Slideout */}
      {openCartSection && (
        <DisplayCartItem close={() => setOpenCartSection(false)} />
      )}
    </header>
  );
};

export default Header;
