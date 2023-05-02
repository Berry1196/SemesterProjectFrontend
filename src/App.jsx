import { Fragment, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Layout from "./components/Layout";
import "./index.css";
import { useEffect } from "react";
import facade from "./ApiFacade";
import AdminHome from "./routes/AdminHome";
import UserHome from "./routes/UserHome";

function App() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    if (facade.loggedIn()) {
      const token = facade.getToken();
      let username = facade.readJwtToken(token).username;
      let role = facade.readJwtToken(token).roles;
      setUsername(username);
      setRole(role);
    }
  }, []);

  return (
    <Fragment>
      <Layout username={username} role={role}>
        <Routes>
          {facade.loggedIn() && role === "admin" && (
            <Route
              path='/'
              element={
                <AdminHome username={username} setRole={setRole} role={role} />
              }
            />
          )}
          {facade.loggedIn() && role === "user" && (
            <Route
              path='/'
              element={<UserHome username={username} role={role} />}
            />
          )}
          {!facade.loggedIn() && (
            <Route
              path='/'
              element={<Home username={username} role={role} />}
            />
          )}
          <Route path='/login' element={<Login />} />
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
