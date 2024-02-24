import { Route, Routes } from "react-router-dom";
import SearchAppBar from "./Appbar/Appbar";
import GardenPage from "../pages/garden-page/GardenPage";
import PlantPage from "../pages/plant-page/PlantPage";

import { useNavigate, Link, useLocation } from "react-router-dom";
import React from 'react';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function PublicLayout() {
    let query = useQuery();

    return (    
      <>
      <SearchAppBar />
      <div style={{ marginTop: '64px' /* Adjust the value based on your navbar height */ }}>
        <Routes>
          <Route path="/gardenPage" element={<GardenPage name={query.get("name")} />} />
          <Route path="/plantPage" element={<PlantPage plantId={query.get("plantId")}/>} />
          {/* <Route path="/profile" element={<SignUp />} /> */}
        </Routes>
      </div>
      </>
    )
  }
  
  