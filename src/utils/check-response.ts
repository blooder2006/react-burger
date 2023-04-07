interface IResponse {
  ok: boolean;
  status: number;
  body?: any;
  json: ()=> any;
}

export const checkResponse = (res: IResponse) => {
  return res.ok ? res.json() : res.json().then((err: Error) => Promise.reject(err));
};
