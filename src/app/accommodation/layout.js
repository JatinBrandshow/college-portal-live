import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AccommodationLayout({ children }) {
  return (
    <div>
      <Header showSearchBar={true} /> 
      <main>{children}</main>
      <Footer />
    </div>
  );
}