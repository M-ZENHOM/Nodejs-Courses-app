import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    currentUser: {
        _id: string
        name: string
        email: string
    } | null
}

const initialState: UserState = {
    currentUser: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState['currentUser']>) => {
            state.currentUser = action.payload;
        },
        userLogout: (state) => {
            state.currentUser = null
        },
    },
})

export const { setUser, userLogout } = userSlice.actions


export default userSlice.reducer