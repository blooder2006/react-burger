import type { Middleware, MiddlewareAPI } from "redux";
import type {
  TApplicationActions,
  IMessageResponse,
  AppDispatch,
  RootState,
} from "../utils/interfaces-and-types";
import type { TWSStoreActions } from "../services/actions/ws-actions";

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage, onMessageOrders } =
        wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${action.payload}`);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          
          const eventTarget: any = event.target;
          
          const parsedData: IMessageResponse = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          eventTarget.url.includes("?token=") ?
          dispatch({
            type: onMessageOrders,
            payload: {
              ...restParsedData,
            },
          }) : dispatch({
            type: onMessage,
            payload: {
              ...restParsedData,
            },
          });


        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const payload = action.payload;

          socket.send(JSON.stringify(payload));
        }
      }

      next(action);
    };
  }) as Middleware;
};
