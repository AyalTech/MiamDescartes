import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

import './no-connected.less';

const NoConnected = () => (
  <div className="container">
    <Result
      status="403"
      title="Une erreur ? vous devez surêment vous connecter !"
      extra={(
        <Button color="primary">
          <Link to="/">Revenir à l'acceuil !</Link>
        </Button>
      )}
    />
  </div>
);

export default NoConnected;
