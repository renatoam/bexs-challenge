import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Checkout from './pages/Checkout';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Checkout} />
      </Switch>
    </BrowserRouter>
  )
}