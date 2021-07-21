import React, { useEffect, useState } from 'react';

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
import {
  matchesCollection,
  teamsCollection,
  firebase,
} from '../../../firebase';
import AdminLayout from '../../../HOC/AdminLayout';

const defaultValues = {
  date: '',
  local: '',
  resultLocal: '',
  away: '',
  resultAway: '',
  referee: '',
  stadium: '',
  result: '',
  final: '',
};

const AddEditMatch = (props) => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState('');
  const [teams, setTeams] = useState(null);
  const [values, setValues] = useState(defaultValues);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: new Yup.ObjectSchema({
      date: Yup.string().required('The Input is required'),
      local: Yup.string().required('The Input is required'),
      resultLocal: Yup.number()
        .required('The Input is required')
        .min(0, 'Minimun 0')
        .max(99, 'maximum 99'),
      away: Yup.string().required('The Input is required'),
      resultAway: Yup.number()
        .required('The Input is required')
        .min(0, 'Minimun 0')
        .max(99, 'maximum 99'),
      referee: Yup.string().required('The Input is required'),
      result: Yup.mixed()
        .required('The Input is required')
        .oneOf(['W', 'D', 'L', 'n/a']),
      final: Yup.mixed().required('The Input is required').oneOf(['Yes', 'No']),
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  // submit form
  const submitForm = (values) => {
    let dataToSumbit = values;
    teams.forEach((team) => {
      if (team.shortName === dataToSumbit.local) {
        dataToSumbit['localThmb'] = team.thmb;
      }
      if (team.shortName === dataToSumbit.away) {
        dataToSumbit['awayThmb'] = team.thmb;
      }
    });

    setLoading(true);
    if (formType === 'add') {
      matchesCollection
        .add(dataToSumbit)
        .then(() => {
          showSuccessToast('Match has been added');
          props.history.push('/Admin_Matches');
        })
        .catch((err) => showErrorToast('Match failed to add'))
        .finally(() => setLoading(false));
    } else {
      matchesCollection
        .doc(props.match.params.matchid)
        .update(dataToSumbit)
        .then(() => {
          showSuccessToast('Match Updated');
        })
        .catch((err) => {
          showErrorToast('Failed update match');
        })
        .finally(setLoading(false));
    }
  };

  // get team data
  useEffect(() => {
    if (!teams) {
      teamsCollection
        .get()
        .then((snapshot) => {
          const teams = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setTeams(teams);
        })
        .catch((err) => showErrorToast('Error Load Team'));
    }
  }, [teams]);

  // getMatchData
  useEffect(() => {
    const param = props.match.params.matchid;
    if (param) {
      matchesCollection
        .doc(param)
        .get()
        .then((snapshot) => {
          setFormType('edit');
          setValues(snapshot.data());
        });
    } else {
      setFormType('add');
      setValues(defaultValues);
    }
  }, [props.match.params.matchid]);

  const showTeams = () => {
    return (
      teams &&
      teams.map((team) => (
        <MenuItem key={team.id} value={team.shortName}>
          {' '}
          {team.shortName}{' '}
        </MenuItem>
      ))
    );
  };

  return (
    <AdminLayout title={formType === 'add' ? 'Add Match' : 'Edit Match'}>
      {console.log(values)}
      <div className="editmatch_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <h4>Select Date</h4>
              <FormControl>
                <TextField
                  id="date"
                  name="date"
                  type="date"
                  {...formik.getFieldProps('date')}
                  {...textErrorHelper(formik, 'date')}
                />
              </FormControl>
            </div>
            <hr />
            <div>
              <h4>Result Local</h4>
              <FormControl error={SelectIsError(formik, 'local')}>
                <Select
                  id="local"
                  name="local"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps('local')}
                >
                  <MenuItem value="" disabled>
                    Select a Team
                  </MenuItem>
                  {showTeams()}
                </Select>
                {SelectErrorHelper(formik, 'local')}
              </FormControl>

              <FormControl style={{ marginLeft: '20px' }}>
                <TextField
                  id="resultLocal"
                  name="resultLocal"
                  variant="outlined"
                  type="number"
                  {...formik.getFieldProps('resultLocal')}
                  {...textErrorHelper(formik, 'resultLocal')}
                />
              </FormControl>
            </div>
            <div>
              <h4>Result Away</h4>
              <FormControl error={SelectIsError(formik, 'away')}>
                <Select
                  id="away"
                  name="away"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps('away')}
                >
                  <MenuItem value="" disabled>
                    Select a Team
                  </MenuItem>
                  {showTeams()}
                </Select>
                {SelectErrorHelper(formik, 'away')}
              </FormControl>

              <FormControl style={{ marginLeft: '20px' }}>
                <TextField
                  id="resultAway"
                  name="resultAway"
                  variant="outlined"
                  type="number"
                  {...formik.getFieldProps('resultAway')}
                  {...textErrorHelper(formik, 'resultAway')}
                />
              </FormControl>
            </div>

            <div className="mb-5">
              <h4>Match Info</h4>
              <div className="mb-5">
                <FormControl>
                  <TextField
                    id="referee"
                    name="referee"
                    type="string"
                    variant="outlined"
                    placeholder="Add referee name"
                    {...formik.getFieldProps('referee')}
                    {...textErrorHelper(formik, 'referee')}
                  />
                </FormControl>
              </div>
              <div className="mb-5">
                <FormControl>
                  <TextField
                    id="stadium"
                    name="stadium"
                    type="string"
                    variant="outlined"
                    placeholder="Add stadium name"
                    {...formik.getFieldProps('stadium')}
                    {...textErrorHelper(formik, 'stadium')}
                  />
                </FormControl>
              </div>

              <div className="mb-5">
                <FormControl error={SelectIsError(formik, 'result')}>
                  <Select
                    id="result"
                    name="result"
                    variant="outlined"
                    displayEmpty
                    {...formik.getFieldProps('result')}
                  >
                    <MenuItem value="" disabled>
                      Select a rusult
                    </MenuItem>
                    <MenuItem value="W">Win</MenuItem>
                    <MenuItem value="D">Draw</MenuItem>
                    <MenuItem value="L">Lose</MenuItem>
                    <MenuItem value="n/a">n/a</MenuItem>
                  </Select>
                  {SelectErrorHelper(formik, 'away')}
                </FormControl>
              </div>
              <div className="mb-5">
                <FormControl error={SelectIsError(formik, 'final')}>
                  <Select
                    id="final"
                    name="final"
                    variant="outlined"
                    displayEmpty
                    {...formik.getFieldProps('final')}
                  >
                    <MenuItem value="" disabled>
                      Was the game played?
                    </MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                  {SelectErrorHelper(formik, 'final')}
                </FormControl>
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {formType === 'add' ? 'Add Match' : 'Edit Match'}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEditMatch;
