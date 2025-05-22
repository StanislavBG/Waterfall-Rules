let ruleCounter = 1;
const getNextRuleId = () => `Rule-${ruleCounter++}`;

function parseMdcRules(mdcContent) {
  ruleCounter = 1;
  const lines = mdcContent
    .split('\n')
    .map(line => line.replace(/\s+$/, '')) // remove trailing spaces
    .filter(line => line && !line.startsWith('#') && !line.startsWith('---'));

  const stack = [];
  const rules = [];
  let lastIndent = 0;
  let lastParent = null;
  let lastRule = null;
  let orPending = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === 'OR') {
      orPending = true;
      continue;
    }
    const match = line.match(/^(\s*)\[(Rule-\d+)\]\s*(.*)$/);
    if (match) {
      const indent = match[1].length;
      const name = match[2];
      const description = match[3].trim();
      const rule = {
        id: getNextRuleId(),
        name,
        description,
        children: [],
        isOr: false,
      };
      // Find parent by indentation
      while (stack.length && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }
      if (stack.length) {
        const parent = stack[stack.length - 1].rule;
        if (orPending && parent.children.length > 0) {
          rule.isOr = true;
        }
        parent.children.push(rule);
      } else {
        if (orPending && rules.length > 0) {
          rule.isOr = true;
        }
        rules.push(rule);
      }
      stack.push({ rule, indent });
      orPending = false;
      lastIndent = indent;
      lastParent = stack.length > 1 ? stack[stack.length - 2].rule : null;
      lastRule = rule;
    }
  }
  return rules;
}

// New: extract all rule sets by label
function extractRuleSets(mdcContent) {
  // Split by '## Rule Set:'
  const sections = mdcContent.split(/(^## Rule Set: .*)/m);
  const ruleSets = [];
  let currentLabel = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (section.startsWith('## Rule Set:')) {
      currentLabel = section.replace('## Rule Set:', '').trim();
    } else if (currentLabel && section.trim()) {
      ruleSets.push({ label: currentLabel, content: section });
      currentLabel = null;
    }
  }
  return ruleSets;
}

function listRuleSetLabels(mdcContent) {
  return extractRuleSets(mdcContent).map(rs => rs.label);
}

function getRulesForLabel(mdcContent, label) {
  const ruleSets = extractRuleSets(mdcContent);
  const found = ruleSets.find(rs => rs.label === label);
  if (found) return parseMdcRules(found.content);
  return [];
}

module.exports = { parseMdcRules, listRuleSetLabels, getRulesForLabel }; 