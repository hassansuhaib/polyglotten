import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography, Hidden } from '@material-ui/core'

import QuestionDetail from '../../components/Question/QuestionDetail'
import QuestionList from '../../components/Question/QuestionList'
import CreateQuestion from '../../components/Question/CreateQuestion'

const useStyles = makeStyles((theme) => ({
  forum: {},
  toolbar: theme.mixins.toolbar,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))

const Forum = (props) => {
  const classes = useStyles()
  const view = props.match.params.view
  const questionId = props.match.params.id

  useEffect(() => {
    document.title = 'Forum'
  }, [])

  const renderView = () => {
    switch (view) {
      case 'question':
        return <QuestionDetail id={questionId} />
      case 'create':
        return <CreateQuestion />
      default:
        return <QuestionList />
    }
  }

  return (
    <div className={classes.forum}>
      <div className={classes.toolbar} />
      <Container>
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/"
        >
          Home
        </Button>
        <Grid container>
          <Grid item xs={12} lg={12}>
            <div className={classes.header}>
              <Typography variant="h3" component="h1">
                Q/A Forum
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/forum/create"
              >
                Ask a Question
              </Button>
            </div>
            {renderView()}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Forum
