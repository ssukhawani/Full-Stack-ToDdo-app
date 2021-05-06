import React, { useEffect } from "react";
import HomeScreen from "./Screens/HomeScreen";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import { useDispatch} from "react-redux";
import { infoFromLocal } from "./Actions/loginActions";
// import { userFromLocal } from "./Actions/loginActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(infoFromLocal());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route path="/" component={HomeScreen} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
