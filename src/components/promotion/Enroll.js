import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Button, CircularProgress } from '@material-ui/core';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { showErrorToast, showSuccessToast } from '../utils/tools';
import { promotionsCollection } from '../../firebase';
const Enroll = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: new Yup.object({
      email: Yup.string()
        .email('Enter a valid email')
        .required('The email is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = async (values) => {
    try {
      const isOntheList = await promotionsCollection
        .where('email', '==', values.email)
        .get();
      console.log(isOntheList.docs);
      if (isOntheList.docs.length >= 1) {
        setLoading(false);
        showErrorToast('Sorry you are on the list!');
        formik.resetForm();
        return false;
      }

      await promotionsCollection.add({ email: values.email });
      setLoading(false);
      formik.resetForm();
      showSuccessToast('Congratulations!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fade>
      <div className="enroll_wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="handle_title">Enter Your Email</div>
          <div className="enroll_input">
            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>

          {formik.touched.email && formik.errors.email && (
            <div className="error_label">{formik.errors.email}</div>
          )}
          {loading ? (
            <CircularProgress className="progress" color="secondary" />
          ) : (
            <button type="submit">Enroll</button>
          )}
        </form>
      </div>
    </Fade>
  );
};

export default Enroll;
