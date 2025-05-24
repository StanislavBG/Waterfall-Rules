import { Rule } from '../types/Rule';
import { v4 as uuidv4 } from 'uuid';

const createRule = (name: string, description: string, children: Rule[] = [], isOr: boolean = false): Rule => ({
  id: `${name}-${uuidv4()}`,
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
        ]),
        createRule('Rule-5', 'Last Name + Email', [
          createRule('Rule-4', 'Email')
        ])
      ])
    ]),
    createRule('Rule-6', 'Suffix + First Name + Last Name + Phone', [
      createRule('Rule-7', 'First Name + Last Name + Phone', [
        createRule('Rule-8', 'First Name + Phone', [
          createRule('Rule-9', 'Phone')
        ]),
        createRule('Rule-10', 'Last Name + Phone', [
          createRule('Rule-9', 'Phone')
        ])
      ])
    ]),
    createRule('Rule-11', 'Suffix + First Name + Last Name + Address', [
      createRule('Rule-12', 'First Name + Last Name + Address', [
        createRule('Rule-13', 'First Name + Address')
      ])
    ]),
    createRule('Rule-15', 'Party-Identifier - CRM Contact Id'),
    createRule('Rule-16', 'Party-Identifier - External Key')
  ].map((rule, idx, arr) => ({ ...rule, isOr: idx > 0 })), // OR between top-level rules
  'Empty Rule': [],
  'Current Customer': [
    createRule('Rule-1', 'First Name + Last Name + Email'),
    createRule('Rule-2', 'First Name + Last Name + Phone'),
    createRule('Rule-3', 'First Name + Last Name + Address'),
    createRule('Rule-4', 'Party-Identifier - CRM Contact Id'),
    createRule('Rule-5', 'Party-Identifier - External Key')
  ].map((rule, idx) => ({ ...rule, isOr: idx > 0 })), // OR between all
  'Account Rule': [
    createRule('Rule-1', 'DUNS Number', [
      createRule('Rule-2', '(Med Fuzzy) Account Name AND Address-Line-1 AND City AND Country', [
        createRule('Rule-3', '(High Fuzzy) Account Name AND City AND Country')
      ])
    ])
  ]
}; 