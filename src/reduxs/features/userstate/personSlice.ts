/**
 * src\reduxs\features\userstate\userSlice.ts
 *
 * Here, we have the regulate of the user state/status.
 * Generally, the user's state can has  for of states. It's:
 *   CATEGORY_BASE = "ADMIN",
 *   CATEGORY_DRIVER = "USER",
 *   CATEGORY_MANAGER = "SUPER_ADMIN",
 *   CATEGORY_CLIENT = "ANONYMOUSUSER"
 * In now time as a working only two states. It's "USER" and "ANONYMOUSUSER".
 */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { StatePerson, UserStatus } from '@interfeces';

const clearState: StatePerson = {
    email: '',
    password: '',
    status: UserStatus.CATEGORY_CLIENT,
    username: '',
};

/* CHECKR Local Storage
Return false or json's strrin from data of 'person'.
*/
const lsPerson = localStorage.getItem('person');

export let initialState: typeof clearState | object = clearState;

if (lsPerson) {
    initialState = JSON.parse(lsPerson) as object;
    (initialState as typeof clearState).status = UserStatus.CATEGORY_DRIVER;
}

/**
 * https://redux-toolkit.js.org/api/createSlice
 * Here, we working with a statse of the user.
 * @initialState {initialState} initialState
 */
const personSlice = createSlice({
    name: 'personstate',
    initialState,
    reducers: {
        resetPerson: () => {
            localStorage.removeItem('person');
            return clearState;
        },
        setPerson: (state, action: PayloadAction<StatePerson>) => {
            state = action.payload;
            return { ...state };
        },
    },
});

export const { setPerson, resetPerson } = personSlice.actions;
export default personSlice.reducer;
