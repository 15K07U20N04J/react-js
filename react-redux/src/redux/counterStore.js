import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

export const counterStore = configureStore({
    reducer: {
        counter : counterReducer
    },
})