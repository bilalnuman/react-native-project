import React from 'react'
import useHome from '../hooks/useHome'
import HomeTable from '../components/HomeList'

export default function HomeScreen() {
  const { name } = useHome()
  return (
    <>
      <HomeTable />
    </>
  )
}