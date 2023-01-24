import { styled } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  '&:active, &:visited': {
    color: 'inherit'
  },
}))

export const RouterLink = ({ to, children }) => {
  return (
    <StyledLink to={to}>{ children }</StyledLink>
  )
}
