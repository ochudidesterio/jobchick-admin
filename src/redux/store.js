import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/UsersSlice.js"
import companyReducer from "./slices/CompaniesSlice"
import categoryReducer from "./slices/CategorySlice"
import jobsReducer from "./slices/JobsSlice"
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// Configuration for Redux persist
const persistConfig = {
    key: 'jobchick',
    storage,
  };
const persistedUsersReducer = persistReducer(persistConfig, usersReducer);
const persistedCompanyReducer = persistReducer(persistConfig,companyReducer)
const persistedJobReducer = persistReducer(persistConfig,jobsReducer)
const persistedCategoryReducer = persistReducer(persistConfig,categoryReducer)
//const persistedPropertiesReducer = persistReducer(persistConfig, propertiesReducer);
export const store = configureStore({
    reducer:{
        users:persistedUsersReducer,
        companies:persistedCompanyReducer,
        jobs:persistedJobReducer,
        categories:persistedCategoryReducer,
    }
})
export const persistor = persistStore(store);