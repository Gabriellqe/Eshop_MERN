import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const orders = [
    {
      id: 1,
      orderItems: [{ name: "Iphone pro max 14" }],
      totalPrice: 100,
      orderStatus: "Proccesing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <AiOutlineArrowRight size={20} />
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) =>
      row.push({
        id: item.id,
        itemsQty: item.orderItems.length,
        status: item.orderStatus,
        total: item.totalPrice,
      })
    );

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default AllOrders;
