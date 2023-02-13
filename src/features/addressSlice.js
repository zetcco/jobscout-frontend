import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    countries: [],
    province: [],
    cities: []
}

export const selectCountries = (state) => state.address.countries;
export const selectProvince = (state) => state.address.province;
export const selectCities = (state) => state.address.cities;

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.countries = action.payload
            })
            .addCase(fetchProvince.fulfilled, (state, action) => {
                state.province = action.payload
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.cities = action.payload
            })
    }
})
export default addressSlice.reducer;

export const fetchCountries = createAsyncThunk('address/countries', async () => {
    const response = await axios.get(`/address/countries`);
    return response.data.map((country) => country.name);
});

export const fetchProvince = createAsyncThunk('address/province', async (country) => {
    const response = await axios.get(`/address/states/${country}`)
    return response.data.map((state) => state.name);
})

export const fetchCities = createAsyncThunk('address/cities', async (state) => {
    const response = await axios.get(`/address/cities/${state}`)
    return response.data.map((city) => city.name);
})