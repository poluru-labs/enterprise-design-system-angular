export type NavItem = {
  path: string;
  label: string;
  icon: string;
  exact?: boolean;
  badge?: number;
};

export const templateConfig = {
  title: 'Content studio',
  eyebrow: 'Editorial operations',
  summary: 'Draft, approve, and schedule campaign content with brand guardrails across every channel.',
  action: 'Create content',
  brand: { mark: 'CS', name: 'Content', accent: 'Studio' },
  workspace: 'Content Studio workspace',
  user: { initials: 'AP', name: 'Alex Poluru', role: 'Editorial lead' },
  navGroups: [
    {
      label: 'Editorial',
      items: [
        { path: '/', label: 'Dashboard', icon: 'dashboard', exact: true },
        { path: '/projects', label: 'Projects', icon: 'folder_open' },
        { path: '/library', label: 'Library', icon: 'library_books' }
      ]
    },
    {
      label: 'Publish',
      items: [
        { path: '/calendar', label: 'Calendar', icon: 'calendar_month' },
        { path: '/approvals', label: 'Approvals', icon: 'rate_review', badge: 3 },
        { path: '/brand-voice', label: 'Brand voice', icon: 'verified_user' }
      ]
    }
  ] as { label: string; items: NavItem[] }[],
  metrics: [
    { label: 'Content in production', value: '76', trend: '+11', trendDir: 'up' as const, hint: 'this week', icon: 'edit_note', path: '/library' },
    { label: 'Approval rate', value: '87.9%', trend: '+4.4%', trendDir: 'up' as const, hint: 'this month', icon: 'thumb_up', path: '/approvals' },
    { label: 'Brand matches', value: '94.1%', trend: '+1.6%', trendDir: 'up' as const, hint: 'guardrail pass', icon: 'verified', path: '/brand-voice' },
    { label: 'Published this month', value: '138', trend: '+22%', trendDir: 'up' as const, hint: 'across channels', icon: 'publish', path: '/calendar' }
  ],
  mustHaveFeatures: [
    {
      title: 'AI Draft Studio',
      detail: 'Generate first drafts from campaign goals, audience, and tone.',
      status: 'Enabled'
    },
    {
      title: 'Approval Workflow',
      detail: 'Route content to reviewers with due dates and audit history.',
      status: 'Enabled'
    },
    {
      title: 'Brand Guardrails',
      detail: 'Check message consistency, restricted claims, and naming rules.',
      status: 'Enabled'
    },
    {
      title: 'Performance Insights',
      detail: 'Track CTR, completion rate, and conversion lift by channel.',
      status: 'Enabled'
    }
  ],
  activity: [
    { title: 'Product launch campaign drafted', detail: '8 assets ready for review · Priya Subbu', status: 'Review', time: '12 min ago', path: '/approvals' },
    { title: 'Blog brief approved', detail: 'Topic: AI governance · Maya Subbu', status: 'Approved', time: '1 hr ago', path: '/library' },
    { title: 'Social series scheduled', detail: 'Week of August 26 · Sam Poluru', status: 'Scheduled', time: '3 hr ago', path: '/calendar' },
    { title: 'Partner webinar kit blocked', detail: 'Restricted claim on “zero-risk AI” · Alex Poluru', status: 'Blocked', time: '5 hr ago', path: '/brand-voice' },
    { title: 'Security eBook chapter 3 published', detail: 'LinkedIn + blog syndication · Maya Subbu', status: 'Published', time: 'Yesterday', path: '/library' }
  ],
  projects: [
    { id: 'q3-launch', name: 'Q3 Enterprise Launch', owner: 'Alex Poluru', team: 'Product marketing', channel: 'Multi-channel', progress: 82, due: 'Aug 29', status: 'Review', assets: 18 },
    { id: 'security-ebook', name: 'Security eBook Series', owner: 'Maya Subbu', team: 'Content', channel: 'Blog', progress: 57, due: 'Sep 04', status: 'Draft', assets: 6 },
    { id: 'partner-webinar', name: 'Partner Webinar Kit', owner: 'Priya Subbu', team: 'Alliances', channel: 'Email', progress: 41, due: 'Sep 11', status: 'Review', assets: 9 },
    { id: 'brand-refresh', name: 'Brand refresh microsite', owner: 'Sam Poluru', team: 'Brand', channel: 'Web', progress: 68, due: 'Sep 18', status: 'Draft', assets: 12 },
    { id: 'q4-nurture', name: 'Q4 nurture sequence', owner: 'Alex Poluru', team: 'Demand', channel: 'Email', progress: 33, due: 'Sep 25', status: 'Draft', assets: 7 },
    { id: 'analyst-brief', name: 'Analyst briefing pack', owner: 'Maya Subbu', team: 'Comms', channel: 'Deck', progress: 91, due: 'Aug 27', status: 'Approved', assets: 4 },
    { id: 'customer-stories', name: 'Customer story sprint', owner: 'Priya Subbu', team: 'Content', channel: 'Blog', progress: 24, due: 'Oct 02', status: 'Blocked', assets: 3 },
    { id: 'social-always-on', name: 'Always-on social', owner: 'Sam Poluru', team: 'Social', channel: 'Social', progress: 74, due: 'Ongoing', status: 'Scheduled', assets: 22 }
  ],
  calendar: [
    { day: 'Mon', date: 'Aug 25', item: 'Campaign brief alignment', owner: 'Alex Poluru', channel: 'Internal', status: 'Complete' },
    { day: 'Tue', date: 'Aug 26', item: 'SEO article batch review', owner: 'Maya Subbu', channel: 'Blog', status: 'Current' },
    { day: 'Wed', date: 'Aug 27', item: 'Social snippets publishing', owner: 'Sam Poluru', channel: 'Social', status: 'Upcoming' },
    { day: 'Thu', date: 'Aug 28', item: 'Brand council approvals', owner: 'Priya Subbu', channel: 'Legal', status: 'Upcoming' },
    { day: 'Fri', date: 'Aug 29', item: 'Performance recap and backlog grooming', owner: 'Alex Poluru', channel: 'Internal', status: 'Upcoming' },
    { day: 'Mon', date: 'Sep 01', item: 'Q3 launch landing page go-live', owner: 'Sam Poluru', channel: 'Web', status: 'Upcoming' },
    { day: 'Wed', date: 'Sep 03', item: 'Security eBook chapter 4 draft', owner: 'Maya Subbu', channel: 'Blog', status: 'Upcoming' }
  ],
  brandRules: [
    { title: 'Audience clarity', detail: 'Use clear language for technical buyers while preserving business context.', priority: 'Priority', status: 'Healthy' },
    { title: 'Voice consistency', detail: 'Keep tone confident, practical, and solution-led in all assisted drafts.', priority: 'Always on', status: 'Healthy' },
    { title: 'Compliance checks', detail: 'Flag unsupported claims and blocked terminology before publishing.', priority: 'Required', status: 'Guarded' },
    { title: 'Product naming', detail: 'Use “Content Studio” and “Poluru Labs” exactly. Do not abbreviate product names in headlines.', priority: 'Required', status: 'Healthy' },
    { title: 'Proof before praise', detail: 'Lead with a measurable outcome, then the capability. Avoid hype adjectives.', priority: 'Priority', status: 'Healthy' },
    { title: 'Inclusive language', detail: 'Avoid gendered defaults and military metaphors in campaign copy.', priority: 'Always on', status: 'Guarded' }
  ],
  restrictedClaims: [
    { term: 'zero-risk AI', reason: 'Legal will not back an absolute risk claim.', owner: 'Maya Subbu' },
    { term: '#1 in the category', reason: 'Requires a dated analyst citation in the same asset.', owner: 'Alex Poluru' },
    { term: 'guaranteed ROI', reason: 'Finance-only language. Marketing may say “measured lift”.', owner: 'Priya Subbu' },
    { term: 'fully autonomous', reason: 'Human review remains in the loop for publish.', owner: 'Sam Poluru' }
  ],
  toneProfile: 'Crisp, trusted, and outcome-focused. Keep sentence length short and avoid hype.',
  approvals: [
    { id: 'AP-2041', title: 'Q3 launch hero copy', project: 'Q3 Enterprise Launch', reviewer: 'Alex Poluru', waiting: '2 hr', status: 'Waiting', risk: 'Medium', channel: 'Web', due: 'Aug 27' },
    { id: 'AP-2038', title: 'Security eBook chapter 3', project: 'Security eBook Series', reviewer: 'Maya Subbu', waiting: '26 min', status: 'Waiting', risk: 'Low', channel: 'Blog', due: 'Aug 26' },
    { id: 'AP-2033', title: 'Partner webinar invite', project: 'Partner Webinar Kit', reviewer: 'Priya Subbu', waiting: '4 hr', status: 'Waiting', risk: 'High', channel: 'Email', due: 'Aug 28' },
    { id: 'AP-2029', title: 'Always-on LinkedIn carousel', project: 'Always-on social', reviewer: 'Sam Poluru', waiting: 'Resolved', status: 'Approved', risk: 'Low', channel: 'Social', due: 'Aug 25' },
    { id: 'AP-2021', title: 'Customer story: Harborline', project: 'Customer story sprint', reviewer: 'Maya Subbu', waiting: 'Resolved', status: 'Changes', risk: 'Medium', channel: 'Blog', due: 'Aug 24' },
    { id: 'AP-2016', title: 'Analyst briefing opener', project: 'Analyst briefing pack', reviewer: 'Alex Poluru', waiting: 'Resolved', status: 'Approved', risk: 'Low', channel: 'Deck', due: 'Aug 23' }
  ],
  library: [
    { id: 'LIB-118', title: 'AI governance explainer', type: 'Blog post', owner: 'Maya Subbu', channel: 'Blog', status: 'Published', published: 'Aug 21', brandMatch: '97%' },
    { id: 'LIB-117', title: 'Q3 launch teaser email', type: 'Email', owner: 'Alex Poluru', channel: 'Email', status: 'Published', published: 'Aug 20', brandMatch: '95%' },
    { id: 'LIB-114', title: 'Product naming one-pager', type: 'Guide', owner: 'Sam Poluru', channel: 'Internal', status: 'Published', published: 'Aug 18', brandMatch: '99%' },
    { id: 'LIB-111', title: 'Security series trailer', type: 'Social', owner: 'Sam Poluru', channel: 'Social', status: 'Scheduled', published: 'Aug 27', brandMatch: '93%' },
    { id: 'LIB-108', title: 'Partner webinar landing', type: 'Landing page', owner: 'Priya Subbu', channel: 'Web', status: 'Review', published: '—', brandMatch: '88%' },
    { id: 'LIB-104', title: 'Nurture sequence 01', type: 'Email', owner: 'Alex Poluru', channel: 'Email', status: 'Draft', published: '—', brandMatch: '91%' },
    { id: 'LIB-101', title: 'Customer story outline', type: 'Brief', owner: 'Priya Subbu', channel: 'Blog', status: 'Blocked', published: '—', brandMatch: '72%' },
    { id: 'LIB-097', title: 'Brand voice cheat sheet', type: 'Guide', owner: 'Maya Subbu', channel: 'Internal', status: 'Published', published: 'Aug 12', brandMatch: '100%' },
    { id: 'LIB-092', title: 'Q2 recap carousel', type: 'Social', owner: 'Sam Poluru', channel: 'Social', status: 'Published', published: 'Jul 30', brandMatch: '94%' },
    { id: 'LIB-088', title: 'Analyst FAQ appendix', type: 'Deck', owner: 'Maya Subbu', channel: 'Deck', status: 'Approved', published: 'Aug 22', brandMatch: '96%' }
  ],
  channels: [
    { name: 'Blog', share: 34, lift: '+8%' },
    { name: 'Email', share: 27, lift: '+12%' },
    { name: 'Social', share: 21, lift: '+4%' },
    { name: 'Web', share: 18, lift: '+15%' }
  ],
  owners: [
    { name: 'Alex Poluru', focus: 'Launch + demand', load: 84 },
    { name: 'Maya Subbu', focus: 'Long-form + legal', load: 71 },
    { name: 'Priya Subbu', focus: 'Partners + stories', load: 63 },
    { name: 'Sam Poluru', focus: 'Social + brand', load: 78 }
  ],
  contentTypes: [
    { label: 'Blog Post', value: 'blog' },
    { label: 'Email Campaign', value: 'email' },
    { label: 'Social Series', value: 'social' },
    { label: 'Landing Page', value: 'landing' },
    { label: 'Deck', value: 'deck' }
  ],
  channelOptions: ['Blog', 'Email', 'Social', 'Web', 'Deck', 'Internal'],
  ownerOptions: ['Alex Poluru', 'Maya Subbu', 'Priya Subbu', 'Sam Poluru'],
  inbox: [
    { title: 'Partner webinar invite needs legal', detail: 'Restricted claim flagged on “zero-risk AI”.' },
    { title: 'Q3 launch hero copy waiting', detail: 'Alex Poluru is the reviewer. Due Aug 27.' },
    { title: 'Customer story: Harborline', detail: 'Maya Subbu requested changes on proof points.' }
  ]
};
