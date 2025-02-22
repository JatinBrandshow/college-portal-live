import CollegePages from "./CollegePages";

const CollegePage = async ({ params }) => {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams?.id || ""; // Safely access id

  return <CollegePages id={id} />;
}



export default CollegePage;