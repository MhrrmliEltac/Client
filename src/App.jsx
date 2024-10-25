import "./App.css";
import Main from "./Components/Main/Main";
import Navbar from "./Components/Header/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./Components/ProductItem/ProductDetail";
import Footer from "./Components/Footer/Footer";
import Shop from "./Components/Pages/Shop";
import Contact from "./Components/Pages/Contact";
import SignUp from "./Components/Auth/SignUp";
import Login from "./Components/Auth/SignIn";
import { Toaster } from "react-hot-toast";
import UserScreen from "./Components/Pages/UserScreen";
import PrivateRoute from "./Components/Private/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid-app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/productdetail/:title" element={<ProductDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Login />} />
          <Route
            path="/user-screen"
            element={
              <PrivateRoute>
                <UserScreen />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 1500 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
