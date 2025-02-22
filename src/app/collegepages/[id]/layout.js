import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function CollegeLayout({ children }) {
  return (
    <div>
      <Header showSearchBar={true} /> {/* Pass showSearchBar prop if needed */}
      <main>{children}</main>
      <Footer />
    </div>
  );
}