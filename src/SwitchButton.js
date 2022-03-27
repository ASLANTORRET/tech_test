import { Icon, IconButton } from '@chakra-ui/react';
import { BiPowerOff } from 'react-icons/bi';
import React from 'react';
import { bool, number } from 'prop-types';

function SwitchButton({ connected, id: key }) {
  return (
    <IconButton
      aria-label="Connect/Disconnect button"
      icon={(
        <Icon
          w="100%"
          as={BiPowerOff}
          datatype={`${key}_${connected ? 'disconnect' : 'connect'}`}
        />

    )}
      variant="unstyled"
      position="absolute"
      top="5px"
      right="5px"
      size="xs"
      color={connected ? 'green' : 'red'}
      _focus={{
        boxShadow: 'none',
      }}
      datatype={`${key}_${connected ? 'disconnect' : 'connect'}`}
      borderWidth="1px"
      zIndex={1}
      rounded={50}
    />
  );
}

SwitchButton.propTypes = {
  connected: bool.isRequired,
  id: number.isRequired,
};

export default React.memo(SwitchButton);
