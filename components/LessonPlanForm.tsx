
import React from 'react';
import { LessonPlanFormState } from '../types';
import { SUBJECTS, LEVELS, DURATIONS, METHODS, PROVIDERS, OPENROUTER_MODELS } from '../constants';
import { FormInput, FormSelect, FormTextarea } from './FormControls';
import { GenerateIcon, ResetIcon } from './Icons';
import Spinner from './Spinner';

interface LessonPlanFormProps {
  formData: LessonPlanFormState;
  isLoading: boolean;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

const LessonPlanForm: React.FC<LessonPlanFormProps> = ({ formData, isLoading, onFormChange, onSubmit, onReset }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect label="Nhà cung cấp AI" name="provider" value={formData.provider} onChange={onFormChange} required>
          {PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </FormSelect>
        
        {formData.provider === 'openrouter' && (
          <FormSelect label="Chọn Model (OpenRouter)" name="openRouterModel" value={formData.openRouterModel} onChange={onFormChange} required>
            {OPENROUTER_MODELS.map(model => <option key={model} value={model}>{model}</option>)}
          </FormSelect>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect label="Môn học" name="subject" value={formData.subject} onChange={onFormChange} required>
          {SUBJECTS.map(option => <option key={option} value={option}>{option}</option>)}
        </FormSelect>
        <FormSelect label="Trình độ học viên" name="level" value={formData.level} onChange={onFormChange} required>
          {LEVELS.map(option => <option key={option} value={option}>{option}</option>)}
        </FormSelect>
      </div>

      <FormInput label="Chủ đề bài học" name="topic" value={formData.topic} onChange={onFormChange} placeholder="Ví dụ: Hàm, biến, kiểu dữ liệu trong Python" required />
      
      <FormTextarea label="Mục tiêu bài học" name="goal" value={formData.goal} onChange={onFormChange} placeholder="Ví dụ: Giúp sinh viên hiểu và vận dụng được khái niệm hàm để giải quyết bài toán." rows={3} required />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect label="Thời lượng" name="duration" value={formData.duration} onChange={onFormChange} required>
          {DURATIONS.map(option => <option key={option} value={option}>{option}</option>)}
        </FormSelect>
        <FormSelect label="Phương pháp dạy học" name="method" value={formData.method} onChange={onFormChange} required>
          {METHODS.map(option => <option key={option} value={option}>{option}</option>)}
        </FormSelect>
      </div>

      <FormTextarea label="Kết quả mong đợi (Tùy chọn)" name="outcome" value={formData.outcome} onChange={onFormChange} placeholder="Ví dụ: Kết thúc buổi học, sinh viên có thể viết được hàm tính tổng hai số." rows={2} />

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {isLoading ? <Spinner /> : <GenerateIcon className="w-5 h-5 mr-2" />}
          {isLoading ? 'Đang tạo giáo án...' : 'Tạo giáo án'}
        </button>
        <button 
          type="button" 
          onClick={onReset}
          disabled={isLoading}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-slate-400 disabled:opacity-50 transition-colors duration-300"
        >
          <ResetIcon className="w-5 h-5 mr-2" />
          Reset Form
        </button>
      </div>
    </form>
  );
};

export default LessonPlanForm;
