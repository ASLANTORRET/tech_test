import { Container, Box } from '@chakra-ui/react';
import { shape } from 'prop-types';

function BasicLayout({ children }) {
  return (
    <Container centerContent p={0} maxW="1248px">
      <Box w="100%">
        {children}
      </Box>
    </Container>
  );
}

BasicLayout.propTypes = {
  children: shape({}).isRequired,
};

export default BasicLayout;
