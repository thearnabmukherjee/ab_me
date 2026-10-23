import type { ReactNode } from 'react';

// All site content lives here. Edit this file to change what the page says.

export const links = {
  github: 'https://github.com/thearnabmukherjee',
  linkedin: 'https://www.linkedin.com/in/arnab-mukherjee-0ab6a41a9/',
  x: 'https://x.com/arnab1mukherjee',
  email: 'mailto:arnabjaymukherjee@gmail.com?subject=hey%20arnab',
} as const;

/** First AI role (BARC, Jan 2024): the hero counter counts from here. */
export const careerStart = new Date('2024-01-01');

const publicImg = (file: string): string => `${import.meta.env.BASE_URL}img/${file}`;
const favicon = (domain: string): string => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const avatar = publicImg('arnab.jpg');

export interface Job {
  company: string;
  role: string;
  place: string;
  dates: string;
  logo: string;
  /** Logo already has its own margin, so it needs less padding in the circle. */
  logoFull?: boolean;
  bullets: ReactNode[];
}

export const jobs: Job[] = [
  {
    company: 'MARS Snacking',
    role: 'AI Consultant',
    place: 'Remote',
    dates: 'Apr 2026 – now',
    logo: favicon('mars.com'),
    bullets: [
      <>Built the <b>DataPulse chatbot</b> on LangChain Deep Agents + Azure OpenAI. Searches 5M+ asset records, answers in under 15s, 75%+ retrieval accuracy.</>,
      <>Shipped an <b>AI data-quality assistant</b> that turns plain English into Databricks DQX rules at asset and column level. Asks follow-ups, auto-fills the UI form, detects primary keys from the Unity Catalog schema.</>,
      <>Built <b>Marvis</b>, a real-time voice copilot on Azure Voice Live. Streams PCM16 audio over WebSockets and can navigate, click, select and search the app for you.</>,
      <>Wired it into Databricks (SQL Warehouse, Vector Search, Unity Catalog) with service-principal auth and MLflow / LangChain autolog tracing.</>,
      <>Data stewards and product owners now ask instead of digging through manual KPI lookups and hand-written SQL checks.</>,
    ],
  },
  {
    company: 'Atrina Technologies',
    role: 'AI Engineer',
    place: 'Mumbai',
    dates: 'Feb 2025 – Apr 2026',
    logo: publicImg('atrina.png'),
    logoFull: true,
    bullets: [
      <>Built a <b>regulatory compliance doc system</b> that auto-generates FDA, EMA and PMDA documents from one source with GPT-4 + RAG. 10x faster doc cycles.</>,
      <>Built a <b>meeting intelligence platform</b>, a Fireflies alternative: transcription, speaker diarization, action items and sentiment with Whisper + LangChain.</>,
      <>Built a <b>Pharma Field Force Assistant</b>: WhatsApp voice notes in, OpenAI o3 turns them into region-wise themes and market signals, delivered as daily voice-agent calls with business heads plus a RAG chatbot.</>,
      <>Architected a <b>multi-tenant AI platform</b> for 50+ concurrent orgs, each with its own LLM config, knowledge base and telephony routing.</>,
      <>Got voice agents down to <b>~0.5s</b> on LiveKit with OpenAI and Gemini Realtime. Plugged them into Twilio, Exotel and Meta with SIP trunking, IVR automation and live transcription.</>,
      <>Ran it all on GCP with Docker, CI/CD, load balancing and autoscaling.</>,
    ],
  },
  {
    company: 'Bhabha Atomic Research Centre',
    role: 'Trainee, Data Science & AI',
    place: 'Mumbai',
    dates: 'Jan 2024 – Dec 2024',
    logo: favicon('barc.gov.in'),
    bullets: [
      <>Yes, the nuclear one. Built a <b>computer vision system</b> with OpenCV and deep learning that spots skin changes and early radiation exposure symptoms. 85%+ detection accuracy.</>,
      <>Used GPT-3 to write medical reports that link visual findings to clinical indicators.</>,
      <>Built a secure chatbot and Q&amp;A system on LangChain + HuggingFace LLMs (GPT-2, Mistral-7B).</>,
      <>Mapped radiation spread with KMeans clustering and Ordinary Kriging on Iodine-131 and Caesium data.</>,
    ],
  },
];

export interface Project {
  /** Big headline. `sub` renders as a second, muted line. */
  num: string;
  sub?: string;
  title: string;
  body: string;
  stack: string[];
  /** Full-width tile. */
  big?: boolean;
}

