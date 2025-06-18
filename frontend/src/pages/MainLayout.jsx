import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

export default function MainLayout() {
  return (
    <>
      <HeaderComponent />
      <main style={{ minHeight: "80vh", padding: "1rem" }}>
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
}
