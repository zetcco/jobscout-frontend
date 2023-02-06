import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, fetchCountries, fetchProvince, selectCities, selectCountries, selectProvince } from '../features/addressSlice';

export const useAddress = (watchCountry, watchProvince) => {

    const dispatch = useDispatch();

    const countries = useSelector(selectCountries);
    const provice = useSelector(selectProvince);
    const cities = useSelector(selectCities);

    useEffect(() => {
        dispatch(fetchCountries())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchProvince(watchCountry))
    }, [dispatch, watchCountry])

    useEffect(() => {
        dispatch(fetchCities(watchProvince))
    }, [dispatch, watchProvince])

    return {countries, provice, cities}
}
