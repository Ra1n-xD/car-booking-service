'use client';

import { configureStore } from '@reduxjs/toolkit';
import counter from './features/counter/counterSlice';

export const store = configureStore({
    reducer: { counter },
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
