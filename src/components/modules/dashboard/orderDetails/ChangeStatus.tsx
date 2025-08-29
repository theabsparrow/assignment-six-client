"use client";

import { USER_ROLE } from "@/constant";
import { TUSerRole } from "@/types";
import { TOrderStatus, TOrderType } from "@/types/orderTypes";
import {
  activeStatusStyle,
  orderStatus,
  statusStyles,
} from "../customer/myOrders/myOrder.const";
import OrderStatusDropdown from "@/components/statusDropdown/OrderStatusDropdown";

type TChangeStatusprops = {
  role: TUSerRole;
  status: TOrderStatus;
  isActive?: boolean;
  orderType: TOrderType;
  id: string;
};
const ChangeStatus = ({
  role,
  status,
  isActive,
  orderType,
  id,
}: TChangeStatusprops) => {
  const activity = isActive ? "Yes" : "No";

  return (
    <div className="flex items-center md:gap-60 justify-between md:justify-start">
      {role === USER_ROLE.mealProvider ? (
        <OrderStatusDropdown
          status={status}
          options={orderStatus as TOrderStatus[]}
          getStyle={(option) => statusStyles[option]}
          label="Order Status"
          role={role}
          id={id}
        />
      ) : (
        <OrderStatusDropdown
          status={status}
          options={["Cancelled"]}
          getStyle={(option) => statusStyles[option]}
          label="Order Status"
          role={role}
          id={id}
        />
      )}
      {orderType === "regular" && activity && (
        <OrderStatusDropdown
          status={activity}
          options={["Yes", "No"]}
          getStyle={(option) => activeStatusStyle[option]}
          label="Order Activity"
          role={role}
          id={id}
        />
      )}
    </div>
  );
};

export default ChangeStatus;
