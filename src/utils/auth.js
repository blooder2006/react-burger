import { BASE_URL, REFRESH_TOKEN_ENDPOINT } from "./urls";
import { checkResponse } from "./check-response";

export function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
export function setCookie(name, value, props) {
props = props || {};
let exp = props.expires;
if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
}
if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
}
value = encodeURIComponent(value);
let updatedCookie = name + '=' + value;
for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
    updatedCookie += '=' + propValue;
    }
}
document.cookie = updatedCookie;
}

export function deleteCookie(name) {
setCookie(name, null, { expires: -1 });
}

export const saveTokens = (refreshToken, accessToken) => {
  setCookie("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const refreshTokenRequest = (url, tokenEndpoint) => {
  return fetch(`${url}${tokenEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const { refreshToken, accessToken } = await refreshTokenRequest(BASE_URL, REFRESH_TOKEN_ENDPOINT);
      saveTokens(refreshToken, accessToken.split('Bearer ')[1]);
      options.headers.authorization = accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
