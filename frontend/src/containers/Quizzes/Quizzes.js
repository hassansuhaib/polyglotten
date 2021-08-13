import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({ toolbar: theme.mixins.toolbar }))

const Quizzes = (props) => {
  const classes = useStyles()
  const view = props.match.params.view

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Settings'
  }, [])

  const renderView = () => {
    switch (view) {
      case 'hello':
        return <h1>Hello</h1>
      case 'mellow':
        return <h1>Mellow</h1>
      default:
        return <h1>Yellow</h1>
    }
  }

  return (
    <div>
      <div className={classes.toolbar} />
      <Container>
        <h1>Quizzes</h1>
        {renderView()}
      </Container>
    </div>
  )
}
export default Quizzes
