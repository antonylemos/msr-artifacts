import { Route, Routes } from "react-router";
import Home from "./features/home/Home";
import Layout from "./shared/components/Layout";
import { ListEpisodes } from "./features/episodes_list/ListEpisodes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/episodes" element={<ListEpisodes />} />
      </Route>
    </Routes>
  );
}

export default App;
