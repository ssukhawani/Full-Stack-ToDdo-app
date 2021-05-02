import HomeScreen from "./Screens/HomeScreen";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Header from "./Component/Header";
import Footer from "./Component/Footer";


function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
