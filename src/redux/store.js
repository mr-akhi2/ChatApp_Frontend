import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import AllUsersSlice from "./AllUsers.js";
import chatSlice from "./ChatSlice.js";
import socketSlice from "./socketSlice.js";
import online from "./OnlineUsers.js";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  AllUsers: AllUsersSlice,
  chat: chatSlice,
  socketio: socketSlice,
  online: online,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
