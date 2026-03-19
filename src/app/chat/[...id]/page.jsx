const page = async ({ params }) => {
  const { id } = await params;

  return <div>Hi {id}</div>;
};

export default page;
