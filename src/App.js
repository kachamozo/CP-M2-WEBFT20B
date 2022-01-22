import { Route } from "react-router-dom";
import CreateHouse from "./components/CreateHouse/CreateHouse";
import HouseCard from "./components/HouseCard/HouseCard";
import HouseDetail from "./components/HouseDetail/HouseDetail";
import Houses from "./components/Houses/Houses";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Route exact path={"/"} component={Houses} />
      <Route path={"/houses"} component={HouseCard} />
      <Route path={"/houses/:houseId"} component={HouseDetail} />
      <Route path={"/house/create"} component={CreateHouse} />
    </div>
  );
}

export default App;
