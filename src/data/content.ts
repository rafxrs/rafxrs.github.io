/**
 * All personal content for the site lives in this file.
 *
 * Edit text, links, projects, and experience here — no component changes needed.
 * Every optional field can be deleted: the matching UI element disappears instead of
 * rendering a placeholder or a dead link. See ./types.ts for what each field does.
 *
 * Files referenced by path (CV, media) live in /public. A missing file never renders as a
 * broken link or image: CV buttons stay hidden and media slots show a marked placeholder,
 * and `npm run build` prints a warning listing what's missing.
 */
import type {
  About,
  ContactLinks,
  ExperienceEntry,
  Highlight,
  NavItem,
  OtherWorkItem,
  Profile,
  Project,
  ResearchHighlight,
  SectionCopy,
  Site,
  SkillGroup,
} from './types.ts'

export const site: Site = {
  url: 'https://rafxrs.github.io',
  title: 'Rafael Reis — Applied ML Engineer',
  description:
    'Applied ML engineer (M.Eng in Applied AI, McGill) working on deep RL, LLM evaluation, and neuroimaging data pipelines. Open to ML internships, Summer 2027.',
  sourceRepo: 'https://github.com/rafxrs/rafxrs.github.io',
}

export const profile: Profile = {
  name: 'Rafael Reis',
  initials: 'RR',
  role: 'Applied ML Engineer',
  affiliation: 'M.Eng in Applied AI @ McGill University',
  location: 'Montreal, QC',
  availability: 'Open to ML internships · Summer 2027',
  focusAreas: ['Deep Reinforcement Learning', 'LLM Evaluation', 'Neuroimaging Data', 'MLOps'],
  pitch:
    'I build and rigorously evaluate ML systems — from reinforcement learning agents to LLM evaluation pipelines and neuroimaging tools — with the DevOps background to ship them.',
  cv: '/Rafael_Reis_CV.pdf',
}

export const contactLinks: ContactLinks = {
  github: 'https://github.com/rafxrs',
  linkedin: 'https://linkedin.com/in/rafaelmaloreis',
  email: 'rafael.reis@mail.mcgill.ca',
}

export const nav: NavItem[] = [
  { label: 'Work', sectionId: 'work' },
  { label: 'Research', sectionId: 'research' },
  { label: 'Experience', sectionId: 'experience' },
  { label: 'About', sectionId: 'about' },
  { label: 'Contact', sectionId: 'contact' },
]

export const sections = {
  highlights: { title: 'Highlights' },
  work: {
    eyebrow: 'Work',
    title: 'Featured projects',
    intro:
      'Start with Domibot — its write-up traces the path from a plateaued AlphaZero-style agent to PPO, including the fixes that didn’t work.',
  },
  research: { eyebrow: 'Research', title: 'Neuroimaging pipelines at The Neuro' },
  experience: { eyebrow: 'Timeline', title: 'Experience & education' },
  skills: { eyebrow: 'Skills', title: 'Tools & methods' },
  about: { eyebrow: 'About', title: 'ML that is well evaluated and reliably engineered' },
  contact: {
    eyebrow: 'Contact',
    title: 'Get in touch',
    intro:
      'If you’re hiring for an ML internship — or want to talk RL, LLM evaluation, or neuroimaging pipelines — I’d be glad to hear from you.',
  },
} satisfies Record<string, SectionCopy>

export const highlights: Highlight[] = [
  {
    value: '95–100%',
    caption:
      'win rate of Domibot’s PPO agent vs. a BigMoney baseline on fixed kingdoms, after diagnosing why AlphaZero-style self-play plateaued',
    link: { href: '#project-domibot', label: 'See the evaluation' },
  },
  {
    value: '3',
    unit: 'research & industry teams',
    caption: 'The Neuro, Network Dynamics Lab (McGill), CN Cybersecurity (CISO)',
  },
  {
    value: '3rd place',
    caption: 'McGameJam 2024, 48-hour game development hackathon',
  },
  {
    value: 'FR · DE · EN',
    caption: 'native French and German, fluent English',
  },
]

