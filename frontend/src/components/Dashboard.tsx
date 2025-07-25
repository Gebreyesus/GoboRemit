import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Dialog, DialogTitle, DialogContent, List, ListItemText, Divider, ListItemButton, Grid, Card, CardContent } from '@mui/material';
import Logo from './Logo';

const favoriteRecipients = [
  { id: '1', name: 'Abnet Melese', bank: 'Wells Fargo', account: '123456789' },
  { id: '2', name: 'Beto G.', bank: 'Bank of America', account: '987654321' },
];

const transactions = [
  { id: 't1', recipient: 'Abnet Melese', amount: 100, status: 'Pending', date: '2025-07-24' },
  { id: 't2', recipient: 'Beto G.', amount: 50, status: 'Completed', date: '2025-07-23' },
  { id: 't3', recipient: 'Abnet Melese', amount: 200, status: 'Completed', date: '2025-07-20' },
];

const totalSent = transactions.filter(t => t.status === 'Completed').reduce((sum, t) => sum + t.amount, 0);
const pendingAmount = transactions.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0);

const Dashboard = ({ onSend, user }: { onSend: (recipient?: any) => void, user: any }) => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'pending' | 'completed'>('pending');
  const isAdmin = user?.role === 'ADMIN';
  const newRequests = transactions.filter(t => t.status === 'Pending').length;

  const handleSelect = (recipient: any) => {
    setOpen(false);
    onSend(recipient);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 4, display: 'flex' }}>
      {/* Sidebar */}
      <Box sx={{ width: 220, bgcolor: 'background.paper', borderRadius: 3, p: 2, mr: 4, display: { xs: 'none', md: 'block' } }}>
        <Logo size={32} />
        <Typography variant="h6" fontWeight={700} mb={2}>GoboRemit</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>New Requests: <b>{newRequests}</b></Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle2" color="text.secondary">Total Sent</Typography>
        <Typography variant="h6" fontWeight={700} mb={2}>${totalSent}</Typography>
        <Typography variant="subtitle2" color="text.secondary">Pending</Typography>
        <Typography variant="h6" fontWeight={700} mb={2}>${pendingAmount}</Typography>
        {/* Add more sidebar summaries/notifications as needed */}
      </Box>
      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>Welcome, {user.name} ({user.role})</Typography>
        {isAdmin ? (
          <>
            <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
              <Button variant={tab === 'pending' ? 'contained' : 'outlined'} onClick={() => setTab('pending')}>Pending Requests</Button>
              <Button variant={tab === 'completed' ? 'contained' : 'outlined'} onClick={() => setTab('completed')}>Completed Requests</Button>
            </Box>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper', mb: 3 }}>
              <Typography variant="h6" mb={2}>{tab === 'pending' ? 'Pending Requests' : 'Completed Requests'}</Typography>
              <List>
                {transactions.filter(tx => tab === 'pending' ? tx.status === 'Pending' : tx.status === 'Completed').map(tx => (
                  <React.Fragment key={tx.id}>
                    <ListItemText primary={`${tx.recipient} - $${tx.amount}`} secondary={`${tx.status} • ${tx.date}`} />
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
            {/* Reasonable admin business features: approve/reject, view user details, export data, etc. */}
            <Button variant="contained" color="primary" sx={{ borderRadius: 2, fontWeight: 700 }}>
              Export Data
            </Button>
          </>
        ) : (
          <>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor: 'background.paper', borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">Total Sent</Typography>
                    <Typography variant="h6" fontWeight={700}>${totalSent}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor: 'background.paper', borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">Pending Transfers</Typography>
                    <Typography variant="h6" fontWeight={700}>${pendingAmount}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* Add more summary cards as needed */}
            </Grid>
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
              <Typography variant="h6" mb={2}>Dashboard</Typography>
              <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 2, fontWeight: 700 }} onClick={() => setOpen(true)}>
                Send Money
              </Button>
            </Paper>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
              <Typography variant="h6" mb={2}>Recent Transactions</Typography>
              <List>
                {transactions.map(tx => (
                  <React.Fragment key={tx.id}>
                    <ListItemText primary={`${tx.recipient} - $${tx.amount}`} secondary={`${tx.status} • ${tx.date}`} />
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </>
        )}
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
    </Box>
  );
};

export default Dashboard;
