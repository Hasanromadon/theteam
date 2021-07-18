import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  showErrorToast,
  showSuccessToast,
  textErrorHelper,
  SelectErrorHelper,
  SelectIsError,
} from '../../utils/tools';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
} from '@material-ui/core';
import { playersCollection, firebase } from '../../../firebase';

const defaultValues = {
  name: '',
  lastname: '',
  number: '',
  position: '',
};

const AddEditPlayers = (props) => {
  const [formType, setFormType] = useState('');
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(defaultValues);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required('This input is required'),
      lastname: Yup.string().required('This input is required'),
      number: Yup.number()
        .required('This input is required')
        .min(0, 'The minimum is cero')
        .max(100, 'The max is 100'),
      position: Yup.string().required('This input is required'),
    }),

    onSubmit: (values) => {
      submitForm(values);
    },
  });

  useEffect(() => {
    const param = props.match.params.playerid;
    if (param) {
      playersCollection
        .doc(param)
        .get()
        .then((snapshoot) => {
          if (snapshoot.data()) {
          } else {
            showErrorToast('Nothing was not found');
          }
          setValues(snapshoot.data());
        })
        .catch((error) => showErrorToast(error));

      setFormType('edit');
    } else {
      setFormType('add');
      setValues(defaultValues);
    }
  }, [props.match.params.playerid]);

  console.log(formType, values);

  const submitForm = (values) => {
    let dataToSumbit = values;
    setLoading(true);
    if (formType === 'add') {
      playersCollection
        .add(dataToSumbit)
        .then(() => {
          showSuccessToast('Player Added');
          formik.resetForm();
          props.history.push('/Admin_players');
        })
        .catch((error) => showErrorToast(error));
    } else {
      playersCollection
        .doc(props.match.params.played)
        .update(dataToSumbit)
        .then(() => {
          showSuccessToast('Player Updated');
        })
        .catch((error) => showErrorToast('Error Update'))
        .finally(() => setLoading(false));
    }
  };

  return (
    <AdminLayout title={formType === 'add' ? 'Add Player' : 'Edit Player'}>
      <div className="editplayers_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            image
            <hr />
            <h4>Player Info</h4>
            <div className="mb-5">
              <FormControl>
                {/* formik getField copy kaya onsumbit, onchange ke text field */}
                <TextField
                  id="name"
                  variant="outlined"
                  placeholder="Add firstname"
                  {...formik.getFieldProps('name')}
                  {...textErrorHelper(formik, 'name')}
                  // copy all return value from textError
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                {/* formik getField copy kaya onsumbit, onchange ke text field */}
                <TextField
                  id="lastname"
                  variant="outlined"
                  placeholder="Add lastname"
                  {...formik.getFieldProps('lastname')}
                  {...textErrorHelper(formik, 'lastname')}
                  // copy all return value from textError
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                {/* formik getField copy kaya onsumbit, onchange ke text field */}
                <TextField
                  id="number"
                  variant="outlined"
                  placeholder="Add Number"
                  {...formik.getFieldProps('number')}
                  {...textErrorHelper(formik, 'number')}
                  // copy all return value from textError
                />
              </FormControl>
            </div>
            <div className="mb-5">
              {/* formik getField copy kaya onsumbit, onchange ke text field */}
              <FormControl>
                <Select
                  id="position"
                  variant="outlined"
                  placeholder="Add Number"
                  {...formik.getFieldProps('position')}
                  // copy all return value from textError
                  displayEmpty
                  error={SelectIsError(formik, 'position')}
                >
                  <MenuItem value="" disabled>
                    Select position
                  </MenuItem>
                  <MenuItem value="Keeper">Keeper</MenuItem>
                  <MenuItem value="Defence">Defence</MenuItem>
                  <MenuItem value="MidField">MidField</MenuItem>
                  <MenuItem value="Striker">Striker</MenuItem>
                </Select>
                {SelectErrorHelper(formik, 'position')}
              </FormControl>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {' '}
              {formType === 'add' ? 'Add Player' : 'Edit Player'}{' '}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEditPlayers;
