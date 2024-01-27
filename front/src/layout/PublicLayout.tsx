import { Route, Routes } from "react-router-dom";
import SearchAppBar from "./Appbar/Appbar";
import GardenPage from "../pages/garden-page/GardenPage";

export default function PublicLayout() {
    return (    
      <>
      <SearchAppBar />
      <div style={{ marginTop: '64px' /* Adjust the value based on your navbar height */ }}>
        <Routes>
          <Route path="/gardenPage" element={<GardenPage />} />
          {/* <Route path="/profile" element={<SignUp />} /> */}
        </Routes>
      </div>
      </>
    )
  }
  
  