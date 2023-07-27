import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/UsersSlice.js"
import companyReducer from "./slices/CompaniesSlice"
import categoryReducer from "./slices/CategorySlice"
import jobsReducer from "./slices/JobsSlice"
import typesReducer from "./slices/TypesSlice"
import regionsReducer from "./slices/RegionSlice"
import packageReducer from "./slices/PremiumSlice"
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
const persistedTypesReducer = persistReducer(persistConfig,typesReducer)
const persistedRegionsReducer = persistReducer(persistConfig,regionsReducer)
const persistPackageReducer = persistReducer(persistConfig,packageReducer)
//const persistedPropertiesReducer = persistReducer(persistConfig, propertiesReducer);
export const store = configureStore({
    reducer:{
        users:persistedUsersReducer,
        companies:persistedCompanyReducer,
        jobs:persistedJobReducer,
        categories:persistedCategoryReducer,
        types:persistedTypesReducer,
        regions:persistedRegionsReducer,
        packages:persistPackageReducer,
    }
})
export const persistor = persistStore(store);