import React from 'react';
import { Container, Typography, Box, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RuleEditor from './components/RuleEditor';

function App() {
  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Rule Editor
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ flex: 2 }}>
            <RuleEditor />
          </Box>
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Paper sx={{ p: 2, position: 'sticky', top: 24 }}>
              <Typography variant="h6" gutterBottom>
                How to Use
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                  Rule Management
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconButton size="small" color="primary" sx={{ mr: 1 }}><AddIcon fontSize="small" /></IconButton>
                  <Typography variant="body2"><b>Add Top Level Rule:</b> Create a new rule at the root level.</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconButton size="small" color="primary" sx={{ mr: 1 }}><SubdirectoryArrowRightIcon fontSize="small" /></IconButton>
                  <Typography variant="body2"><b>Nest Rule:</b> Indent a rule under its previous sibling.</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconButton size="small" color="primary" sx={{ mr: 1 }}><SubdirectoryArrowLeftIcon fontSize="small" /></IconButton>
                  <Typography variant="body2"><b>Un-nest Rule:</b> Move a rule up one level.</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconButton size="small" color="primary" sx={{ mr: 1 }}><ArrowUpwardIcon fontSize="small" /></IconButton>
                  <Typography variant="body2"><b>Move Up:</b> Move a rule up among its siblings.</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconButton size="small" color="primary" sx={{ mr: 1 }}><ArrowDownwardIcon fontSize="small" /></IconButton>
                  <Typography variant="body2"><b>Move Down:</b> Move a rule down among its siblings.</Typography>
                </Box>

                <Typography variant="subtitle2" sx={{ mt: 3, mb: 2, color: 'text.secondary' }}>
                  Rule Properties
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconButton size="small" color="primary" sx={{ mr: 1 }}><EditIcon fontSize="small" /></IconButton>
                  <Typography variant="body2"><b>Edit Description:</b> Edit the rule's description.</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconButton size="small" color="primary" sx={{ mr: 1 }}><SaveIcon fontSize="small" /></IconButton>
                  <Typography variant="body2"><b>Save Description:</b> Save changes to the rule's description.</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconButton size="small" color="error" sx={{ mr: 1 }}><DeleteIcon fontSize="small" /></IconButton>
                  <Typography variant="body2"><b>Delete Rule:</b> Remove this rule from the ruleset.</Typography>
                </Box>

                <Typography variant="subtitle2" sx={{ mt: 3, mb: 2, color: 'text.secondary' }}>
                  Rule Structure
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Rules can be nested to create a hierarchical structure
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Use the "OR" operator to create alternative paths
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Rules can be reordered using the up/down arrows
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Use the Reset button to restore the original ruleset
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
