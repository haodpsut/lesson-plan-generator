
import { LessonPlanFormState, Provider } from './types';

export const PROVIDERS: {id: Provider, name: string}[] = [
    { id: 'gemini', name: 'Google Gemini' },
    { id: 'openrouter', name: 'OpenRouter' },
];

export const OPENROUTER_MODELS: string[] = [
    'google/gemini-flash-1.5',
    'mistralai/mistral-7b-instruct-v0.3',
    'meta-llama/llama-3-8b-instruct',
    'nousresearch/nous-hermes-2-mixtral-8x7b-dpo',
    'huggingfaceh4/zephyr-7b-beta',
    'openai/gpt-3.5-turbo',
];

export const SUBJECTS: string[] = [
  'Lập trình Python cơ bản & nâng cao',
  'Lập trình Java (OOP, Spring Boot)',
  'Cấu trúc dữ liệu & Giải thuật',
  'Lập trình mạng (Socket, TCP/IP)',
  'Kỹ thuật phần mềm',
  'Cơ sở dữ liệu (SQL, NoSQL)',
  'Hệ điều hành (Linux, Process Management)',
  'Machine Learning cơ bản',
  'Trí tuệ nhân tạo (AI với Python)',
  'An ninh mạng (Cybersecurity Fundamentals)',
  'Phát triển Web (HTML, CSS, JavaScript, React)',
];

export const LEVELS: string[] = [
  'Người mới bắt đầu (Beginner)',
  'Sinh viên năm 1-2',
  'Sinh viên năm 3-4',
  'Học viên đã có kinh nghiệm',
  'Trình độ chuyên sâu (Advanced)',
];

export const DURATIONS: string[] = [
  '45 phút',
  '60 phút',
  '90 phút',
  '120 phút',
  '180 phút (1 buổi học)',
];

export const METHODS: string[] = [
  'Thuyết trình & Demo',
  'Live Coding & Tương tác',
  'Học qua dự án (Project-Based Learning)',
  'Lớp học đảo ngược (Flipped Classroom)',
  'Thảo luận nhóm & Bài tập tình huống',
];

export const INITIAL_FORM_STATE: LessonPlanFormState = {
  provider: 'gemini',
  openRouterModel: OPENROUTER_MODELS[0],
  subject: SUBJECTS[0],
  level: LEVELS[1],
  topic: '',
  goal: '',
  duration: DURATIONS[2],
  method: METHODS[1],
  outcome: '',
};
