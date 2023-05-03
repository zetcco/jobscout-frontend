import axios from 'axios'
import { selectAuthUserToken } from 'features/authSlice'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const BlogPost = () => {

  const { postId } = useParams();
  const authToken = useSelector(selectAuthUserToken);
  const [ blogContent , setBlogContent ] = useState('');

  useEffect(() => {
    loadPage()
  }, [])

  const loadPage = async () => {
    const response = await axios.get(`/posts/${postId}`, { headers: { Authorization: `Bearer ${authToken}` } })
    console.log(response);
  }

  return (
    <div>
      { postId }
    </div>
  )
}
