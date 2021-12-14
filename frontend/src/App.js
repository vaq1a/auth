import {useReducer, useState, useEffect} from 'react';
import SignUp from "./components/SignUp";
import {reducer} from "./store/reducer";
import SignIn from "./components/SignIn";
import {userApi} from "./api/userApi";

function App() {
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
      auth: false,
      error: null,
      id: null,
      login: null,
      password: null,

  });

  const signOutHandle = () => {
      dispatch({
          type: 'SIGN_OUT',

      });

      setUsers([]);
      setUsersError(false);

      if (window.localStorage.getItem('token')) {
          window.localStorage.removeItem('token');
      }
  }

  const getAllUsers = async () => {
      const {message, users} = await userApi.getAll();

      if (message) return setUsersError(message);

      setUsers(users);
  }

  return (
      <>
          {
              state.auth ? (
                  <>
                      <div>
                          <div>Login: {state.login}</div>
                      </div>
                      <button onClick={signOutHandle}>Sign out</button>
                      <hr/>
                      <button onClick={getAllUsers}>Get all users</button>
                      {
                          users.length !== 0 && (
                              users.map(({_id, login, role}) => (
                                  <div key={_id}>
                                      {login}: {role[0]}
                                  </div>
                              ))
                          )
                      }
                      {
                          usersError && <div>{usersError}</div>
                      }
                  </>
              ) : (
                  <>
                      <SignUp state={state}
                              dispatch={dispatch} />
                      <SignIn state={state}
                              dispatch={dispatch} />
                  </>
              )
          }
      </>
  );
}

export default App;
