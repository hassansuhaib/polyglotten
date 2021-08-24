import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import history from '../../history'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography, Hidden } from '@material-ui/core'

import QuestionDetail from '../../components/Question/QuestionDetail'
import QuestionList from '../../components/Question/QuestionList'
import CreateQuestion from '../../components/Question/CreateQuestion'
import EditQuestion from '../../components/Question/EditQuestion'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  forum: {},
  toolbar: theme.mixins.toolbar,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  root: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
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
      case 'edit':
        return <EditQuestion id={questionId} />
      default:
        return <QuestionList />
    }
  }

  return (
    <div className={classes.forum}>
      <div className={classes.toolbar} />
      <Container>
        <Paper className={classes.root} elevation={3}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <div className={classes.header}>
                <Button color="primary">
                  <ArrowBackIcon onClick={() => history.goBack()} />
                </Button>
                <Typography variant="h3" component="h1">
                  Q/A Forum
                </Typography>
                {view === 'create' ? (
                  <div></div>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/forum/create"
                  >
                    Ask a Question
                  </Button>
                )}
              </div>
              {renderView()}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  )
}

export default Forum
