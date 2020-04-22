import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

import './logout.less';

class Logout extends React.Component {
  render() {
    return (
      <div className="logout-container">
        <Result
          status="success"
          title="Déconnection réussi !"
          extra={(
            <Button color="primary">
              <Link to="/">Page d'acceuil</Link>
            </Button>
            )}
        />
      </div>
    );
  }
}

export default Logout;
