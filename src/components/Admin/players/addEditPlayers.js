import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';
import Fileuploader from '../../utils/fileUploader';

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
  image: '',
};

const AddEditPlayers = (props) => {
  const [formType, setFormType] = useState('');
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(defaultValues);
  const [defaultImg, setDefaultImg] = useState('');

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
      image: Yup.string().required('Image is required'),
    }),

    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const updateImageName = (filename) => {
    // data didapat dari props FileUploader lalu ditambhkan field formik
    formik.setFieldValue('image', filename);
  };

  //akan berjalan untuk hapus gambar
  const resetImage = () => {
    formik.setFieldValue('image', '');
    setDefaultImg('');
  };

  useEffect(() => {
    const param = props.match.params.playerid;
    if (param) {
      playersCollection
        .doc(param)
        .get()
        .then((snapshoot) => {
          // GET data and insert to value
          if (snapshoot.data()) {
            // check strage dengan nama file yang didapat dari snapshoot dan ambil url nya
            firebase
              .storage()
              .ref('players')
              .child(snapshoot.data().image)
              .getDownloadURL()
              .then((url) => {
                //update form formik
                console.log(snapshoot.data().image);
                updateImageName(snapshoot.data().image);
                setDefaultImg(url);
              });
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
        .doc(props.match.params.playerid)
        .update(dataToSumbit)
        .then(() => {
          showSuccessToast('Player Updated');
          formik.resetForm();
          props.history.push('/Admin_players');
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
            {/* IMAGE UPLOAD */}
            <FormControl>
              <Fileuploader
                dir="players"
                filename={(filename) => updateImageName(filename)}
                defaultImg={defaultImg} //url
                defaultImgName={formik.values.image} //kirim balik nama file nya untuk kebutuhan edit
                resetImage={() => resetImage()}
              />
            </FormControl>

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
                  {...formik.getFieldProps('position')}
                  // copy all return value from textError
                  displayEmpty
                  error={SelectIsError(formik, 'position')}
                >
                  {console.log({ ...formik.getFieldProps('position') })}
                  <MenuItem value="" disabled>
                    Select position
                  </MenuItem>
                  <MenuItem value="Keeper">Keeper</MenuItem>
                  <MenuItem value="Defence">Defence</MenuItem>
                  <MenuItem value="Midfield">MidField</MenuItem>
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