export const projects: Project[] = [
  {
    id: 'domibot',
    title: 'Domibot: Deep RL Agent for Dominion',
    kicker: 'Flagship · Deep RL',
    summary:
      'A full Dominion game engine and a self-play RL agent that learned multi-step deck-building strategy after an AlphaZero-style approach plateaued.',
    tags: ['Python', 'PyTorch', 'PPO', 'GAE', 'MCTS', 'Self-Play', 'Pygame', 'pytest'],
    links: [
      { label: 'GitHub', href: 'https://github.com/rafxrs/domibot', icon: 'github' },
      {
        label: 'Model checkpoint',
        href: 'https://github.com/rafxrs/domibot/releases/tag/domibot2.1',
        icon: 'package',
      },
    ],
    media: {
      kind: 'video',
      sources: [
        { src: '/media/domibot-gui-demo.webm', type: 'video/webm; codecs="vp9"' },
        { src: '/media/domibot-gui-demo.mp4', type: 'video/mp4' },
      ],
      poster: '/media/domibot-gui-demo-poster.webp',
      startAt: 19.85,
      width: 800,
      height: 612,
      alt: 'Domibot’s Pygame GUI mid-game: the supply of Dominion base-set cards, the human player’s hand, and Domibot’s turn log showing it play Laboratory, Laboratory, then Militia before buying a Province.',
      caption:
        'Pygame GUI, recorded headlessly: a scripted Big Money player in the human seat vs. Domibot. The turn log shows engine turns like Laboratory → Laboratory → Militia.',
    },
    keyStats: [
      { value: '88.5%', label: 'vs. Big Money on random 10-card kingdoms (400 games)' },
      { value: '80.8%', label: 'vs. the best MCTS checkpoint at 100 simulations per move (200 games)' },
      { value: '~250×', label: 'faster per training iteration than MCTS self-play' },
    ],
    details: {
      problem:
        'Dominion rewards deferred payoffs (building an action-card “engine” that pays off turns later) under hidden information, with a large, variable decision space. Naive agents converge to a simple money strategy and never learn to build an engine.',
      approach: [
        'Built a complete base-set engine (all 26 kingdom cards, 2–4 players) where every card effect is a Python generator, exposing exactly one explicit legal-action choice at a time; a bounded 206-token action vocabulary and a 350-dim observation encoding that respects hidden information.',
        'Phase 1: AlphaZero-style PUCT self-play with a residual MLP policy/value network.',
        'Phase 2: PPO with GAE, batched parallel rollouts, entropy bonus, cosine LR decay, and an opponent pool.',
        'Also built a real-game move advisor that reconstructs a live dominion.games position from visible information and a parsed game log, fills in hidden cards via determinization, and runs MCTS on top of the PPO network.',
        '~10.7k lines of Python, 167 tests.',
      ],
      iterations: [
        {
          step: 'MCTS v1–v4',
          change:
            'Five separate fixes: action-continuation bias, MCTS-searched sub-decisions, curriculum kingdom sampling, multi-determinization search, TD-bootstrapped targets + opponent pool',
          outcome: 'None produced action chaining',
          verdict: 'negative',
        },
        {
          step: 'Control run',
          change: 'Fresh-network control run',
          outcome: 'Ruled out entrenchment as the cause',
          verdict: 'control',
        },
        {
          step: 'PPO + GAE',
          change: 'Switched to PPO + GAE',
          outcome: 'Chaining emerged by iteration 400',
          verdict: 'positive',
        },
        {
          step: 'Warm restart',
          change: 'LR decay + higher entropy',
          outcome: 'Broadened chaining in the hardest kingdom (7% → 20% of turns)',
          verdict: 'positive',
        },
      ],
      results: [
        'MCTS self-play reached 68% vs. a BigMoney baseline but never learned to chain action cards.',
        'PPO learned real multi-action engine turns within 400 iterations and ran ~250× faster per iteration.',
        'The final bot reached 95–100% vs. BigMoney on fixed kingdoms (final eval: 100% / 65% / 80% vs. BigMoney / BigMoney+terminal / best MCTS checkpoint).',
      ],
      resultsTable: {
        caption:
          'domibot2.1 on random 10-card kingdoms. The PPO policy plays with no search; each kingdom is played twice with seats swapped.',
        rows: [
          { opponent: 'Big Money', wins: 351, losses: 43, ties: 6, games: 400, winRate: 88.5, ci95: [85, 91] },
          {
            opponent: 'Big Money + best terminal card',
            wins: 286,
            losses: 103,
            ties: 11,
            games: 400,
            winRate: 72.9,
            ci95: [68, 77],
          },
          {
            opponent: 'domibot_v4.4',
            note: 'MCTS bot, 100 simulations per move',
            wins: 159,
            losses: 36,
            ties: 5,
            games: 200,
            winRate: 80.8,
            ci95: [75, 86],
          },
        ],
      },
      resultsFigure: {
        kind: 'image',
        // Dark-adapted copy of the original plot (lightness inverted, hues kept) so it sits on the
        // dark page; the untouched original opens full-size in a new tab.
        src: '/media/domibot-eval-curve-dark.webp',
        fullSize: '/media/domibot-eval-curve.png',
        background: '#111111',
        width: 1500,
        height: 900,
        alt: 'Line chart of domibot2 (PPO) evaluation win rate over 8,000 training iterations, from a fresh network to domibot2.1, against BigMoney, BigMoney plus a terminal card, and the domibot_v4.4 MCTS checkpoint. All three curves stay above the 50% line after the first few hundred iterations; dotted lines mark the warm restart and the opponent pool.',
        caption:
          'Eval win rate from a fresh network to domibot2.1 (20-game evals, rolling mean of 10). Dotted lines mark the warm restart (LR decay, entropy up) and the opponent pool.',
      },
      limitations: [
        'The diagnosis was credit assignment — Monte-Carlo value targets buried the payoff of deferred-reward cards, and pure self-play never rewarded the climb from a half-built engine, so it needed a different algorithm rather than another patch.',
        'A recent-checkpoint opponent pool gave mixed results, likely due to low diversity.',
        'Next steps: privileged critic, wider opponent pool, longer runs.',
      ],
    },
  },
  {
    id: 'counterspeech',
    title: 'LLM Counterspeech Generation & Evaluation',
    kicker: 'LLM evaluation',
    context:
      'Undergraduate Research Assistant, Network Dynamics Lab (Dr. Derek Ruths), McGill · Jan–May 2026',
    summary:
      'Safer LLM-generated responses to online hate speech, with a framework to measure quality tradeoffs.',
    tags: ['Python', 'GPT-4.1-mini', 'OpenAI API', 'Prompt Engineering', 'LLM Evaluation'],
    codeNotPublic: true,
    keyResult: {
      text: 'In the blinded comparison, annotators preferred the fine-tuned model’s responses overall.',
      note: 'Exact figures are withheld while the work is under review.',
    },
    details: {
      problem:
        'LLM-generated counterspeech fails in recurring patterns that can make responses unsafe or ineffective, and comparing generation strategies requires systematic evaluation rather than spot checks.',
      approach: [
        'Built failure-mode-aware generation pipelines targeting recurring failure patterns.',
        'Built a structured evaluation framework benchmarking baseline vs. fine-tuned LLMs across generation strategies.',
        'Processed large-scale hate speech datasets and engineered prompts and metrics to compare outputs at scale.',
      ],
      results: [
        'In the blinded comparison, annotators preferred the fine-tuned model’s responses overall. Exact figures are withheld while the work is under review.',
      ],
      // TODO: add `limitations: ['…']` once you want to share them — the section appears automatically.
    },
  },
  {
    id: 'chess',
    title: 'AlphaZero-Inspired Chess Engine',
    kicker: 'Deep RL · Self-play',
    summary: 'A chess AI that learns entirely through self-play, following the AlphaZero approach.',
    tags: ['Python', 'PyTorch', 'MCTS', 'Residual CNN', 'Multiprocessing', 'Google Colab'],
    links: [{ label: 'GitHub', href: 'https://github.com/rafxrs/chess-drl', icon: 'github' }],
    // TODO: add chess-selfplay.gif (or a training-loss plot) to public/media/. Until the file exists,
    // a placeholder slot is shown. If you use a different file, update `src` and `alt`, and set
    // `width`/`height` to the file's pixel size.
    media: {
      kind: 'image',
      src: '/media/chess-selfplay.gif',
      alt: 'A self-play game from the AlphaZero-inspired chess engine.',
      placeholder: 'chessboard',
    },
    // TODO: add a demo link here once one exists (e.g. an in-browser ONNX version).
    details: {
      problem:
        'Learn to play chess from the rules alone — no human games or handcrafted evaluation — which requires combining search with a learned policy and value function under a tight compute budget.',
      approach: [
        'Residual CNN with batch normalization taking a 19-plane 8×8 board encoding, with policy and value heads.',
        'Monte Carlo Tree Search with UCB exploration guided by the network.',
        'Multiprocess self-play data generation.',
        'A split workflow running CPU-heavy self-play locally and GPU training on Colab.',
        'Model-vs-model evaluation between iterations.',
        'A test suite generating performance and resource-usage reports.',
        'An interactive human-vs-AI board interface.',
      ],
      // TODO: add `results: ['…']` (e.g. win rate or Elo gain of the latest model vs. the initial
      // model over N games; number of self-play games generated).
      // TODO: add `limitations: ['…']` (e.g. compute limits on self-play volume, strength ceiling,
      // what you'd change).
    },
  },
]

