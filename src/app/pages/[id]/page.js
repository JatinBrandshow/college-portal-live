import Pages from "./Pages";

const PropertyPage = async ({ params }) => {
  // Ensure `params` is resolved before accessing its properties
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams?.id || ""; // Safely access `id`
  return <Pages id={id} />;
};

export default PropertyPage;