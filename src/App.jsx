import React from 'react';
import { MantineProvider} from '@mantine/core';
import Todo from './Components/Todo';
import Header from './Components/Header';

export default class App extends React.Component {  //this is starter code from mantine.dev/guides/cra/
  render() {
    return (
      <MantineProvider theme={{fontFamily: 'Open Sans', fontSize: 'lg', padding: '25px 25px 25px 25px', margin: '.25rem .25rem .25rem .25rem'
}}>
        <Header />
        <Todo />
      </MantineProvider>
    );
  }
}