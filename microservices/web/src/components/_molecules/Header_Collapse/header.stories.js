import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { withKnobs, text } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies


import HeaderPerso from './header';

storiesOf('Header', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <HeaderPerso text={text('Title', 'Header')} />
  ));
