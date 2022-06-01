import {createSlice} from '@reduxjs/toolkit'

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shops: [],
        filter: null
    },
    reducers: {
        addShop: (state,action) => {
            state.shops.unshift(action.payload)
        },
        deleteShop: (state,action) => {
            state.shops = state.shops.filter(shop => shop.id !== action.payload)
        },
        updateShop: (state,action) => {
            state.shops = state.shops.map(shop => shop.id===action.payload.id && action.payload)
        },
        filterByArea: (state,action) => {
            state.filter = action.payload
        },
        filterByCategory: (state,action) => {
            state.categoryFilter = action.payload
        },
        filterByStatus: (state,action) => {
            state.statusFilter = action.payload
        }
    }
})

export const {addShop , deleteShop, updateShop, filterByArea, filterByCategory, filterByStatus} = shopSlice.actions
export default shopSlice.reducer