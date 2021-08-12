import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({}))

const Search = () => {
  const classes = useStyles()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Search'
  }, [])

  return (
    <div>
      <h1>Search</h1>
    </div>
  )
}
export default Search
