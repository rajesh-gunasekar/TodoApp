import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/todoReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        userReducer: userReducer,
        todoReducer: todoReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;