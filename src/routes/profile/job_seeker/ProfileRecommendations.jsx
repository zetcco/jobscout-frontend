import axios from 'axios'
import { selectAuthUserToken } from 'features/authSlice'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const ProfileRecommendations = () => {

    const { userId } = useParams()
    const authToken = useSelector(selectAuthUserToken)

    useEffect(() => {
        const fetchRecommendations = async () => {
        }
    }, [userId, authToken])

    return (
        <div>ProfileRecommendations</div>
    )
}
