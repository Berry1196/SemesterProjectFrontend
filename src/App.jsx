import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "./index.css";
import { useEffect } from "react";
import facade from "./ApiFacade";

// routes
import Home from "./routes/Home";
import CreateUser from "./routes/CreateUser";
import Login from "./routes/Login";
import About from "./routes/About";
import AdminDashboard from "./routes/admin/Dashboard";
import UserDashboard from "./routes/user/Dashboard";
import AdminWorkouts from "./routes/admin/Workouts";
import UserWorkouts from "./routes/user/Workouts";
import AdminExercises from "./routes/admin/Exercises";

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

  const adminRoutes = (
    <Fragment>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/workouts" element={<AdminWorkouts />} />
      <Route path="/exercises" element={<AdminExercises />} />
    </Fragment>
  );

  const userRoutes = (
    <Fragment>
      <Route path="/" element={<UserDashboard username={username} />} />
      <Route path="/workouts" element={<UserWorkouts username={username} />} />
    </Fragment>
  );

  return (
    <Fragment>
      <Layout username={username} role={role}>
        <Routes>
          {role === "admin" ? adminRoutes : userRoutes}

          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateUser />} />
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