export const research: ResearchHighlight = {
  framing:
    'In health and neuroscience research, analysis code is part of the method — when it’s slow or irreproducible, it limits what can be tested and trusted.',
  role: 'Undergraduate Research Assistant',
  org: 'Dr. Amir Shmuel’s lab, Montreal Neurological Institute (The Neuro), McGill',
  dates: 'May–Aug 2025',
  stat: { value: '66%', label: 'time saved on data analysis and movie/plot generation' },
  points: [
    'Optimized MATLAB/Python optical imaging data pipelines, reducing analysis time and improving reproducibility.',
    'Developed scripts to extract and quantify neural activity from optical imaging and fMRI datasets.',
    'Designed and 3D-printed custom imaging fixtures (Blender, UltiMaker Cura) to support functional imaging experiments.',
  ],
  tags: ['Python', 'MATLAB', 'fMRI', 'Optical Imaging', 'Data Pipelines'],
  codeNotPublic: true,
}

export const experience: ExperienceEntry[] = [
  {
    kind: 'education',
    role: 'M.Eng in Applied Artificial Intelligence',
    org: 'McGill University',
    location: 'Montreal',
    dates: 'Aug 2026 – exp. May 2028',
  },
  {
    kind: 'research',
    role: 'Undergraduate Research Assistant',
    org: 'Network Dynamics Lab, McGill (Dr. Derek Ruths)',
    dates: 'Jan–May 2026',
    points: ['LLM counterspeech pipelines and evaluation framework.'],
    link: { href: '#project-counterspeech', label: 'See the project' },
  },
  {
    kind: 'education',
    role: 'B.Eng in Computer Engineering, Minor in Applied AI',
    org: 'McGill University',
    dates: 'Sep 2021 – May 2026',
  },
  {
    kind: 'research',
    role: 'Undergraduate Research Assistant',
    org: 'The Neuro, McGill (Dr. Amir Shmuel)',
    dates: 'May–Aug 2025',
    points: ['Neuroimaging pipelines and analysis.'],
    link: { href: '#research', label: 'See the research highlight' },
  },
  {
    kind: 'industry',
    role: 'DevSecOps & Cloud Security Intern',
    org: 'Canadian National Railway (CISO)',
    location: 'Montreal',
    dates: 'May–Aug 2024',
    points: [
      'Designed and deployed Azure Pipelines CI/CD to automate build, test, and deployment for backend security systems (Python, Terraform, YAML, PowerShell).',
      'Wrote Terraform infrastructure-as-code to provision cloud resources, reducing manual configuration errors across environments.',
      'Hardened code infrastructure supporting CN’s enterprise security network, reducing attack surface.',
    ],
  },
  {
    kind: 'teaching',
    role: 'Academic Tutor',
    org: 'McGill University & self-employed',
    location: 'Montreal & Paris',
    dates: '2018 – present',
    points: [
      'Tutored university students in Calculus II, Linear Algebra, Differential Equations, and intro Python.',
    ],
  },
]

