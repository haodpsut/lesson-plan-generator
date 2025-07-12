
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { LessonPlanFormState } from './types';
import { INITIAL_FORM_STATE } from './constants';
import { generateLessonPlan } from './services/geminiService';
import Header from './components/Header';
import LessonPlanForm from './components/LessonPlanForm';
import LessonPlanDisplay from './components/LessonPlanDisplay';
import SettingsModal from './components/SettingsModal';
import { SparklesIcon } from './components/Icons';

interface ApiKeys {
  gemini: string;
  openrouter: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<LessonPlanFormState>(INITIAL_FORM_STATE);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKeys>({ gemini: '', openrouter: '' });

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const geminiKey = localStorage.getItem('ai_lesson_plan_gemini_key') || '';
    const openrouterKey = localStorage.getItem('ai_lesson_plan_openrouter_key') || '';
    setApiKeys({ gemini: geminiKey, openrouter: openrouterKey });
    if (!geminiKey && !openrouterKey) {
        setIsSettingsOpen(true);
    }
  }, []);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setGeneratedPlan(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedPlan(null);

    try {
      const plan = await generateLessonPlan(formData, apiKeys);
      setGeneratedPlan(plan);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check your API key in Settings.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [formData, apiKeys]);
  
  const handleSaveKeys = (keys: ApiKeys) => {
    localStorage.setItem('ai_lesson_plan_gemini_key', keys.gemini);
    localStorage.setItem('ai_lesson_plan_openrouter_key', keys.openrouter);
    setApiKeys(keys);
    setIsSettingsOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />
      
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveKeys}
        currentKeys={apiKeys}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-6 sm:p-8 border border-slate-200 dark:border-slate-700">
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mb-4">
               <SparklesIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Create Your IT Lesson Plan in Seconds</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Fill in the details below and let AI craft a structured plan for your class.</p>
          </div>
          
          <LessonPlanForm 
            formData={formData}
            isLoading={isLoading}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        </div>

        <div ref={resultRef}>
          {error && (
            <div className="mt-8 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <LessonPlanDisplay 
            plan={generatedPlan}
            isLoading={isLoading}
          />
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-slate-400 dark:text-slate-500">
        <p>Powered by AI. Designed for modern IT educators.</p>
      </footer>
    </div>
  );
};

export default App;
