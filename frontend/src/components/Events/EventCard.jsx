import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";

const EventCard = ({ active, data }) => {
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:-w[50%] m-auto">
        <img
          src="https://dlcdnwebimgs.asus.com/gain/220fdf76-fc60-45d4-a4ce-126ea140471b/w328"
          alt=""
        />
      </div>

      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Gaming Headphone Asus</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          quia culpa cumque tenetur recusandae, reprehenderit vel praesentium,
          beatae soluta rerum sapiente aspernatur impedit. Ab, ad aliquam
          blanditiis cupiditate incidunt aperiam? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Cumque expedita distinctio ratione
          officiis fugit magni itaque in consectetur, quo ab nisi id amet,
          quibusdam iure inventore voluptatum ullam nam commodi.
        </p>

        {/* Price section */}
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              1099$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              999$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
