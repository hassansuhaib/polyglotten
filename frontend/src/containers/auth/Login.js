import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../store/actions/auth'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import TextField from '../../components/Form/TextField'
import Checkbox from '../../components/Form/Checkbox'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  login: {
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
  },
  buttons: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Required')
    .max(150, "Can't be more than 150 characters"),
  password: Yup.string().required('Required'),
})

const Login = ({ location }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  // For redirection after login
  const { from } = location.state || { from: { pathname: '/' } }
  const handleSubmit = ({ username, password }) => {
    console.log('Credentials: ', username, password)
    dispatch(login(username, password, from))
  }

  return (
    <div className={classes.paper}>
      <Container>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item xs={12} md={8} lg={4}>
            <Box boxShadow={3} p={5} className={classes.login}>
              <div className={classes.text}>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
              </div>
              <Formik
                onSubmit={handleSubmit}
                initialValues={{ username: '', password: '', remember: '' }}
                validateOnChange={true}
                validationSchema={validationSchema}
              >
                {({ values }) => (
                  <Form className={classes.form}>
                    <TextField
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      type="text"
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                    />
                    <TextField
                      id="password"
                      name="password"
                      type={values.show_password ? 'text' : 'password'}
                      label="Password"
                      autoComplete="password"
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                    />
                    <Checkbox name="show_password" label="Show password" />
                    <div className={classes.buttons}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        {'Login'}
                      </Button>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                      >
                        {'Login with Google'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Login
