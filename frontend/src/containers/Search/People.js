import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({}))

const People = ({ people }) => {
  const classes = useStyles()
  const renderPerson = (person) => {
    return (
      <React.Fragment key={person.id}>
        <ListItem
          button
          component={RouterLink}
          to={`profile/${person.user.username}`}
          alignItems="flex-start"
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={person.profile_photo} />
          </ListItemAvatar>
          <ListItemText
            primary={`${person.user.first_name} ${person.user.last_name}`}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  @{person.user.username}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    )
  }
  return (
    <div>
      <List>
        {people ? (
          people.map((person) => renderPerson(person))
        ) : (
          <Typography>No people found</Typography>
        )}
      </List>
    </div>
  )
}
export default People
