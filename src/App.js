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
import SignIn from './components/authentication/SignIn';
import CreateUser from './components/authentication/CreateUser';
import Reset from './components/authentication/Reset';
import OtherUserProfile from './components/profile/OtherUser/OtherUserProfile';
import SearchResults from './components/searchresults/SearchResults';
import './App.css';


const App = () => {

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  return (
    <BrowserRouter>
      <TopNav/>
      <UserBox/>
      <RecentBox/>
      <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/RecentAscents' element={<RecentAscents/>}/>
          <Route path='/SearchAreas' element={<Areas/>}/>
            <Route path='/SearchAreas/SearchCrags' element={<Crags/>}/>
              <Route path='/SearchAreas/SearchCrags/SearchClimbs' element={<Crag/>}/>
                <Route path='/SearchAreas/SearchCrags/SearchClimbs/Climb' element={<Climb/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/visitUser' element={<OtherUserProfile/>}/>
            <Route path='/visitUser/Boulders' element={<BouldersLogged/>}/>
            <Route path='/visitUser/Routes' element={<RoutesLogged/>}/>
            <Route path='/visitUser/Following' element={<Following/>}/>
            <Route path='/Visit/ToDo' element={<ToDo/>}/>
          <Route path='/AddAscent' element={<AddAscent/>}/>
            <Route path='/AddAscent/CreateNew' element={<CreateNew/>}/>
          <Route path='/SignIn' element={<SignIn/>}/>
          <Route path='/CreateUser' element={<CreateUser/>}/>
          <Route path='/Reset' element={<Reset/>}/>
          <Route path='/SearchResults' element={<SearchResults/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
