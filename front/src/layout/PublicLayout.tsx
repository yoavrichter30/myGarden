import { Route, Routes } from "react-router-dom";
import SearchAppBar from "./Appbar/Appbar";

export default function PublicLayout() {
    return (    
      <>
      <SearchAppBar />
        <Routes>
          {/* <Route path="/home" element={<SignIn />} />
          <Route path="/profile" element={<SignUp />} /> */}
        </Routes>
      </>
    )
  }
  
  