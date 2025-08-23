const page = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const { orderId } = await params;
  console.log(orderId);
  return <div>this is my order</div>;
};

export default page;
