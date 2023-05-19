import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loader({ variant="dark", calssName="" }) {
  return (
    <Spinner className='={className}' variant={variant} animation='border'>
        <span className='visually-hidden'>Loading...</span>
    </Spinner>
  )
}


