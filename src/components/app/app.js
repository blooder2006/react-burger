import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "./app.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllIngredients,
  checkUserAuth,
} from "../../services/actions/actions";
import { BASE_URL, DATA_ENDPOINT } from "../../utils/urls";
import { FILL_INGREDIENTS_LIST } from "../../services/actions/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ProtectedRoute } from "../protected-route";
import { NotFoundPage } from "../../pages/not-found-404";

const App = () => {
  const { isAuthChecked } = useSelector((store) => store.profileReducer);
  const dispatch = useDispatch();
  const { allIngredients } = useSelector(
    (store) => store.getAllIngredientsReducer
  );
  const { modalVisible } = useSelector((store) => store.modalReducer);
  React.useEffect(() => {
    dispatch(getAllIngredients(`${BASE_URL}${DATA_ENDPOINT}`));
    dispatch(checkUserAuth());
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
    const location = useLocation();
    let background = location.state && location.state.background;

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
                <ProtectedRoute element={<ProfilePage />}></ProtectedRoute>
              }
            >
              <Route path="orders" element={<div>Loading</div>}>
                <Route path=":id" element={<div>Loading</div>} />
              </Route>
            </Route>
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
                  onlyEmailProvided
                  element={<ResetPasswordPage />}
                ></ProtectedRoute>
              }
            />
            <Route path="/ingredients/:id" element={<IngredientDetails />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path="/ingredients/:id"
                element={modalVisible && <Modal />}
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
