import React, { useEffect, useState } from 'react'
import CreateBlogPostForm from './CreateBlogPostForm'
import { useParams } from 'react-router'
import { useFetch } from 'hooks/useFetch'
import { CircularProgress } from '@mui/material'

export const BlogPostEdit = () => {

    const [blogPost,setBlogPost] = useState(null);
    const [loading, setLoading] = useState(false)
    const fetch = useFetch()
    const { postId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await fetch(`/posts/${postId}`, "GET", { onSuccess: setBlogPost })
            setLoading(false)
        }
        fetchData()
    },[])

    if (loading)
        return <CircularProgress/>

    return (
        <CreateBlogPostForm initContent={blogPost}/>
    )
}
