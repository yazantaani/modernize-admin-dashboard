import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authReducer from './Auth/authSlice'; 
import userReducer from "./App/userSlice"; 
import shipmentReducer from "./App/shipmentSlice";
import companyReducer from "./App/companySlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    shipment: shipmentReducer,
    company: companyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
