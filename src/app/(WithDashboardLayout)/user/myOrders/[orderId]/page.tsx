const CustomerOrderDetails = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;
  console.log(orderId);
  return <div>this is order id page</div>;
};

export default CustomerOrderDetails;
