import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))

const ChannelList = (props) => {
  const classes = useStyles()
  const [state, setState] = useState(null)
  useEffect(() => {
    const getChannels = () => {
      api.get(urls.channels).then((response) => setState(response.data))
    }
  }, [])

  const renderChannels = () => {
    if (state) {
      return state.map((channel) => (
        <React.Fragment key={channel.id}>
          <ListItem button>
            <ListItemText
              primary={channel.topic}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Language: {channel.language}
                  </Typography>
                  Users: {channel.number_of_users}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))
    } else {
      return <Typography>No active channels.</Typography>
    }
  }

  return (
    <div>
      <div className={classes.header}>
        <h1>ChannelList</h1>
        <Button
          variant="contained"
          component={RouterLink}
          to="/channels/create"
        >
          Create Channel
        </Button>
      </div>
      <div>
        <List>{renderChannels()}</List>
      </div>
    </div>
  )
}
export default ChannelList
