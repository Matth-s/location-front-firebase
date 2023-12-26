import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch } from './store/store';
import { checkUserStatusService } from './services/auth-service';

import PrivateRoute from './utils/PrivateRoutes';
import MaterialPage from './pages/material-page/MaterialPage';
import LoginPage from './pages/login-page/LoginPage';
import ViewMaterialPage from './pages/view-material-page/ViewMaterialPage';
import CreateMaterialPage from './pages/create-material-page/CreateMaterialPage';
import BookingPage from './pages/booking-page/BookingPage';
import ViewBookingPage from './pages/view-booking-page/ViewBookingPage';
import MessagingPage from './pages/messaging-page/MessagingPage';
import ViewMessagingPage from './pages/view-messaging-page/ViewMessagingPage';
import Loader from './components/loader/Loader';

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      await dispatch(checkUserStatusService()).finally(() =>
        setIsLoading(false)
      );
    };

    getCurrentUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/materiel" element={<MaterialPage />} />
            <Route
              path="/materiel/:id"
              element={<ViewMaterialPage />}
            />
            <Route
              path="/ajouter-un-materiel"
              element={<CreateMaterialPage />}
            />

            <Route path="/reservation" element={<BookingPage />} />
            <Route
              path="/reservation/:id"
              element={<ViewBookingPage />}
            />
            <Route path="/messagerie" element={<MessagingPage />} />
            <Route
              path="/messagerie/:id"
              element={<ViewMessagingPage />}
            />
          </Route>
          <Route path="/" element={<Navigate to={'/materiel'} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to={'/materiel'} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
