const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { parseMdcRules, listRuleSetLabels, getRulesForLabel } = require('./parseMdcRules');

const app = express();
const PORT = 5000;

app.use(cors());

const RULES_PATH = path.join(__dirname, '.cursor/rules/project-rules.mdc');

app.get('/api/rules', (req, res) => {
  try {
    const mdcContent = fs.readFileSync(RULES_PATH, 'utf-8');
    const rules = parseMdcRules(mdcContent);
    res.json(rules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New: list rule set labels
app.get('/api/rule-sets', (req, res) => {
  try {
    const mdcContent = fs.readFileSync(RULES_PATH, 'utf-8');
    const labels = listRuleSetLabels(mdcContent);
    res.json(labels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New: get rules for a label
app.get('/api/ruleset', (req, res) => {
  try {
    const label = req.query.label;
    const mdcContent = fs.readFileSync(RULES_PATH, 'utf-8');
    const rules = getRulesForLabel(mdcContent, label);
    res.json(rules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Rule Editor backend running on http://localhost:${PORT}`);
}); 