export const projects: Project[] = [
  { num: '5M+ assets.', sub: 'under 15s.', title: 'DataPulse agentic search', body: 'ask in plain English, get the right data asset. deep agents do the digging.', stack: ['Deep Agents', 'Azure OpenAI', 'Databricks Vector Search'], big: true },
  { num: 'English in.', sub: 'rules out.', title: 'AI data-quality assistant', body: 'describe the check, get a Databricks DQX rule.', stack: ['LangChain', 'DQX', 'Unity Catalog'] },
  { num: '10x', title: 'compliance docs on autopilot', body: 'FDA, EMA and PMDA docs from one source of truth.', stack: ['GPT-4', 'RAG'] },
  { num: '50+ orgs', title: 'multi-tenant AI platform', body: 'one platform, every client isolated, each with its own LLM brain.', stack: ['FastAPI', 'Docker', 'GCP'] },
  { num: '~0.5s', title: 'real-time voice agents', body: 'talks back faster than most people do.', stack: ['LiveKit', 'OpenAI Realtime', 'Twilio'] },
  { num: 'daily 11 AM', title: 'pharma field force assistant', body: 'field voice notes become market signals, then a voice agent briefs the business heads.', stack: ['WhatsApp', 'OpenAI o3', 'RAG'] },
  { num: 'meetings, solved', title: 'meeting intelligence', body: 'transcripts, speakers, action items, sentiment. a homemade Fireflies.', stack: ['Whisper', 'LangChain'] },
  { num: '85%+', sub: 'detection accuracy.', title: 'radiation exposure detection', body: "computer vision that catches early radiation symptoms, built at India's premier nuclear research centre.", stack: ['OpenCV', 'Deep learning', 'GPT-3'], big: true },
];

export interface School {
  name: string;
  degree: string;
  dates: string;
  logo: string;
}

export const education: School[] = [
  { name: "NCRD's Sterling Institute of Management Studies", degree: 'Master of Computer Applications · CGPA 8.89', dates: '2022 – 2024', logo: favicon('ncrdsims.edu.in') },
  { name: 'Ramniranjan Jhunjhunwala College', degree: 'B.Sc. Computer Science · CGPA 8.58', dates: '2018 – 2021', logo: favicon('rjcollege.edu.in') },
];

/** [label, Simple Icons slug or null when no logo exists]. Logos render monochrome. */
export type Skill = readonly [label: string, slug: string | null];

export const skills: { group: string; items: Skill[] }[] = [
  { group: 'LLMs & agentic AI', items: [['LangChain', 'langchain'], ['LangGraph', 'langgraph'], ['Deep Agents', null], ['Google ADK', null], ['Azure OpenAI', null], ['GPT-4 / 4o', null], ['Gemini', 'googlegemini'], ['Claude', 'claude'], ['HuggingFace', 'huggingface'], ['RAG', null], ['Multi-agent systems', null], ['Prompt engineering', null]] },
  { group: 'voice & real-time', items: [['LiveKit', 'livekit'], ['OpenAI Realtime', null], ['Gemini Realtime', 'googlegemini'], ['Azure Voice Live', null], ['Deepgram', null], ['Whisper', null], ['Silero VAD', null], ['WebRTC', 'webrtc'], ['WebSockets', null], ['SIP', null], ['Speaker diarization', null]] },
  { group: 'data platforms', items: [['Databricks', 'databricks'], ['MLflow', 'mlflow'], ['Unity Catalog', null], ['Vector Search', null], ['DQX', null], ['Genie', null], ['Qdrant', null], ['FAISS', null], ['Pinecone', null], ['Weaviate', null]] },
  { group: 'engineering', items: [['Python', 'python'], ['FastAPI', 'fastapi'], ['Flask', 'flask'], ['Docker', 'docker'], ['Kubernetes', 'kubernetes'], ['GCP', 'googlecloud'], ['Azure', null], ['AWS', null], ['Azure DevOps', null], ['CI/CD', null], ['PostgreSQL', 'postgresql'], ['MongoDB', 'mongodb'], ['REST APIs', null], ['Async Python', null], ['shipping on fridays', null]] },
];

export interface Belief {
  text: string;
  /** Set for quotes: the text renders in quote marks with this attribution. */
  by?: string;
}

// One idea per line. Keep it that way when adding more.
export const beliefs: Belief[] = [
  { text: 'the pool taught me discipline before anything else did. 5 am sets, cold water, nobody clapping.' },
  { text: "You can't put a limit on anything. The more you dream, the farther you get.", by: 'Michael Phelps' },
  { text: 'intensity without balance burns you out. peaty has "equilibrium" tattooed under his olympic rings for a reason.' },
  { text: 'make the people around you better. a good teammate beats a brilliant solo player every time.' },
  { text: 'credit goes to the team, blame stays with me.' },
  { text: 'review the code, never the person.' },
  { text: 'ask the dumb question. someone else in the room was too scared to.' },
  { text: 'Waste no more time arguing about what a good man should be. Be one.', by: 'Marcus Aurelius' },
  { text: 'We suffer more often in imagination than in reality.', by: 'Seneca' },
  { text: 'strong opinions, loosely held. change your mind the moment the evidence does.' },
  { text: 'ship it, then make it good. a rough thing in prod beats a perfect slide deck.' },
  { text: 'every expert was lost once. stay confused a little longer than feels comfortable.' },
  { text: 'I just want to have fun.', by: 'Peter Sagan' },
  { text: 'read fiction. king and koontz taught me more about people than any self-help book.' },
  { text: 'The mystery of human existence lies not in just staying alive, but in finding something to live for.', by: 'Fyodor Dostoevsky' },
  { text: 'blonde by frank ocean is proof that the quietest things hit the hardest.' },
  { text: 'sleep is the cheapest performance upgrade there is.' },
  { text: 'leave every codebase, team and room a little better than you found it.' },
];

export const certs: string[] = [
  'GCP Professional DevOps Engineer',
  'Machine Learning with Python & Data Science',
  'REST API with Flask & Python',
  'Advanced Google Analytics',
];
