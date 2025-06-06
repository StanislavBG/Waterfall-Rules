import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Rule, RuleAction } from '../types/Rule';
import RuleComponent from './RuleComponent';
import { motion } from 'framer-motion';
import { initialRules } from '../utils/initialRules';
import { v4 as uuidv4 } from 'uuid';

// Default rule sets from initialRules
const DEFAULT_RULE_SETS = Object.keys(initialRules);

const getNextRuleName = (rules: Rule[]): string => {
  let max = 0;
  const traverse = (r: Rule[]) => {
    r.forEach((rule: Rule) => {
      const match = rule.name.match(/Rule-(\d+)/);
      if (match) {
        max = Math.max(max, parseInt(match[1], 10));
      }
      traverse(rule.children);
    });
  };
  traverse(rules);
  return `Rule-${max + 1}`;
};

function findParentAndIndex(rules: Rule[], id: string, parent: Rule | null = null): { parent: Rule | null, index: number } | null {
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].id === id) {
      return { parent, index: i };
    }
    const found = findParentAndIndex(rules[i].children, id, rules[i]);
    if (found) return found;
  }
  return null;
}

// Helper to find the parent and index of a rule, and its siblings array
function findParentAndIndexWithSiblings(rules: Rule[], id: string, parent: Rule | null = null): { parent: Rule | null, index: number, siblings: Rule[] } | null {
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].id === id) {
      return { parent, index: i, siblings: rules };
    }
    const found = findParentAndIndexWithSiblings(rules[i].children, id, rules[i]);
    if (found) return found;
  }
  return null;
}

