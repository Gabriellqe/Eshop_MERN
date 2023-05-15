import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import CartSingle from "./CartSingle";

const Cart = ({ setOpenCart }) => {
  const cartData = [
    { name: "IPHONE 14 pro max 226 gb", description: "desctest", price: 123 },
    { name: "IPHONE 14 pro max 226 gb", description: "desctest", price: 123 },
    { name: "IPHONE 14 pro max 226 gb", description: "desctest", price: 123 },
    { name: "IPHONE 14 pro max 226 gb", description: "desctest", price: 123 },
    { name: "IPHONE 14 pro max 226 gb", description: "desctest", price: 123 },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {cartData && cartData.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cartData && cartData.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cartData &&
                  cartData.map((i, index) => (
                    <CartSingle key={index} data={i} />
                  ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD$)
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
        <div className="w-full h-screen flex items-center justify-center">
          <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3"></div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Cart;
