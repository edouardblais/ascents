import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNav from './components/home/TopNav';
import UserBox from './components/home/UserBox'
import RecentBox from './components/home/RecentBox';
import Home from './components/home/Home';
import RecentAscents from './components/recentascents/RecentAscents';
import Areas from './components/areas/Areas';
import Crags from './components/areas/crags/Crags';
import Crag from './components/areas/crags/crag/Crag';
import Climb from './components/areas/crags/crag/climb/Climb';
import Profile from './components/profile/Profile';
import BouldersLogged from './components/profile/ProfileInfo/BouldersLogged';
import RoutesLogged from './components/profile/ProfileInfo/RoutesLogged';
import Following from './components/profile/ProfileInfo/Following';
import ToDo from './components/profile/ProfileInfo/ToDo';
import AddAscent from './components/addascent/AddAscent';
import CreateNew from './components/addascent/createnew/CreateNew';
import SignIn from './components/signin/SignIn';
import CreateUser from './components/signin/createuser/CreateUser';


const App = () => {
  return (
    <BrowserRouter>
      <TopNav/>
      <UserBox/>
      <RecentBox/>
      <Routes>
        <Route path='' element={<Home/>}/>
          <Route path='/RecentAscents' element={<RecentAscents/>}/>
          <Route path='/Areas' element={<Areas/>}/>
            <Route path='/Areas/:areaname' element={<Crags/>}/>
              <Route path='/Areas/:areaname/:cragname' element={<Crag/>}/>
                <Route path='/Areas/:areaname/:cragname/:routename' element={<Climb/>}/>
          <Route path='/:profilename' element={<Profile/>}/>
            <Route path='/:profilename/Boulders' element={<BouldersLogged/>}/>
            <Route path='/:profilename/Routes' element={<RoutesLogged/>}/>
            <Route path='/:profilename/Following' element={<Following/>}/>
            <Route path='/:profilename/ToDo' element={<ToDo/>}/>
          <Route path='/AddAscent' element={<AddAscent/>}/>
            <Route path='/AddAscent/CreateNew' element={<CreateNew/>}/>
          <Route path='/SignIn' element={<SignIn/>}/>
            <Route path='/SignIn/CreateUser' element={<CreateUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
