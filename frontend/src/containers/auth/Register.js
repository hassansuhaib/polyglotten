import React from 'react'
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/actions/auth'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import TextField from '../../components/Form/TextField'
import Checkbox from '../../components/Form/Checkbox'
import Select from '../../components/Form/Select'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'

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
  firstName: Yup.string()
    .required('Required')
    .max(100, "Can't be more than 150 characters"),
  lastName: Yup.string()
    .required('Required')
    .max(100, "Can't be more than 100 characters"),
  email: Yup.string()
    .email('This must be a valid email')
    .required('Required')
    .max(254, "Can't be more than 254 characters"),
  username: Yup.string()
    .required('Required')
    .max(150, "Can't be more than 150 characters"),
  password1: Yup.string()
    .required('Required')
    .min(8, 'Must be at least 8 characters long')
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      'Must have at least one number, one lowercase and one uppercase letter'
    ),
  password2: Yup.string().oneOf(
    [Yup.ref('password1'), null],
    'Passwords must match'
  ),
})

const Register = ({ location }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  // For redirection after login
  const { from } = location.state || { from: { pathname: '/' } }

  const handleSubmit = ({
    username,
    firstName,
    lastName,
    email,
    password1,
    password2,
    remember,
    gender,
  }) => {
    console.log(
      'Credentials: ',
      username,
      firstName,
      lastName,
      email,
      password1,
      password2,
      remember,
      gender
    )
    dispatch(
      signUp(
        username,
        firstName,
        lastName,
        email,
        password1,
        password2,
        gender,
        from
      )
    )
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
            initialValues={{
              username: '',
              firstName: '',
              lastName: '',
              email: '',
              password1: '',
              password2: '',
              remember: '',
              gender: '',
            }}
            validateOnChange={true}
            validationSchema={validationSchema}
          >
            {({ values }) => (
              <Form className={classes.form}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  autoFocus
                  fullWidth
                  required
                />
                <TextField
                  autoComplete="lname"
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  fullWidth
                  required
                />
                <TextField
                  autoComplete="email"
                  name="email"
                  id="email"
                  label="Email Address"
                  fullWidth
                  required
                />
                <Select name="gender" label="Gender">
                  <MenuItem value={'M'}>Male</MenuItem>
                  <MenuItem value={'F'}>Female</MenuItem>
                  <MenuItem value={'NS'}>Prefer not to say</MenuItem>
                </Select>
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
                  id="password1"
                  name="password1"
                  type={values.show_password ? 'text' : 'password'}
                  label="Password"
                  autoComplete="current-password"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                />
                <TextField
                  id="password2"
                  name="password2"
                  type={values.show_password ? 'text' : 'password'}
                  label="Password(again)"
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
                  {'Register'}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </Container>
  )
}

export default Register
