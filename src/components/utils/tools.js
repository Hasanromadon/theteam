import React from 'react';
import { Link } from 'react-router-dom';
import mcitylogo from '../../Resources/images/logos/manchester_city_logo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebase } from '../../firebase';
export const CityLogo = (props) => {
  const template = (
    <div
      className="img_cover"
      style={{
        width: props.width,
        height: props.height,
        background: `url(${mcitylogo}) no-repeat`,
      }}
    ></div>
  );

  if (props.link) {
    return (
      <Link className="link_logo" to={props.linkTo}>
        {template}
      </Link>
    );
  } else return template;
};

export const showSuccessToast = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};
export const showErrorToast = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const logOutHanlder = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    alert(error);
  }
};

export const Tag = (props) => {
  const template = (
    <div
      style={{
        background: props.bck ? props.bck : '#ffffff',
        fontSize: props.size ? props.size : '15px',
        color: props.color ? props.color : '#000000',
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous',
        ...props.add,
      }}
    >
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.linkTo}>{template}</Link>;
  } else {
    return template;
  }
};
