import React from 'react';
import { Container, Typography, Box, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RuleEditor from './components/RuleEditor';

function App() {
  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Rule Editor
        </Typography>
        <RuleEditor />
        <Paper sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            How to Use
          </Typography>
          <Box sx={{ pl: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <IconButton size="small" color="primary" sx={{ mr: 1 }}><EditIcon fontSize="small" /></IconButton>
              <Typography variant="body2"><b>Edit Description:</b> Edit the rule's description.</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <IconButton size="small" color="error" sx={{ mr: 1 }}><DeleteIcon fontSize="small" /></IconButton>
              <Typography variant="body2"><b>Delete Rule:</b> Remove this rule from the ruleset.</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <IconButton size="small" color="primary" sx={{ mr: 1 }}><SaveIcon fontSize="small" /></IconButton>
              <Typography variant="body2"><b>Save Description:</b> Save changes to the rule's description.</Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default App;
