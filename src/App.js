import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import BasicLayout from './layouts/BasicLayout';
import SensorManagement from './SensorManagement';

function App() {
  return (
    <ChakraProvider>
      <BasicLayout>
        <SensorManagement />
      </BasicLayout>
    </ChakraProvider>
  );
}
export default App;
