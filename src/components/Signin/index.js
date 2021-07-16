import React, { Fragment, useState } from 'react';
import { firebase } from '../../firebase';
import { CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showSuccessToast, showErrorToast } from '../utils/tools';

const SignIn = ({ user, history }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: 'hasan@gmail.com',
      password: '123456',
    },

    validationSchema: new Yup.ObjectSchema({
      email: Yup.string()
        .email('Invalid email adress')
        .required('The email address is required'),
      password: Yup.string().required('The password is required'),
    }),
    onSubmit: (values) => {
      // go to server with fields values

      submitForm(values);
      setLoading(true);
    },
  });

  const submitForm = async ({ email, password }) => {
    try {
      // login to firebase account
      const auth = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      // direct to dashboard if success
      if (auth) {
        history.push('/dashboard');
        showSuccessToast('Welcome Back!!');
      }
    } catch (error) {
      showErrorToast(error.message);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Fragment>
      {user && <Redirect to="/dashboard" />}

      <div className="container">
        <div className="signin_wrapper" style={{ margin: '100px' }}>
          <form onSubmit={formik.handleSubmit}>
            <h2>Please login</h2>
            <input
              name="email"
              type="text"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error_label">{formik.errors.email}</div>
            ) : null}
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error_label">{formik.errors.password}</div>
            ) : null}
            {loading ? (
              <CircularProgress color="secondary" className="progress" />
            ) : (
              <button type="submit">Login</button>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
