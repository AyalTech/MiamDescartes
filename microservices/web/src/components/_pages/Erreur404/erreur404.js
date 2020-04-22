import React from 'react';
import { Button, Result } from 'antd';
import './erreur404.less';

const Erreur404 = () => (
  <div className="container">
    <Result
      status="404"
      title="404"
      subTitle="Désolé, la page dont vous cherchez n'existe pas !"
      extra={<Button type="primary">Revenir à l'acceuil</Button>}
    />
  </div>
);

export default Erreur404;
