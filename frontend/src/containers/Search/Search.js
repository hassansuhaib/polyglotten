import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({}))

const Search = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Search'
  }, [])

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Search</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </React.Fragment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Search Results</Typography>
        </Grid>
      </Grid>
    </div>
  )
}
export default Search
