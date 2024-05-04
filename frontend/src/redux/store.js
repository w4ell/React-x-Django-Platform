import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./features/user/userSlice";

// Configuration for userReducer
const persistUserConfig = {
  key: "currentUser",
  storage,
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);

// Configuration for otherReducer (non-persisted)
const rootReducer = combineReducers({
  user: persistedUserReducer,
  /*other: otherReducer,*/
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
