import React, { useRef } from 'react';
import { Box, Typography, Paper, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Rule, RuleAction } from '../types/Rule';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from '@mui/material/Tooltip';

interface RuleComponentProps {
  rule: Rule;
  level: number;
  onAction: (ruleId: string, action: RuleAction) => void;
  onEditDesc: (ruleId: string, desc: string) => void;
  editDescId: string | null;
  editDescValue: string;
  onSaveDesc: (ruleId: string) => void;
  setEditDescValue: (desc: string) => void;
  slim?: boolean;
  parentId?: string | null;
  onUnNest?: (ruleId: string) => void;
  index?: number;
  siblingsLength?: number;
  onMoveUp?: (ruleId: string) => void;
  onMoveDown?: (ruleId: string) => void;
}

const RuleComponent: React.FC<RuleComponentProps> = ({ rule, level, onAction, onEditDesc, editDescId, editDescValue, onSaveDesc, setEditDescValue, slim, parentId, onUnNest, index, siblingsLength, onMoveUp, onMoveDown }) => {
  // Track previous level for slide animation
  const prevLevel = useRef(level);
  const direction = level - prevLevel.current;
  prevLevel.current = level;

  // Slide distance per level (pixels)
  const slideX = 32 * direction;

  return (
    <Box>
      {parentId != null && typeof index === 'number' && index > 0 && (
        <motion.div layout="position" transition={{ type: 'spring', stiffness: 100, damping: 160 }}>
          <Typography sx={{ mb: 0.25, fontSize: 12, fontWeight: 600, letterSpacing: 0.5, color: '#444', ml: level * 4 }}>OR</Typography>
        </motion.div>
      )}
      <AnimatePresence initial={false}>
        <motion.div
          key={rule.id + '-' + level}
          layout="position"
          layoutId={rule.id}
          initial={{ x: slideX, opacity: 0.8 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -slideX, opacity: 0.5 }}
          transition={{ type: 'spring', stiffness: 100, damping: 160 }}
        >
          <Paper 
            elevation={1} 
            sx={{ 
              p: slim ? 0.5 : 1, 
              mb: slim ? 0.5 : 1, 
              display: 'flex', 
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              ml: level * 4,
              minHeight: slim ? 36 : 48
            }}
          >
            {typeof index === 'number' && typeof siblingsLength === 'number' && (
              <>
                <Tooltip title="Move Up">
                  <IconButton size={slim ? 'small' : 'medium'} onClick={() => onMoveUp && onMoveUp(rule.id)} disabled={index === 0} sx={{ mr: 0.25, p: 0.25 }}>
                    <ArrowUpwardIcon fontSize="small" sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Move Down">
                  <IconButton size={slim ? 'small' : 'medium'} onClick={() => onMoveDown && onMoveDown(rule.id)} disabled={index === siblingsLength - 1} sx={{ mr: 0.5, p: 0.25 }}>
                    <ArrowDownwardIcon fontSize="small" sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              </>
            )}
            <Tooltip title="Nest Rule (indent)">
              <IconButton
                size={slim ? 'small' : 'medium'}
                onClick={() => onAction(rule.id, 'nest')}
                sx={{ mr: 0.5, minWidth: slim ? 28 : 36, p: 0.25 }}
                disabled={typeof index === 'number' && index === 0}
              >
                <SubdirectoryArrowRightIcon fontSize="small" sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
            {parentId && (
              <Tooltip title="Un-nest Rule (outdent)">
                <IconButton
                  size={slim ? 'small' : 'medium'}
                  onClick={() => onUnNest && onUnNest(rule.id)}
                  sx={{ mr: 1, minWidth: slim ? 28 : 36, p: 0.25 }}
                >
                  <SubdirectoryArrowLeftIcon fontSize="small" sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography 
                sx={{ 
                  fontWeight: 500, 
                  mr: 1, 
                  fontSize: slim ? 15 : 17,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 180
                }}
              >
                [{rule.name}]
              </Typography>
              {editDescId === rule.id ? (
                <>
                  <TextField
                    size="small"
                    value={editDescValue}
                    onChange={e => setEditDescValue(e.target.value)}
                    sx={{ mx: 1, width: 160 }}
                  />
                  <IconButton onClick={() => onSaveDesc(rule.id)} color="primary" size={slim ? 'small' : 'medium'}>
                    <SaveIcon fontSize={slim ? 'small' : 'medium'} />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography 
                    sx={{ 
                      fontStyle: 'italic', 
                      color: '#555', 
                      mr: 1, 
                      fontSize: slim ? 14 : 16,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: 260
                    }}
                  >
                    {rule.description}
                  </Typography>
                  <IconButton onClick={() => onEditDesc(rule.id, rule.description)} size={slim ? 'small' : 'medium'}>
                    <EditIcon fontSize={slim ? 'small' : 'medium'} />
                  </IconButton>
                </>
              )}
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title="Add Child Rule">
              <IconButton
                size={slim ? 'small' : 'medium'}
                onClick={() => onAction(rule.id, 'add')}
                sx={{ mr: 1, minWidth: slim ? 28 : 36, p: slim ? 0.5 : 1 }}
              >
                <AddIcon fontSize={slim ? 'small' : 'medium'} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Rule">
              <IconButton
                size={slim ? 'small' : 'medium'}
                onClick={() => onAction(rule.id, 'delete')}
                color="error"
                sx={{ minWidth: slim ? 28 : 36, p: slim ? 0.5 : 1 }}
              >
                <DeleteIcon fontSize={slim ? 'small' : 'medium'} />
              </IconButton>
            </Tooltip>
          </Paper>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {rule.children.map((child: Rule, idx: number) => (
          <Box key={child.id} sx={{ ml: 4 }}>
            <RuleComponent
              rule={child}
              level={level + 1}
              onAction={onAction}
              onEditDesc={onEditDesc}
              editDescId={editDescId}
              editDescValue={editDescValue}
              onSaveDesc={onSaveDesc}
              setEditDescValue={setEditDescValue}
              slim={slim}
              parentId={rule.id}
              onUnNest={onUnNest}
              index={idx}
              siblingsLength={rule.children.length}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
            />
          </Box>
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default RuleComponent; 