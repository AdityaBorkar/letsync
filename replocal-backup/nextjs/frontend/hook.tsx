'use client'

import { useContext } from 'react'

import { ReplocalContext } from './provider'

export default function useReplocal() {
  const { db } = useContext(ReplocalContext)
}
