import { useLocation } from "react-router-dom";
import NavBar from './Components/NavBar/NavBar.jsx'
import Footer from "./Components/Footer/Footer.jsx";


const Layout = ({ children }) => {
  const location = useLocation();
  const hideElements = ['/account']; // Paths where NavBar and Footer should not be displayed

  return (
    <div>
      {/* Render NavBar and Footer only if not on paths in hideElements */}
      {!hideElements.includes(location.pathname) && <NavBar />}
      {children} {/* Renders the current page content */}
      {!hideElements.includes(location.pathname) && <Footer />}
    </div>
  );
};



export default Layout