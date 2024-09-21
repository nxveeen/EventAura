import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSilce'

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
        }
    })
}