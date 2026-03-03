export interface Item {
  id: string;
  title: string;
  description: string;
}

export const DEMO_ITEMS: Item[] = [
  { id: '1', title: 'Document Alpha', description: 'First document in the system' },
  { id: '2', title: 'Document Beta', description: 'Beta release notes and changelog' },
  { id: '3', title: 'Document Gamma', description: 'Gamma testing procedures' },
  { id: '4', title: 'Report Delta', description: 'Quarterly delta analysis report' },
  { id: '5', title: 'Spec Epsilon', description: 'Epsilon specification draft' },
];
