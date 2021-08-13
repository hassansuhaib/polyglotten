import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))

const ChannelList = (props) => {
  const classes = useStyles()
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
        <List>
          <ListItem button>
            Topic: Why Spanish is famous? Language: Espanol Users: 3/4
          </ListItem>
          <ListItem button>
            Topic: Why Spanish is famous? Language: Espanol Users: 3/4
          </ListItem>
          <ListItem button>
            Topic: Why Spanish is famous? Language: Espanol Users: 3/4
          </ListItem>
          <ListItem button>
            Topic: Why Spanish is famous? Language: Espanol Users: 3/4
          </ListItem>
          <ListItem button>
            Topic: Why Spanish is famous? Language: Espanol Users: 3/4
          </ListItem>
        </List>
      </div>
    </div>
  )
}
export default ChannelList
