
export type Provider = 'gemini' | 'openrouter';

export interface LessonPlanFormState {
  provider: Provider;
  openRouterModel: string;
  subject: string;
  level: string;
  topic: string;
  goal: string;
  duration: string;
  method: string;
  outcome: string;
}
