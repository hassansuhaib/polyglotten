import React from 'react'
import { useField } from 'formik'

import { Checkbox as MCheckbox } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const Checkbox = ({ label, ...props }) => {
  const [field] = useField(props)
  return (
    <FormControlLabel
      control={<MCheckbox color="primary" />}
      label={label}
      {...field}
    />
  )
}

export default Checkbox
