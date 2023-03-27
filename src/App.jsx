import React from 'react';
import { MantineProvider, Text } from '@mantine/core';

import Todo from './Components/Todo';

export default class App extends React.Component {
  render() {
    return (
      <MantineProvider withGlobalStyles withNormalizeCSS
        theme={{
          fontFamily: 'Open Sans, sans serif',
          spacing: { xs: '1rem', sm: '1.2rem', md: '1.8rem', lg: '2.2rem', x1: '2.8rem' } ,
  }
} 
>
        <Todo />
      </MantineProvider>
    );
  }
}
