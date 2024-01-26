import { Route, Routes } from "react-router-dom";
import SearchAppBar from "./Appbar/Appbar";
import GardenPage from "../pages/garden-page/GardenPage";

export default function PublicLayout() {
    return (    
      <>
      <SearchAppBar />
        <Routes>
          <Route path="/gardenPage" element={<GardenPage />} />
          {/* <Route path="/profile" element={<SignUp />} /> */}
        </Routes>
      </>
    )
  }
  
  