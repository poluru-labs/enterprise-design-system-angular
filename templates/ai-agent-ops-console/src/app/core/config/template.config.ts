export type NavItem = {
  path: string;
  label: string;
  icon: string;
  exact?: boolean;
  badge?: number;
};

export const templateConfig = {
  title: 'Agent operations',
  eyebrow: 'Agent observability',
  summary: 'Monitor autonomous workflows, tool calls, and handoffs across the agent fleet.',
  action: 'Deploy agent',
  brand: { mark: 'A', name: 'AgentOps', accent: 'Kit' },
  workspace: 'AgentOps workspace',
  user: { initials: 'AP', name: 'Alex Poluru', role: 'Workspace admin' },
  navGroups: [
    {
      label: 'Operations',
      items: [
        { path: '/', label: 'Operations', icon: 'dashboard', exact: true },
        { path: '/agents', label: 'Agents', icon: 'smart_toy' },
        { path: '/runs', label: 'Runs', icon: 'timeline' },
        { path: '/tools', label: 'Tools', icon: 'construction' }
      ]
    },
    {
      label: 'Oversight',
      items: [
        { path: '/handoffs', label: 'Handoffs', icon: 'handshake', badge: 2 },
        { path: '/alerts', label: 'Alerts', icon: 'notifications_active', badge: 2 }
      ]
    }
  ] as { label: string; items: NavItem[] }[],
  metrics: [
    { label: 'Active agents', value: '48', trend: '+5', trendDir: 'up' as const, hint: 'in production', icon: 'smart_toy', path: '/agents' },
    { label: 'Successful runs', value: '98.4%', trend: '+0.6%', trendDir: 'up' as const, hint: 'this week', icon: 'check_circle', path: '/runs' },
    { label: 'Tool calls today', value: '12.8K', trend: '+18%', trendDir: 'up' as const, hint: 'across fleet', icon: 'build', path: '/tools' },
    { label: 'Human handoffs', value: '21', trend: '-11%', trendDir: 'down' as const, hint: 'waiting review', icon: 'handshake', path: '/handoffs' }
  ],
  activityTitle: 'Agent run activity',
  activity: [
    { title: 'Invoice triage completed', detail: 'Finance · 246 records · Alex Poluru', status: 'Complete', time: '2 min ago', path: '/runs' },
    { title: 'Research agent awaiting approval', detail: 'Web search tool call · Maya Subbu', status: 'Review', time: '4 min ago', path: '/handoffs' },
    { title: 'Onboarding agent deployed', detail: 'People · Version 2.4.0 · Priya Subbu', status: 'Live', time: '1 hr ago', path: '/agents' },
    { title: 'Support router handling VIP tickets', detail: 'Support · 18 open · Sam Poluru', status: 'Running', time: '11 min ago', path: '/runs' },
    { title: 'Contract parser timed out', detail: 'Legal · RUN-1828 · Maya Subbu', status: 'Failed', time: '3 hr ago', path: '/tools' }
  ],
  alertsFeed: [
    {
      heading: 'Research agent is waiting on web search',
      content: 'Alex Poluru must approve an external search before the strategy run can continue. Policy blocks unapproved third-party tools.'
    },
    {
      heading: 'Contract parser reliability dropped to 92%',
      content: 'Maya Subbu paused new Legal runs until the document parser recovers. Eval suite still passes at 96.4%.'
    },
    {
      heading: 'Collections follow-up is ready to ship',
      content: 'Sam Poluru finished Finance preflight. ERP lookup and Slack notify are selected for production.'
    }
  ],
  agents: [
    { id: 'invoice-triage', name: 'Invoice triage', owner: 'Alex Poluru', team: 'Finance', version: '2.4.1', runs: '1,204', success: '99.2%', status: 'Live', model: 'Polaris 4.1', updated: '12 min ago' },
    { id: 'research', name: 'Research agent', owner: 'Maya Subbu', team: 'Strategy', version: '1.8.0', runs: '318', success: '94.1%', status: 'Review', model: 'Atlas Reasoner', updated: '4 min ago' },
    { id: 'onboarding', name: 'Onboarding agent', owner: 'Priya Subbu', team: 'People', version: '2.4.0', runs: '862', success: '98.7%', status: 'Live', model: 'Polaris 4.1', updated: '1 hr ago' },
    { id: 'support-router', name: 'Support router', owner: 'Sam Poluru', team: 'Support', version: '3.1.2', runs: '4,110', success: '97.4%', status: 'Live', model: 'Polaris 4.1 Mini', updated: '3 min ago' },
    { id: 'contract-reviewer', name: 'Contract reviewer', owner: 'Maya Subbu', team: 'Legal', version: '0.9.4', runs: '41', success: '91.0%', status: 'Paused', model: 'Atlas Reasoner', updated: '2 days ago' },
    { id: 'collections', name: 'Collections follow-up', owner: 'Alex Poluru', team: 'Finance', version: '1.2.0', runs: '276', success: '96.5%', status: 'Live', model: 'Polaris 4.1 Mini', updated: '28 min ago' },
    { id: 'vendor-onboarding', name: 'Vendor onboarding', owner: 'Priya Subbu', team: 'Procurement', version: '1.6.2', runs: '154', success: '97.8%', status: 'Live', model: 'Polaris 4.1', updated: '46 min ago' },
    { id: 'expense-auditor', name: 'Expense auditor', owner: 'Alex Poluru', team: 'Finance', version: '2.1.0', runs: '988', success: '98.1%', status: 'Live', model: 'Polaris 4.1 Mini', updated: '9 min ago' },
    { id: 'knowledge-crawler', name: 'Knowledge crawler', owner: 'Sam Poluru', team: 'Platform', version: '3.0.1', runs: '2,441', success: '99.0%', status: 'Live', model: 'Polaris 4.1', updated: '6 min ago' },
    { id: 'meeting-summarizer', name: 'Meeting summarizer', owner: 'Priya Subbu', team: 'People', version: '1.4.3', runs: '720', success: '97.6%', status: 'Live', model: 'Polaris 4.1 Mini', updated: '22 min ago' },
    { id: 'claims-intake', name: 'Claims intake', owner: 'Maya Subbu', team: 'Ops', version: '0.8.2', runs: '63', success: '93.4%', status: 'Review', model: 'Atlas Reasoner', updated: '17 min ago' },
    { id: 'catalog-enricher', name: 'Catalog enricher', owner: 'Sam Poluru', team: 'Product', version: '1.1.0', runs: '210', success: '95.2%', status: 'Paused', model: 'Polaris 4.1', updated: '1 day ago' }
  ],
  runs: [
    { id: 'RUN-1842', agent: 'Invoice triage', owner: 'Alex Poluru', started: '2 min ago', duration: '1m 12s', status: 'Complete', detail: '246 records processed', tools: 'ERP lookup' },
    { id: 'RUN-1841', agent: 'Research agent', owner: 'Maya Subbu', started: '4 min ago', duration: '—', status: 'Review', detail: 'Waiting on web search approval', tools: 'Web search' },
    { id: 'RUN-1839', agent: 'Support router', owner: 'Sam Poluru', started: '11 min ago', duration: '48s', status: 'Running', detail: 'Routing 18 open tickets', tools: 'Ticketing' },
    { id: 'RUN-1834', agent: 'Onboarding agent', owner: 'Priya Subbu', started: '1 hr ago', duration: '3m 04s', status: 'Complete', detail: 'Version 2.4.0 rollout', tools: 'HRIS records' },
    { id: 'RUN-1828', agent: 'Contract reviewer', owner: 'Maya Subbu', started: '3 hr ago', duration: '12s', status: 'Failed', detail: 'Document parser timeout', tools: 'Contract parser' },
    { id: 'RUN-1821', agent: 'Collections follow-up', owner: 'Alex Poluru', started: '5 hr ago', duration: '2m 41s', status: 'Complete', detail: '14 reminder sequences sent', tools: 'Slack notify' },
    { id: 'RUN-1818', agent: 'Expense auditor', owner: 'Alex Poluru', started: '6 hr ago', duration: '54s', status: 'Complete', detail: '81 expense lines scored', tools: 'ERP lookup' },
    { id: 'RUN-1812', agent: 'Knowledge crawler', owner: 'Sam Poluru', started: '7 hr ago', duration: '8m 22s', status: 'Complete', detail: '412 pages recrawled', tools: 'Knowledge search' },
    { id: 'RUN-1806', agent: 'Claims intake', owner: 'Maya Subbu', started: '8 hr ago', duration: '—', status: 'Review', detail: 'Policy clause needs a human', tools: 'Contract parser' },
    { id: 'RUN-1801', agent: 'Vendor onboarding', owner: 'Priya Subbu', started: '9 hr ago', duration: '1m 58s', status: 'Complete', detail: '3 vendors added to ERP', tools: 'ERP lookup' },
    { id: 'RUN-1794', agent: 'Meeting summarizer', owner: 'Priya Subbu', started: 'Yesterday', duration: '41s', status: 'Complete', detail: 'Q3 ops standup notes', tools: 'Calendar' },
    { id: 'RUN-1788', agent: 'Catalog enricher', owner: 'Sam Poluru', started: 'Yesterday', duration: '19s', status: 'Failed', detail: 'SKU feed missing attributes', tools: 'CRM writeback' }
  ],
  tools: [
    { name: 'ERP lookup', type: 'Internal API', owner: 'Alex Poluru', team: 'Finance systems', reliability: '99.8%', calls: '4.2K', status: 'Approved', access: 'Open' },
    { name: 'Web search', type: 'External', owner: 'Maya Subbu', team: 'Platform', reliability: '97.1%', calls: '812', status: 'Restricted', access: 'Approval' },
    { name: 'Ticketing', type: 'Internal API', owner: 'Sam Poluru', team: 'Support', reliability: '99.4%', calls: '3.6K', status: 'Approved', access: 'Open' },
    { name: 'HRIS records', type: 'Internal API', owner: 'Priya Subbu', team: 'People', reliability: '99.9%', calls: '640', status: 'Approved', access: 'Open' },
    { name: 'Contract parser', type: 'Internal', owner: 'Maya Subbu', team: 'Legal', reliability: '92.0%', calls: '41', status: 'Degraded', access: 'Restricted' },
    { name: 'Slack notify', type: 'Integration', owner: 'Sam Poluru', team: 'Platform', reliability: '99.6%', calls: '1.1K', status: 'Approved', access: 'Open' },
    { name: 'Knowledge search', type: 'Internal', owner: 'Sam Poluru', team: 'Platform', reliability: '99.2%', calls: '2.4K', status: 'Approved', access: 'Open' },
    { name: 'Calendar', type: 'Integration', owner: 'Priya Subbu', team: 'People', reliability: '98.8%', calls: '390', status: 'Approved', access: 'Open' },
    { name: 'CRM writeback', type: 'Internal API', owner: 'Alex Poluru', team: 'Revenue', reliability: '96.4%', calls: '210', status: 'Restricted', access: 'Approval' },
    { name: 'Payments', type: 'External', owner: 'Alex Poluru', team: 'Finance', reliability: '99.1%', calls: '88', status: 'Approved', access: 'Restricted' }
  ],
  handoffs: [
    { id: 'HO-1092', agent: 'Research agent', reason: 'External web search requires approval before the strategy brief can continue.', waiting: '4 min', reviewer: 'Alex Poluru', status: 'Waiting', risk: 'Medium', run: 'RUN-1841' },
    { id: 'HO-1088', agent: 'Contract reviewer', reason: 'Clause flagged outside policy in a vendor MSA. Parser is also degraded.', waiting: '26 min', reviewer: 'Maya Subbu', status: 'Waiting', risk: 'High', run: 'RUN-1828' },
    { id: 'HO-1071', agent: 'Support router', reason: 'VIP account escalation from Harborline Retail.', waiting: 'Resolved', reviewer: 'Priya Subbu', status: 'Approved', risk: 'Low', run: 'RUN-1839' },
    { id: 'HO-1064', agent: 'Invoice triage', reason: 'Vendor not in the approved directory.', waiting: 'Resolved', reviewer: 'Sam Poluru', status: 'Rejected', risk: 'Medium', run: 'RUN-1842' },
    { id: 'HO-1059', agent: 'Claims intake', reason: 'Medical necessity language needs a human before the claim is filed.', waiting: '41 min', reviewer: 'Maya Subbu', status: 'Waiting', risk: 'High', run: 'RUN-1806' },
    { id: 'HO-1044', agent: 'Collections follow-up', reason: 'Customer asked to pause reminders for 14 days.', waiting: 'Resolved', reviewer: 'Alex Poluru', status: 'Approved', risk: 'Low', run: 'RUN-1821' }
  ],
  alerts: [
    { title: 'Research agent awaiting approval', detail: 'Web search tool call is blocked on policy.', time: '4 min ago', severity: 'Action needed', owner: 'Alex Poluru', path: '/handoffs' },
    { title: 'Contract parser degraded', detail: 'Reliability dropped to 92% in the last hour.', time: '18 min ago', severity: 'Warning', owner: 'Maya Subbu', path: '/tools' },
    { title: 'Onboarding agent deployed', detail: 'Version 2.4.0 is live in People workspace.', time: '1 hr ago', severity: 'Info', owner: 'Priya Subbu', path: '/agents' },
    { title: 'Run success dipped overnight', detail: 'Successful runs fell 0.4% against the weekly baseline.', time: '6 hr ago', severity: 'Info', owner: 'Sam Poluru', path: '/runs' },
    { title: 'Claims intake needs a reviewer', detail: 'HO-1059 is aging past the 30 minute SLA.', time: '41 min ago', severity: 'Action needed', owner: 'Maya Subbu', path: '/handoffs' },
    { title: 'Catalog enricher paused', detail: 'SKU feed is missing required attributes.', time: '1 day ago', severity: 'Warning', owner: 'Sam Poluru', path: '/agents' }
  ],
  settings: [
    { group: 'Workspace policies', items: [
      { title: 'Require approval for external tools', detail: 'Agents must pause before calling unapproved third-party APIs.', enabled: true },
      { title: 'Auto-pause failed agents', detail: 'Stop an agent after three consecutive failed runs.', enabled: true },
      { title: 'Allow production deploys', detail: 'Workspace admins can publish new agent versions.', enabled: true }
    ] },
    { group: 'Alerts', items: [
      { title: 'Handoff notifications', detail: 'Notify reviewers when an agent needs a human decision.', enabled: true },
      { title: 'Reliability warnings', detail: 'Alert when a tool drops below 95% success.', enabled: true },
      { title: 'Daily operations digest', detail: 'Email a summary of runs, handoffs, and incidents.', enabled: false }
    ] },
    { group: 'Access', items: [
      { title: 'Restrict deploy to admins', detail: 'Only workspace admins can ship new agent versions.', enabled: true },
      { title: 'Share run traces with operators', detail: 'Let operators inspect prompts, tools, and outcomes.', enabled: true }
    ] }
  ],
  hourly: [
    { hour: '9a', value: 42 },
    { hour: '10', value: 61 },
    { hour: '11', value: 88 },
    { hour: '12', value: 54 },
    { hour: '1p', value: 73 },
    { hour: '2p', value: 96 },
    { hour: '3p', value: 81 },
    { hour: '4p', value: 59 }
  ],
  owners: [
    { name: 'Alex Poluru', focus: 'Finance agents', load: 86 },
    { name: 'Maya Subbu', focus: 'Legal + strategy', load: 74 },
    { name: 'Priya Subbu', focus: 'People + procurement', load: 68 },
    { name: 'Sam Poluru', focus: 'Support + platform', load: 81 }
  ],
  sla: [
    { label: 'Run success SLA', value: 98 },
    { label: 'Tool reliability', value: 96 },
    { label: 'Handoff response', value: 88 }
  ],
  coverage: {
    score: 96,
    capacity: 78,
    reliability: 99.1
  },
  releases: [
    { day: 'Mon', item: 'Onboarding 2.4.0 shipped · Priya Subbu', coverage: 98 },
    { day: 'Tue', item: 'Research agent policy review · Maya Subbu', coverage: 74 },
    { day: 'Wed', item: 'Collections follow-up preflight · Alex Poluru', coverage: 96 },
    { day: 'Thu', item: 'Parser recovery plan · Maya Subbu', coverage: 92 },
    { day: 'Fri', item: 'Support router canary · Sam Poluru', coverage: 97 }
  ],
  deployModels: ['Polaris 4.1', 'Polaris 4.1 Mini', 'Atlas Reasoner'],
  deployTools: ['ERP lookup', 'Web search', 'Ticketing', 'HRIS records', 'Slack notify', 'Knowledge search'],
  formats: ['Canary', 'Production', 'Shadow']
};
