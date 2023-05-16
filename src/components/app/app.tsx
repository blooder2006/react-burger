import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import { FeedPage } from "../../pages/feed";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "./app.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import BurgerDetails from "../burger-details/burger-details";
import OrdersList from "../orders-list/orders-list";
import { ProfileMenu } from "../profile-menu/profile-menu";
import { getAllIngredients } from "../../services/actions/ingredients-actions";
import { checkUserAuth } from "../../services/actions/user-actions";
import { BASE_URL, DATA_ENDPOINT } from "../../utils/urls";
import { FILL_INGREDIENTS_LIST } from "../../services/actions/ingredients-actions";
import { HIDE_MODAL } from "../../services/actions/modal-actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ProtectedRoute } from "../protected-route";
import { NotFoundPage } from "../../pages/not-found-404";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../utils/hooks";
import { IBackground } from "../../utils/interfaces-and-types";

const App: React.FC = () => {
  
  const { isAuthChecked } = useSelector(
    (store) => store.profileReducer
  );
  
  const dispatch = useDispatch();
  const { allIngredients } = useSelector(
    (store) => store.getAllIngredientsReducer
  );

  React.useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getAllIngredients(`${BASE_URL}${DATA_ENDPOINT}`));
    
  }, [dispatch]);

  React.useEffect(() => {
    if (allIngredients.length > 0) {
      const bunList = allIngredients
        .filter((elem) => elem.type === "bun")
        .map((elem) => ({ ...elem, counter: 0 }));
      const sauceList = allIngredients
        .filter((elem) => elem.type === "sauce")
        .map((elem) => ({ ...elem, counter: 0 }));
      const mainList = allIngredients
        .filter((elem) => elem.type === "main")
        .map((elem) => ({ ...elem, counter: 0 }));
      dispatch({
        type: FILL_INGREDIENTS_LIST,
        bunList: bunList,
        sauceList: sauceList,
        mainList: mainList,
      });
    }
  }, [allIngredients]);

  const ModalSwitch = () => {
    const navigate = useNavigate();
    const handleModalClose = () => {
      dispatch({
        type: HIDE_MODAL,
      });
      navigate(-1);
    };

    const location = useLocation();
    const background: IBackground = location.state && location.state.background;

    return (
      <div>
        <AppHeader />
        <main className={styles.container}>
          <Routes location={background || location}>
            <Route
              path="/"
              element={
                allIngredients && (
                  <>
                    <DndProvider backend={HTML5Backend}>
                      <BurgerIngredients />
                      <BurgerConstructor />
                    </DndProvider>
                  </>
                )
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  onlyUnAuth
                  element={<LoginPage />}
                ></ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  onlyUnAuth={false}
                  element={
                    <>
                      <ProfileMenu />
                      <ProfilePage />
                    </>
                  }
                ></ProtectedRoute>
              }
            />
            <Route
              path="/profile/orders"
              element={
                <ProtectedRoute
                  onlyUnAuth={false}
                  element={
                    <>
                      <ProfileMenu />
                      <OrdersList />
                    </>
                  }
                ></ProtectedRoute>
              }
            />
            <Route
              path="/profile/orders/:id"
              element={
                <ProtectedRoute
                  onlyUnAuth={false}
                  element={<BurgerDetails />}
                ></ProtectedRoute>
              }
            />

            <Route
              path="/register"
              element={
                <ProtectedRoute
                  onlyUnAuth
                  element={<RegisterPage />}
                ></ProtectedRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRoute
                  onlyUnAuth
                  element={<ForgotPasswordPage />}
                ></ProtectedRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRoute
                  onlyUnAuth
                  element={<ResetPasswordPage />}
                ></ProtectedRoute>
              }
            />
            <Route path="/ingredients/:id" element={<IngredientDetails />} />
            <Route path="*" element={<NotFoundPage />} />

            <Route path="/feed" element={<FeedPage />} />
            <Route path="/feed/:id" element={<BurgerDetails />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path="/ingredients/:id"
                element={
                  <div className={`${styles.modal}`}>
                    <Modal onClose={handleModalClose}>
                      <IngredientDetails />
                    </Modal>
                  </div>
                }
              />
              <Route
                path="/feed/:id"
                element={
                  <div className={`${styles.modal}`}>
                    <Modal onClose={handleModalClose}>
                      <BurgerDetails />
                    </Modal>
                  </div>
                }
              />
              <Route
                path="/profile/orders/:id"
                element={
                  <div className={`${styles.modal}`}>
                    <Modal onClose={handleModalClose}>
                      <BurgerDetails />
                    </Modal>
                  </div>
                }
              />
            </Routes>
          )}
        </main>
      </div>
    );
  };
  return isAuthChecked ? (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  ) : null;
};

export default App;
