import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const ADDRESS_API_URL = "https://www.universal-tutorial.com/api";
const ADDRESS_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJrcmFuaWV0aXNtZUBnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJETmxYWWdMeTJNMTVUczAxSzU2LWg2Tl9zakpqRFJQSEljTXJwYU1ncDRyRkNaby1lYWZ4V0JCdDk0ZTFjMlhGUzlFIn0sImV4cCI6MTY3NTc0MDE0Mn0.-l5jTNPq9kh6Rn3vwSk16tt_YZs_r_EpqqJsqF07jpM";

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
    const response = await axios.get(`${ADDRESS_API_URL}/countries`, {
        headers: {
            "Authorization": `Bearer ${ADDRESS_API_KEY}`,
            "Accept": "application/json"
        }
    })
    return response.data.map((country) => country.country_name);
});

export const fetchProvince = createAsyncThunk('address/province', async (country) => {
    const response = await axios.get(`${ADDRESS_API_URL}/states/${country}`, {
        headers: {
            "Authorization": `Bearer ${ADDRESS_API_KEY}`,
            "Accept": "application/json"
        }
    })
    return response.data.map((state) => state.state_name);
})

export const fetchCities = createAsyncThunk('address/cities', async (state) => {
    const response = await axios.get(`${ADDRESS_API_URL}/cities/${state}`, {
        headers: {
            "Authorization": `Bearer ${ADDRESS_API_KEY}`,
            "Accept": "application/json"
        }
    })
    return response.data.map((city) => city.city_name);
})