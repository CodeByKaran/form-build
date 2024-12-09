"use client"
import React from 'react'
import { signIn } from "next-auth/react"

const Signin = () => {
  return (
    <div>
      <button onClick={()=>signIn("google")}>Login</button>
    </div>
  )
}

export default Signin
