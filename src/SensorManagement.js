import {
  memo,
  useCallback,
  useEffect, useRef, useState,
} from 'react';
import {
  Box, Flex, Heading, HStack, Icon, SimpleGrid, Spacer, Switch,
} from '@chakra-ui/react';
import {
  WiHumidity, WiThermometer, WiBarometer, WiWindDeg,
} from 'react-icons/wi';
import debounce from 'lodash.debounce';
import { string } from 'prop-types';
import MemoizedSwitchButton from './SwitchButton';

const sensorIcons = {
  Temperature: WiThermometer,
  Pressure: WiBarometer,
  Wind: WiWindDeg,
  Humidity: WiHumidity,
  'PM2.5': WiThermometer,
  PM10: WiThermometer,
};

function SensorManagement() {
  const [sensors, setSensors] = useState([]);
  const [connected, setConnected] = useState(false);
  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:5000');
    let sensorsHash = {};

    ws.current.onopen = () => {
      console.log('WS onopen');
    };

    ws.current.onmessage = event => {
      // buffers sensors' data
      const { id, ...rest } = JSON.parse(event.data);
      sensorsHash = { ...sensorsHash, [id]: { ...rest } };
    };

    // updates state every 2 seconds
    const timer = setInterval(() => {
      setSensors(sensorsHash);
    }, 2000);

    return () => {
      ws.current.close();
      clearInterval(timer);
    };
  }, []);

  const onPanelClick = event => {
    const datatype = event.target.getAttribute('datatype');
    if (datatype) {
      event.stopPropagation();
      const [sensorId, command] = datatype.split('_');
      console.log('Panel clicked:', sensorId);
      console.log('bufferedAmount: ', ws.current.bufferedAmount);
      ws.current.send(JSON.stringify({ id: sensorId, command }));
    }
  };

  const debouncedClickHandler = useCallback(
    debounce(onPanelClick, 200),
    [],
  );

  const onSwitchChange = event => {
    setConnected(event.target.checked);
  };

  const sensorsArr = Object.entries(sensors);
  return (
    <Box px={2}>
      <Flex px={1} my={4} direction={{ base: 'column', md: 'row' }}>
        <Heading as="h1" fontSize="3xl" textAlign="center">Sensor Management</Heading>
        <Spacer />
        <HStack
          spacing={{ base: 2, md: 3 }}
          justifyContent="flex-end"
          mt={2}
          fontSize={{ base: 'sm', md: 'md' }}
        >
          <Box>Show Connected</Box>
          <Switch colorScheme="teal" size="md" onChange={onSwitchChange} />
        </HStack>
      </Flex>
      <SimpleGrid
        minChildWidth="180px"
        spacing={4}
        onClick={debouncedClickHandler}
        my={{ base: 4, md: 6 }}
      >
        {(connected
          ? sensorsArr.filter(([, value]) => value.connected) : sensorsArr
        ).map(([key, value]) => (
          <Box
            key={key}
            py={6}
            rounded={12}
            shadow="lg"
            borderWidth="1px"
            textAlign="center"
            position="relative"
          >
            <MemoizedIconAndName name={value.name} />
            <Box fontSize="0.875rem">{value.value ? `${value.value} ${value.unit}` : 'N/A'}</Box>
            <MemoizedSwitchButton connected={value.connected} id={key} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

function IconAndName({ name }) {
  return (
    <>
      <Box>
        <Icon as={sensorIcons[name]} boxSize="4em" color="teal" />
      </Box>
      <Box as="b">{name}</Box>
    </>
  );
}

IconAndName.propTypes = {
  name: string.isRequired,
};

const MemoizedIconAndName = memo(IconAndName);

export default SensorManagement;
