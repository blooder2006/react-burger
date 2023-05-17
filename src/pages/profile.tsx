import React from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import styles from "./pages.module.css";
import {  patchUser } from "../services/actions/user-actions";
import { BASE_URL, USER_INFO_ENDPOINT } from "../utils/urls";
import { IPatchUserRequest } from "../utils/interfaces-and-types";
import { useDispatch, useSelector } from "../utils/hooks";

export const ProfilePage: React.FC = () => {
  const [userPassword, setUserPassword] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [buttonsAreHidden, setButtonsAreHidden] = React.useState(true);
  const { userProfile } = useSelector(
    (store) => store.profileReducer
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (userProfile) {
      setUserEmail(userProfile.email);
      setUserName(userProfile.name);
    }
  }, [userProfile]);

  React.useEffect(() => {
    if (userProfile) {
      if (
        userName !== userProfile.name ||
        userEmail !== userProfile.email ||
        userPassword !== ""
      ) {
        setButtonsAreHidden(false);
      }
      if (
        userName === userProfile.name &&
        userEmail === userProfile.email &&
        userPassword === ""
      ) {
        setButtonsAreHidden(true);
      }
    }
  }, [userPassword, userEmail, userName]);

  const handleChange = (e: React.ChangeEvent) => {
    switch ((e.target as HTMLInputElement).name) {
      case "userPassword": {
        setUserPassword((e.target as HTMLInputElement).value);

        break;
      }
      case "userEmail": {
        setUserEmail((e.target as HTMLInputElement).value);
        break;
      }
      case "userName": {
        setUserName((e.target as HTMLInputElement).value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleCancelClick = () => {
    setUserEmail(userProfile!.email);
    setUserName(userProfile!.name);
    setUserPassword("");
  };

  const handleSaveClick = () => {
    const userAttrs: IPatchUserRequest = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };
    dispatch(patchUser(`${BASE_URL}${USER_INFO_ENDPOINT}`, userAttrs));
  };

  return (
    <>
      <div className={`${styles.profilePage}`}>
        <form onSubmit={handleSaveClick}>
          <div className={`${styles.profileInputs}`}>
            <div>
              <EmailInput
                placeholder={"Имя"}
                name="userName"
                value={userName}
                onChange={handleChange}
                isIcon={true}
              />
            </div>
            <div className={`mt-6`}>
              <EmailInput
                placeholder={"Логин"}
                name="userEmail"
                value={userEmail}
                onChange={handleChange}
                isIcon={true}
              />
            </div>
            <div className={`mt-6`}>
              <PasswordInput
                placeholder={"Пароль"}
                name="userPassword"
                value={userPassword}
                onChange={handleChange}
                icon={"EditIcon"}
              />
            </div>
          </div>

          {buttonsAreHidden ? null : (
            <div className={`${styles.bottomButtons} mt-6`}>
              <div>
                <Button
                  htmlType="button"
                  type="secondary"
                  onClick={handleCancelClick}
                >
                  Отмена
                </Button>
              </div>
              <div>
                <Button htmlType="submit" type="primary">
                  Сохранить
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
