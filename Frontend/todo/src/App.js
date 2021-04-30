import HomeScreen from "./Screens/HomeScreen";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;