export const skills: SkillGroup[] = [
  {
    title: 'ML & Deep Learning',
    items: [
      'PyTorch',
      'TensorFlow',
      'HuggingFace',
      'scikit-learn',
      'Gym',
      'Reinforcement Learning (PPO, GAE, DQN, MCTS)',
    ],
  },
  {
    title: 'LLMs & NLP',
    items: ['OpenAI API', 'Prompt Engineering', 'LLM Evaluation', 'TF-IDF / Topic Analysis'],
  },
  {
    title: 'Data & Scientific Computing',
    items: ['NumPy', 'Pandas', 'MATLAB', 'fMRI & Optical Imaging data'],
  },
  {
    title: 'Languages',
    items: ['Python', 'C#', 'Java', 'C', 'SQL', 'JavaScript'],
  },
  {
    title: 'MLOps, Cloud & Testing',
    items: ['Docker', 'Terraform', 'Azure DevOps (CI/CD)', 'AWS', 'Git', 'pytest'],
  },
]

export const about: About = {
  paragraphs: [
    'M.Eng student in Applied AI at McGill, with a B.Eng in Computer Engineering and a minor in Applied AI. I’ve worked on reinforcement learning, LLM evaluation, and neuroimaging data pipelines, and I bring a DevSecOps background from CN, so I care about ML that is both well evaluated and reliably engineered.',
    'I’m especially drawn to applied ML in health and neuroscience, where robust computational tools directly affect research and care. Outside of ML, I build indie games in Unity, and I’m VP Internal of the McGill Chess Club.',
  ],
  languages: [
    { language: 'French', level: 'native' },
    { language: 'German', level: 'native' },
    { language: 'English', level: 'fluent' },
  ],
}

export const otherWork: OtherWorkItem[] = [
  {
    title: 'Deep RL for Settlers of Catan',
    description:
      'PPO vs. DQN agents with league-style self-play (45% win rate vs. prior versions); follow-up project CARL in progress (4-person team, ECSE 552).',
  },
  {
    title: 'Media Coverage Analysis Pipeline',
    description: 'Python NLP pipeline (TheNewsAPI, TF-IDF, sentiment/topic reporting).',
    href: 'https://github.com/rafxrs/comp370-project',
  },
  {
    title: 'Robe&Hood',
    description: '2D stealth-action game in Unity/C# with A* pathfinding and FSM enemy AI.',
    href: 'https://github.com/rafxrs/robe-and-hood',
  },
  {
    title: 'Rube’s Rocket Rumble',
    description: '3rd place, McGameJam 2024.',
    href: 'https://github.com/rafxrs/mc-game-jam-2024',
  },
  {
    title: 'Games on itch.io',
    href: 'https://rafaelxrs.itch.io/',
  },
]

export const footer = {
  builtWith: 'Built with React & Tailwind · Hosted on GitHub Pages',
}
