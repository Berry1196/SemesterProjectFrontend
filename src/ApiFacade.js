function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  async function login(username, password) {
    const options = makeOptions("POST", true, {
      username: username,
      password: password,
    });
    const data = await fetch("http://localhost:8080/api/login", options);
    const res = await data.json();
    return res;
  }
  function createNewCar(car) {
    const options = makeOptions("POST", true, car);
    return fetch(URL + "http://localhost:8080/api/cars", options);
  }
  function createJoke(joke) {
    const options = makeOptions("POST", true, joke);
    return fetch(URL + "http://localhost:8080/api/cars/jokes", options);
  }
  //Create user fucntion
  async function createUser(user) {
    const options = makeOptions("POST", true, user);
    const data = await fetch(URL + "http://localhost:8080/api/signup", options);
    const res = await data.json();
    return res;
  }

  // create muscle photo
  async function generatePhoto(muscles) {
    const data = await fetch("http://localhost:8080/api/workouts/photo", {
      method: "POST",
      body: muscles,
    });
    const blob = await data.blob();
    const imageFile = new Blob([blob]);
    const imageUrl = URL.createObjectURL(imageFile);
    return imageUrl;
  }

  // fetch data and catch possible errors
  async function fetchAdminData() {
    const options = makeOptions("GET", true);
    const data = await fetch(URL + "http://localhost:8080/api/info/admin", options);
    return data.json();
  }

  async function fetchUserData() {
    const options = makeOptions("GET", true);
    const data = await fetch(URL + "http://localhost:8080/api/info/user", options);
    return data.json();
  }
  async function fetchData(url) {
    const options = makeOptions("GET", true);
    const data = await fetch(url, options);
    return data.json();
  }

  async function fetchExercises(muscle) {
    const options = makeOptions("GET", true);
    const data = await fetch("http://localhost:8080/api/workouts/" + muscle, options);
    return data.json();
  }

  function deleteCar(id) {
    const options = makeOptions("DELETE", true);
    return fetch(URL + "http://localhost:8080/api/cars/" + id, options);
  }

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  function readJwtToken(token) {
    // console.log('TOKEN opened with atob: ',window.atob(token));
    var base64Url = token.split(".")[1];
    // console.log(base64Url);
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // console.log(base64);
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchAdminData,
    fetchUserData,
    readJwtToken,
    fetchData,
    createNewCar,
    deleteCar,
    createJoke,
    fetchExercises,
    createUser,
    generatePhoto,
  };
}
const facade = apiFacade();
export default facade;
