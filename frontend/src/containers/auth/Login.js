import React from 'react'
import { useDispatch } from 'react-redux'
import { authLogin } from '../../store/actions/auth'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import TextField from '../../components/form/TextField'
import Checkbox from '../../components/form/Checkbox'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Required')
    .max(150, "Can't be more than 150 characters"),
  password: Yup.string().required('Required'),
})

const Login = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const handleSubmit = ({ username, password }) => {
    console.log('Credentials: ', username, password)
    dispatch(authLogin(username, password))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box boxShadow={3} p={5}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
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
                  autoComplete="current-password"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                />
                <Checkbox name="show_password" label="Show password" />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {'Login'}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </Container>
  )
}

export default Login