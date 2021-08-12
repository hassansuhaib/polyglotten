import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../store/actions/auth'
import { showError } from '../../utils'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import TextField from '../../components/Form/TextField'
import Checkbox from '../../components/Form/Checkbox'
import Select from '../../components/Form/Select'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import { Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  register: {
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  names: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      flexBasis: '45%',
    },
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
  const status = useSelector((state) => state.auth)
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
    <div className={classes.paper}>
      <div className={classes.toolbar} />
      <Container>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item xs={12} md={8} lg={4}>
            <Box boxShadow={3} p={5} className={classes.register}>
              <div className={classes.text}>
                <Typography component="h2" variant="h5">
                  Register
                </Typography>
              </div>
              <div className={classes.text}>
                <Typography variant="subtitle1" component="p" color="error">
                  {showError(status.error)}
                </Typography>
              </div>
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
                  gender: 'M',
                }}
                validateOnChange={true}
                validationSchema={validationSchema}
              >
                {({ values }) => (
                  <Form className={classes.form}>
                    <div className={classes.names}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        id="firstName"
                        label="First Name"
                        autoFocus
                        required
                      />
                      <TextField
                        autoComplete="lname"
                        name="lastName"
                        id="lastName"
                        label="Last Name"
                        required
                      />
                    </div>
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
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Register
