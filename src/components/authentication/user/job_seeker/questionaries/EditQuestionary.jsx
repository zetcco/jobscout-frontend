import { CircularProgress } from '@mui/material'
import React, { createRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AddQuestionary } from './AddQuestionary'
import { serverClient } from 'features/authSlice'

export const EditQuestionary = () => {

    const [ questionRefs, setQuestionRefs ] = useState([])
    const [ request, setRequest ] = useState({})
    const [ loading, setLoading ] = useState(false)
    const { questionaryId } = useParams()

    useEffect(() => {
        if (questionaryId) {
            const fetchData = async () => {
                setLoading(true)
                const response = await serverClient.get(`/questionary/${questionaryId}`)
                const { id, attemptCount, description, name, timePerQuestion, badge } = response.data
                setQuestionRefs(response.data.questions.map(question => ({ init: question, ref: createRef() })))
                setRequest({ request: { id, attemptCount, description, name, timePerQuestion: timePerQuestion/1000, badge }})
                setLoading(false)
            }
            fetchData()
        }
    }, [])

    if (loading)
        return <CircularProgress/>

    return (
        <AddQuestionary initQuestionRefs={questionRefs} initRequest={request} initEdit={false}/>
    )
}
