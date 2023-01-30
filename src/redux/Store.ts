import { configureStore } from '@reduxjs/toolkit'
import repositoryReducer from "./RepositoryReducer";

const store = configureStore({
    reducer: repositoryReducer
  });
  
export default store;

  // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
