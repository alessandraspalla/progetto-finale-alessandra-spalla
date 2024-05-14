import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useOutlet } from "react-router-dom";

export function Layout() {
  const outlet = useOutlet();

  return (
    <>
      <Header />
      {outlet}
      <Footer />
    </>
  );
}
