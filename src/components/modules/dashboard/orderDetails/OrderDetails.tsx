import { USER_ROLE } from "@/constant";
import { TorderDetailsProps } from "@/types/orderTypes";
import { convertDate } from "@/utills/dateConverter";
import Image from "next/image";
import { TbCurrencyTaka } from "react-icons/tb";
import ChangeStatus from "./ChangeStatus";
import Link from "next/link";
import { TRating } from "@/types/rating.types";
import OrderTracking from "./OrderTracking";
import GivingFeedbackComponent from "./GivingFeedbackComponent";
import FeedBackcard from "@/components/feedback/FeedBackcard";
import Pagination from "@/components/pagination/Pagination";
import SearchingFeedback from "./SearchingFeedback";
import NoteEditingComponent from "./NoteEditingComponent";

const OrderDetails = ({
  order,
  role,
  review,
  meta,
  isReview,
}: TorderDetailsProps) => {
  const date = convertDate(new Date(order?.createdAt));
  const status = order?.status;
  const orderVia =
    order?.deliveryMode === "mealPlanner" ? "Meal Plan" : "Manual";

  return (
    <section className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:from-gray-800 dark:to-gray-700 overflow-hidden max-w-4xl mx-auto px-1 md:px-4 py-4">
      {/* order details */}
      <div className="px-2 md:px-6 py-4 shadow-xl rounded-lg space-y-2 md:space-y-3">
        <h1 className="text-2xl font-bold text-gray-800 md:text-center">
          Order Details
        </h1>
        <div className="space-y-3">
          <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between">
            <div className="space-y-1">
              <h1 className="font-semibold"> Creation</h1>
              <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
                {date?.creationDate}, {date?.creationTime}
              </span>
            </div>
            <div className="space-y-1">
              <h1 className=" font-semibold"> Order Via</h1>
              <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
                {orderVia}
              </span>
            </div>
            <div className="space-y-1">
              <h1 className="font-semibold"> Order Type</h1>
              <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
                {order?.orderType}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {order?.endDate && (
              <div className="space-y-1">
                <h1 className="font-semibold"> End Date</h1>
                <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
                  {order?.endDate}
                </span>
              </div>
            )}
            <ChangeStatus
              role={role}
              status={status}
              isActive={order?.isActive}
              orderType={order?.orderType}
              id={order?._id}
            />
          </div>
          {order?.status !== "Cancelled" && (
            <OrderTracking status={order?.status} />
          )}
        </div>
      </div>

      {/* meal information */}
      <div className="px-2 md:px-6 py-4 shadow-xl rounded-lg space-y-3">
        <h2 className="text-2xl font-bold text-gray-800 md:text-center">
          Meal Information
        </h2>
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between">
          <div className="w-full">
            {order?.mealId?.imageUrl && (
              <div className="w-60">
                <Image
                  src={order.mealId.imageUrl}
                  alt={order.mealId.title}
                  width={400}
                  height={400}
                  className="object-contain rounded-xl "
                />
              </div>
            )}
          </div>
          <div className="w-full space-y-2">
            <div>
              <h2 className="text-lg font-bold text-primary">
                {order?.mealId?.title}{" "}
                <span className="text-base">
                  ({order?.mealId?.foodPreference})
                </span>
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h1 className=" font-semibold"> Category</h1>
                <span className="bg-primary border border-seconday px-1 py-1 rounded-full text-secondary">
                  {order?.mealId?.foodCategory}
                </span>
              </div>
              <div className="space-y-1">
                <h1 className=" font-semibold"> Cuisine</h1>
                <span className="bg-primary border border-seconday px-1 py-1 rounded-full text-secondary">
                  {order?.mealId?.cuisineType}
                </span>
              </div>
              <div className="space-y-1">
                <h1 className=" font-semibold"> Portion Size</h1>
                <span className="bg-primary border border-seconday px-1 py-1 rounded-full text-secondary">
                  {order?.mealId?.portionSize}
                </span>
              </div>
            </div>
            <p className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1">
              Price:{" "}
              <span className=" text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100 rounded-full flex items-center">
                <TbCurrencyTaka className="text-xl" />{" "}
                {order?.mealId?.price
                  ? order?.mealId?.price.toFixed(2)
                  : "0.00"}
              </span>
            </p>
            <div className="flex items-center justify-end">
              <Link
                href={`/meals/${order?.mealId?._id}`}
                className="bg-secondary text-primary px-2 py-1 rounded-xl hover:bg-primary hover:text-white cursor-pointer border border-primary duration-500 flex items-center gap-1"
              >
                View Meal Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* customer and kitchen information */}
      <div className="px-2 md:px-6 py-4 shadow-xl rounded-lg flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between">
        {(role === USER_ROLE.admin ||
          role === USER_ROLE.superAdmin ||
          role === USER_ROLE.customer) &&
          order?.kitchenId && (
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-800">
                Kitchen Information
              </h2>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-primary">
                  {order?.kitchenId?.kitchenName}{" "}
                </h2>
                <div className="flex items-center">
                  <Link
                    href={`/kitchen/${order?.kitchenId?._id}`}
                    className="bg-secondary text-primary px-2 py-1 rounded-xl hover:bg-primary hover:text-white cursor-pointer border border-primary duration-500 flex items-center gap-1"
                  >
                    View Kitchen Info
                  </Link>
                </div>
              </div>
            </div>
          )}
        {(role === USER_ROLE.admin ||
          role === USER_ROLE.superAdmin ||
          role === USER_ROLE.mealProvider) &&
          order?.customerId && (
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-800 ">
                Customer Information
              </h2>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-primary ">
                  {order?.customerId?.name}{" "}
                </h2>
                <div className="flex items-center justify-between ">
                  <div className="space-y-1 text-base">
                    <h1 className=" font-semibold"> Address</h1>
                    <span className="bg-primary border border-seconday px-1 py-1 rounded-xl text-secondary">
                      {order?.customerId?.address}
                    </span>
                  </div>
                  <div className="space-y-1 text-base">
                    <h1 className=" font-semibold"> Gender</h1>
                    <span className="bg-primary border border-seconday px-1 py-1 rounded-xl text-secondary">
                      {order?.customerId?.gender}
                    </span>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <Link
                    href={
                      role === USER_ROLE.admin || role === USER_ROLE.superAdmin
                        ? `/admin/manageUsers/${order?.customerId?._id}`
                        : `/mealProvider/customer/${order?.customerId?._id}`
                    }
                    className="bg-secondary text-primary px-2 py-1 rounded-xl hover:bg-primary hover:text-white cursor-pointer border border-primary duration-500 flex items-center gap-1"
                  >
                    View Customer Info
                  </Link>
                </div>
              </div>
            </div>
          )}
      </div>

      {/* delivery and payment information */}
      <div className="px-2 md:px-6 py-4 shadow-xl rounded-lg space-y-3">
        <h1 className="text-2xl font-bold text-gray-800 md:text-center">
          Delivery & Payment
        </h1>
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between">
          <div className="space-y-3">
            {order?.deliveryDays && (
              <div>
                <h1 className="font-medium">Order Day:</h1>
                <ul className="flex flex-wrap gap-2 ">
                  {(order?.deliveryDays).map((day, i) => (
                    <li
                      key={i}
                      className="bg-primary text-secondary px-2 py-1 rounded-xl"
                    >
                      {day}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {order?.deliveryTime && (
              <div>
                <h1 className="font-medium">Order Time:</h1>
                <ul className="flex flex-wrap gap-2 ">
                  {(order?.deliveryTime).map((time, i) => (
                    <li
                      key={i}
                      className="bg-primary text-secondary px-2 py-1 rounded-xl"
                    >
                      {time}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <h1 className="font-semibold"> Delivery Address</h1>
              <span className="bg-primary border border-seconday px-2 py-1 rounded-xl text-secondary">
                {order?.deliveryAddress}
              </span>
            </div>
            <div className="space-y-1">
              <h1 className="font-semibold"> Payment</h1>
              <span className="bg-primary border border-seconday px-2 py-1 rounded-xl text-secondary">
                {order?.payment}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* order summery */}
      <div className="px-2 md:px-6 py-4 shadow-xl rounded-lg space-y-3">
        <h1 className="text-2xl font-bold text-gray-800 md:text-center">
          Order Summery
        </h1>
        <div className=" w-full flex flex-col md:flex-row gap-4 md:justify-between md:gap-40">
          <div className="w-full space-y-1">
            <div className="flex justify-between font-semibold">
              <p>Quantity :</p>
              <p className="font-bold">{order?.quantity}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Total Price :</p>
              <p className="font-bold flex items-center gap-1">
                <TbCurrencyTaka /> {order?.totalPrice}
              </p>
            </div>
            {order?.deliveredCount !== undefined &&
              order?.deliveredCount > 0 && (
                <div className="flex justify-between font-semibold">
                  <p>Delivery Count :</p>
                  <p className="font-bold">{order?.deliveredCount}</p>
                </div>
              )}
          </div>
          {order?.note && (
            <>
              {role === USER_ROLE.customer ? (
                <NoteEditingComponent noteInfo={order?.note} id={order?._id} />
              ) : (
                <div className="font-semibold w-full">
                  <p className="font-bold">Note:</p>
                  <p>{order.note}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {order?.status === "Delivered" && (
        <>
          {role === USER_ROLE.customer ? (
            <>
              {order?.orderType === "once" && (
                <GivingFeedbackComponent
                  id={order?._id}
                  review={review as TRating}
                  isReview={isReview}
                />
              )}
              {order?.orderType === "regular" && (
                <SearchingFeedback
                  id={order?._id}
                  review={review as TRating[]}
                  deliveryCount={order?.deliveredCount as number}
                  isReview={isReview}
                  role={role}
                />
              )}
            </>
          ) : (
            <>
              {order?.orderType === "regular" && (
                <SearchingFeedback
                  id={order?._id}
                  review={review as TRating[]}
                  deliveryCount={order?.deliveredCount as number}
                  isReview={isReview}
                />
              )}
            </>
          )}
        </>
      )}
      {order?.orderType === "once" && (review as TRating) && (
        <div className="px-2 md:px-6 py-4 shadow-xl rounded-lg space-y-3">
          <h1 className="text-2xl font-bold text-gray-800 md:text-center">
            Feedback for this order
          </h1>
          <FeedBackcard feedbackData={review as TRating} role={role} />
        </div>
      )}
      {order?.orderType === "regular" && (review as TRating[])?.length > 0 && (
        <div className=" py-4 rounded-lg space-y-3">
          <h1 className="text-2xl font-bold text-gray-800 md:text-center">
            Feedback for this order
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {(review as TRating[]).map((item) => (
              <FeedBackcard
                key={item?._id}
                feedbackData={item as TRating}
                role={role}
              />
            ))}
          </div>
          <Pagination totalPage={meta?.totalPage as number} />
        </div>
      )}
    </section>
  );
};

export default OrderDetails;
