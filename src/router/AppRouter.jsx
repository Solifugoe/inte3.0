import { Navbar } from '../Navbar';
import { Homepage } from '../home/Homepage';
import { Loginpage } from '../login/Loginpage';
import { Registerpage } from '../register/Registerpage';
import { Grafpage } from '../graficas/Grafpage';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig/firebase';

export const AppRouter = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Loginpage />} />
        <Route path="register" element={<Registerpage />} />
        {user && (
          <Route
            path="/graficas"
            element={
              <PrivateRoute isLoggedIn={!!user}>
                <Grafpage />
              </PrivateRoute>
            }
          />
        )}
      </Routes>
    </>
  );
};
