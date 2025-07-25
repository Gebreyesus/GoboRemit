import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Divider, ListItemButton } from '@mui/material';
import Logo from './Logo';

const favoriteRecipients = [
  { id: '1', name: 'Abnet Melese', bank: 'Wells Fargo', account: '123456789' },
  { id: '2', name: 'Beto G.', bank: 'Bank of America', account: '987654321' },
];

const Dashboard = ({ onSend }: { onSend: (recipient?: any) => void }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (recipient: any) => {
    setOpen(false);
    onSend(recipient);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 4 }}>
      <Logo size={40} />
      <Typography variant="h5" fontWeight={700} mb={2}>Welcome to GoboRemit</Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h6" mb={2}>Dashboard</Typography>
        {/* Add stats/cards here later */}
        <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 2, fontWeight: 700 }} onClick={() => setOpen(true)}>
          Send Money
        </Button>
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Recipient</DialogTitle>
        <DialogContent>
          <List>
            {favoriteRecipients.map(r => (
              <React.Fragment key={r.id}>
                <ListItemButton onClick={() => handleSelect(r)}>
                  <ListItemText primary={r.name} secondary={`${r.bank} • ${r.account}`} />
                </ListItemButton>
                <Divider />
              </React.Fragment>
            ))}
            <ListItemButton onClick={() => handleSelect(undefined)}>
              <ListItemText primary="Add New Recipient" />
            </ListItemButton>
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
