// higher order component - a component that renders another component

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => {
  return (
  <div>
    <h1>Info</h1>
    <p>the info is {props.info}</p>
  </div>
  );
};

// const withAdminWarning = (WrappedComponent) => {
//   // eslint-disable-next-line react/display-name
//   return (props) => (
//     <div>
//       {props.isAdmin && <p>Admin Warning: do not share!</p>}
//       <WrappedComponent {...props} />
//     </div>
//   );
// };
// const AdminInfo = withAdminWarning(Info);
// ReactDOM.render(<AdminInfo isAdmin={false} info="deets" />, document.getElementById('app'));

const requireAuthentication = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => (
    <div>
      {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please log in!</p>}
    </div>
  );
};
const AuthInfo = requireAuthentication(Info);
ReactDOM.render(<AuthInfo isAuthenticated={true} info="deets" />, document.getElementById('app'));