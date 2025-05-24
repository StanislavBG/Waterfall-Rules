import { Rule } from '../types/Rule';

const createRule = (name: string, description: string, children: Rule[] = [], isOr: boolean = false): Rule => ({
  id: `${name}-${Date.now()}`,
  name,
  description,
  children,
  isOr
});

export const initialRules: { [key: string]: Rule[] } = {
  'Default': [
    createRule('Rule-1', 'Suffix + First Name + Last Name + Email', [
      createRule('Rule-2', 'First Name + Last Name + Email', [
        createRule('Rule-3', 'First Name + Email', [
          createRule('Rule-4', 'Email')
        ], true),
        createRule('Rule-5', 'Last Name + Email', [
          createRule('Rule-4', 'Email')
        ])
      ])
    ], true),
    createRule('Rule-6', 'Suffix + First Name + Last Name + Phone', [
      createRule('Rule-7', 'First Name + Last Name + Phone', [
        createRule('Rule-8', 'First Name + Phone', [
          createRule('Rule-9', 'Phone')
        ], true),
        createRule('Rule-10', 'Last Name + Phone', [
          createRule('Rule-9', 'Phone')
        ])
      ])
    ], true),
    createRule('Rule-11', 'Suffix + First Name + Last Name + Address', [
      createRule('Rule-12', 'First Name + Last Name + Address', [
        createRule('Rule-13', 'First Name + Address')
      ])
    ], true),
    createRule('Rule-15', 'Party-Identifier - CRM Contact Id', [], true),
    createRule('Rule-16', 'Party-Identifier - External Key')
  ],
  'Account': [
    createRule('Rule-1', 'Account Number + Account Name', [], true),
    createRule('Rule-2', 'Account Name + Tax ID', [], true),
    createRule('Rule-3', 'Account Number + Tax ID', [], true),
    createRule('Rule-4', 'Party-Identifier - CRM Account Id', [], true),
    createRule('Rule-5', 'Party-Identifier - External Key')
  ],
  'Empty Rule': [],
  'Current Customer': [
    createRule('Rule-1', 'First Name + Last Name + Email', [], true),
    createRule('Rule-2', 'First Name + Last Name + Phone', [], true),
    createRule('Rule-3', 'First Name + Last Name + Address', [], true),
    createRule('Rule-4', 'Party-Identifier - CRM Contact Id', [], true),
    createRule('Rule-5', 'Party-Identifier - External Key')
  ]
}; 