// app/college/layout.js
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function CollegeLayout({ children }) {
  return (
    <div>
      <Header showSearchBar={true} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}