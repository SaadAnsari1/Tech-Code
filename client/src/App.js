import React from 'react'
import './App.css';
import { Route, Switch } from "react-router-dom";
import For from './404'
import NewsPost from './NewsPost'
import Admin from './Admin'
//Now
import Login from './Now/Login'
import Logout from './Now/Logout'
import UserView from './Now/UserView'
//Admin
import ALogin from './Admin/Login'
import ALogout from './Admin/Logout'
import View from './Admin/View';
import SignUp from './Admin/Signup'
import EditNews from './Admin/EditNews'


function App() {
  return (
    <>
      <Switch>

        <Route exact path="/">
          <NewsPost />
        </Route>

        {/* //Now */}
        <Route exact path="/Login">
          <Login />
        </Route>

        <Route exact path="/Logout">
          <Logout />
        </Route>

        <Route exact path="/User/News/:author">
          <UserView />
        </Route>

        {/* Admin  */}
        <Route exact path="/Login/Admin">
          <ALogin />
        </Route>

        <Route exact path="/Logout/Admin">
          <ALogout />
        </Route>

        <Route exact path="/Admin">
          <Admin />
        </Route>

        {/* <Route exact path="/Admin/View">
          <View Yes="" category=""/>
        </Route> */}

        <Route exact path="/Admin/SignUp">
          <SignUp />
        </Route>

        <Route exact path="/Admin/Edit/:id"> <EditNews /> </Route>
        {/* <Route exact path="/News"><View  category="" /></Route> */}
        <Route exact path="/Business"><View  category="Business" /></Route>
        <Route exact path="/Entertainment"><View  category="Entertainment" /></Route>
        <Route exact path="/Breaking"><View  category="Breaking" /></Route>
        <Route exact path="/Political"><View  category="Political" /></Route>
        <Route exact path="/Sports"><View  category="Sports" /></Route>
        <Route exact path="/Technology"><View  category="Technology" /></Route>

        <Route>
          <For />
        </Route>

      </Switch>
    </>
  );
}

export default App;
