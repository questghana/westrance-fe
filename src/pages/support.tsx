import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import Support from '@/components/support/support';
import Createticket from '@/components/support/createticket';

const SupportPage: React.FC = () => {
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  return (
    <Box className="pt-4">
      {!showCreateTicket ? (
        <Support onCreateClick={() => setShowCreateTicket(true)} />
      ) : (
        <Createticket onBackClick={() => setShowCreateTicket(false)} />
      )}
    </Box>
  );
};

export default SupportPage;
