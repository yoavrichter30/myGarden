import { Route, Routes } from "react-router-dom";
import SearchAppBar from "./Appbar/Appbar";
import GardenPage from "../pages/garden-page/GardenPage";
import PlantPage from "../pages/plant-page/PlantPage";
import ExplorePage from "../pages/explore-page/ExplorePage";
import SignIn from '../pages/sign-in/SignIn.tsx';
import SignUp from '../pages/sign-up/SignUp.tsx';
import EditProfile from '../pages/edit-profile-page/EditProdile.tsx';
import { useNavigate, Link, useLocation, Navigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import { IUser } from "../services/user-service.ts";
import AuthContext from '../auth/AuthContext.tsx';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function RequireAuth({ isAuthenticated, children, redirectTo }) {
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default function PublicLayout() {
  let query = useQuery();
  const {user, setUser} = useContext(AuthContext);

  return (    
    <>
    <SearchAppBar />
    <div style={{ marginTop: '64px' /* Adjust the value based on your navbar height */ }}>
      <Routes>
        <Route path="/gardenPage" element={<RequireAuth redirectTo="/signIn" isAuthenticated={Object.keys(user).length > 0}><GardenPage username={query.get("username")} /></RequireAuth>}/>
        <Route path="/plantPage" element={<RequireAuth redirectTo="/signIn" isAuthenticated={Object.keys(user).length > 0}><PlantPage postId={query.get("postId")}/></RequireAuth>}/>
        <Route path="/explorePage" element={<RequireAuth redirectTo="/signIn" isAuthenticated={Object.keys(user).length > 0}><ExplorePage /></RequireAuth>}/>
        <Route path="/editProfile" element={<RequireAuth redirectTo="/signIn" isAuthenticated={Object.keys(user).length > 0}><EditProfile /></RequireAuth>}/>

        <Route path="/" element={<SignIn />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        {/* <Route path="/profile" element={<SignUp />} /> */}
      </Routes>
    </div>
    </>
  )
  }
  
  