const RuleEditor: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [ruleSets] = useState<string[]>(DEFAULT_RULE_SETS);
  const [selectedRuleSet, setSelectedRuleSet] = useState<string>(DEFAULT_RULE_SETS[0]);
  const [editDescId, setEditDescId] = useState<string | null>(null);
  const [editDescValue, setEditDescValue] = useState('');

  // Load rules from localStorage on mount and when rule set changes
  useEffect(() => {
    const savedRules = localStorage.getItem(`rules_${selectedRuleSet}`);
    if (savedRules) {
      setRules(JSON.parse(savedRules));
    } else {
      // Initialize with initial rules for the selected rule set
      setRules(initialRules[selectedRuleSet]);
    }
  }, [selectedRuleSet]);

  // Save rules to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`rules_${selectedRuleSet}`, JSON.stringify(rules));
  }, [rules, selectedRuleSet]);

  const updateRules = (rules: Rule[], id: string, updater: (rule: Rule) => Rule): Rule[] => {
    return rules.map(rule => {
      if (rule.id === id) {
        return updater(rule);
      }
      return {
        ...rule,
        children: updateRules(rule.children, id, updater)
      };
    });
  };

  const handleAction = (ruleId: string, action: RuleAction) => {
    if (action === 'nest') {
      const info = findParentAndIndexWithSiblings(rules, ruleId);
      if (info && info.index > 0) {
        const { index, siblings } = info;
        const prevSibling = siblings[index - 1];
        const [movingRule] = siblings.splice(index, 1);
        prevSibling.children.push(movingRule);
        setRules([...rules]);
      }
      return;
    }
    if (action === 'add') {
      const nextName = getNextRuleName(rules);
      setRules(updateRules(rules, ruleId, rule => ({
        ...rule,
        children: [
          ...rule.children,
          {
            id: `${nextName}-${uuidv4()}`,
            name: nextName,
            description: 'Description...',
            children: [],
            isOr: false
          }
        ]
      })));
      return;
    }
    if (action === 'delete') {
      const parentAndIndex = findParentAndIndex(rules, ruleId);
      if (parentAndIndex) {
        const { parent, index } = parentAndIndex;
        if (parent) {
          parent.children.splice(index, 1);
          setRules([...rules]);
        } else {
          const newRules = [...rules];
          newRules.splice(index, 1);
          setRules(newRules);
        }
      }
      return;
    }
  };

  const handleEditDesc = (ruleId: string, desc: string) => {
    setEditDescId(ruleId);
    setEditDescValue(desc);
  };

  const handleSaveDesc = (ruleId: string) => {
    setRules(updateRules(rules, ruleId, rule => ({ ...rule, description: editDescValue })));
    setEditDescId(null);
    setEditDescValue('');
  };

  // Un-nest: move rule up one level, after its parent
  function handleUnNest(ruleId: string) {
    function unNest(rules: Rule[]): Rule[] {
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        // Look for the rule in children
        const childIdx = rule.children.findIndex(child => child.id === ruleId);
        if (childIdx !== -1) {
          // Found the rule to un-nest
          const newChildren = [...rule.children];
          const [movingRule] = newChildren.splice(childIdx, 1);
          // Insert after the parent in the current level
          const newRules = [...rules];
          newRules[i] = { ...rule, children: newChildren };
          newRules.splice(i + 1, 0, movingRule);
          return newRules;
        } else {
          // Recurse into children
          const updatedChildren = unNest(rule.children);
          if (updatedChildren !== rule.children) {
            const newRules = [...rules];
            newRules[i] = { ...rule, children: updatedChildren };
            return newRules;
          }
        }
      }
      return rules;
    }
    setRules(rules => unNest(rules));
  }

  // Reset rules to initial state for current rule set
  function handleReset() {
    setRules(initialRules[selectedRuleSet]);
  }

  // Move rule up among siblings
  function moveRuleUp(ruleId: string) {
    const info = findParentAndIndexWithSiblings(rules, ruleId);
    if (info && info.index > 0) {
      const { siblings, index } = info;
      [siblings[index - 1], siblings[index]] = [siblings[index], siblings[index - 1]];
      setRules([...rules]);
    }
  }
  // Move rule down among siblings
  function moveRuleDown(ruleId: string) {
    const info = findParentAndIndexWithSiblings(rules, ruleId);
    if (info && info.index < info.siblings.length - 1) {
      const { siblings, index } = info;
      [siblings[index], siblings[index + 1]] = [siblings[index + 1], siblings[index]];
      setRules([...rules]);
    }
  }

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => {
            // Add top-level rule
            const nextName = getNextRuleName(rules);
            setRules([
              ...rules,
              {
                id: `${nextName}-${Date.now()}`,
                name: nextName,
                description: 'Description...',
                children: [],
                isOr: false
              }
            ]);
          }}
        >
          Add Top Level Rule
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ ml: 2, minWidth: 60 }}
          onClick={handleReset}
        >
          Reset
        </Button>
        <FormControl size="small" sx={{ ml: 2, minWidth: 160 }}>
          <InputLabel id="ruleset-label">Rule Set</InputLabel>
          <Select
            labelId="ruleset-label"
            value={selectedRuleSet}
            label="Rule Set"
            onChange={e => setSelectedRuleSet(e.target.value)}
          >
            {ruleSets.map(label => (
              <MenuItem key={label} value={label}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {rules.map((rule, index) => (
        <React.Fragment key={rule.id}>
          {index > 0 && (
            <motion.div layout="position" transition={{ type: 'spring', stiffness: 100, damping: 160 }}>
              <Typography sx={{ mb: 0.25, fontSize: 12, fontWeight: 600, letterSpacing: 0.5, color: '#444' }}>OR</Typography>
            </motion.div>
          )}
          <RuleComponent
            rule={rule}
            level={0}
            onAction={handleAction}
            onEditDesc={handleEditDesc}
            editDescId={editDescId}
            editDescValue={editDescValue}
            onSaveDesc={handleSaveDesc}
            setEditDescValue={setEditDescValue}
            slim
            parentId={null}
            onUnNest={handleUnNest}
            index={index}
            siblingsLength={rules.length}
            onMoveUp={moveRuleUp}
            onMoveDown={moveRuleDown}
          />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default RuleEditor; 