import React, { useRef, useState, useCallback } from 'react';
import { CopyIcon, PdfIcon, CheckIcon } from './Icons';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface LessonPlanDisplayProps {
  plan: string | null;
  isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-full"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-5/6"></div>
    </div>
    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2"></div>
    <div className="space-y-3">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-full"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-full"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-4/6"></div>
    </div>
  </div>
);

// Custom component to render styled code blocks from Markdown
const PreCodeComponent: Components['pre'] = ({ node, children, ...props }) => {
    const [isCodeCopied, setIsCodeCopied] = useState(false);
    
    const codeElement = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === 'code'
    );

    if (React.isValidElement(codeElement)) {
        const { className, children: codeContent } = codeElement.props as { className?: string; children?: React.ReactNode };
        const langMatch = /language-(\w+)/.exec(className || '');
        const lang = langMatch ? langMatch[1] : 'text';
        const code = String(codeContent).replace(/\n$/, '');

        const handleCopyCode = () => {
            if (!code) return;
            navigator.clipboard.writeText(code).then(() => {
                setIsCodeCopied(true);
                setTimeout(() => setIsCodeCopied(false), 2000);
            });
        };

        return (
            <div className="bg-slate-900 dark:bg-black/50 rounded-lg my-4 overflow-hidden border border-slate-700 not-prose">
                <div className="flex justify-between items-center px-4 py-2 bg-slate-800 dark:bg-slate-900/50 text-xs text-slate-400">
                    <span className="font-mono uppercase">{lang}</span>
                    <button
                        onClick={handleCopyCode}
                        className="inline-flex items-center gap-1.5 font-sans text-xs hover:text-white transition-colors"
                        aria-label="Copy code to clipboard"
                    >
                        {isCodeCopied ? <CheckIcon className="w-4 h-4 text-green-400"/> : <CopyIcon className="w-4 h-4"/>}
                        {isCodeCopied ? 'Đã chép!' : 'Chép mã'}
                    </button>
                </div>
                <pre {...props} className="p-4 !my-0 !bg-transparent text-sm text-white overflow-x-auto">
                    {children}
                </pre>
            </div>
        );
    }

    // Fallback for regular <pre> tags without a `code` child
    return <pre {...props} className="p-4 my-4 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto">{children}</pre>;
};


const LessonPlanDisplay: React.FC<LessonPlanDisplayProps> = ({ plan, isLoading }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = useCallback(() => {
    if (contentRef.current) {
      navigator.clipboard.writeText(contentRef.current.innerText).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  }, []);

  const handleExportToPdf = useCallback(() => {
    if (contentRef.current && plan) {
      const element = contentRef.current;
      const topic = plan.match(/### TÊN BÀI HỌC:\n(.+)/)?.[1].trim().replace(/\s+/g, '_') || 'lesson_plan';
      
      const opt = {
        margin: 0.5,
        filename: `${topic}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          onclone: (document: Document) => {
            const contentClone = document.querySelector('.prose');
            if (contentClone) {
                // Force light mode styles for PDF
                contentClone.classList.remove('dark:prose-invert');
                contentClone.classList.add('prose-slate');
            }
             // Handle custom code blocks specifically
            const codeBlocks = document.querySelectorAll<HTMLDivElement>('.not-prose');
            codeBlocks.forEach(block => {
              block.style.backgroundColor = '#f1f5f9'; // slate-100
              block.style.border = '1px solid #e2e8f0'; // slate-200

              const header = block.querySelector<HTMLDivElement>('div:first-child');
              if (header) {
                header.style.backgroundColor = '#e2e8f0'; // slate-200
                header.style.color = '#475569'; // slate-600
              }

              const preTag = block.querySelector('pre');
              if (preTag) {
                preTag.style.color = '#1e293b'; // slate-800
                preTag.style.backgroundColor = 'transparent';
              }
               const buttonText = header?.querySelector('button');
                if(buttonText) {
                    buttonText.style.color = '#475569';
                }
            });
          }
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // @ts-ignore
      html2pdf().from(element).set(opt).save();
    }
  }, [plan]);


  if (isLoading) {
    return (
      <div className="mt-8 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-6 sm:p-8 border border-slate-200 dark:border-slate-700">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!plan) {
    return null;
  }

  return (
    <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <div ref={contentRef} className="p-6 sm:p-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 !mt-6 !mb-3" {...props} />,
                ul: ({node, ...props}) => <ul className="!my-2" {...props} />,
                p: ({node, ...props}) => <p className="!my-2" {...props} />,
                pre: PreCodeComponent,
              }}
            >
              {plan}
            </ReactMarkdown>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 rounded-b-2xl">
        <button 
          onClick={handleCopyToClipboard}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          {isCopied ? <CheckIcon className="w-5 h-5 mr-2 text-green-500" /> : <CopyIcon className="w-5 h-5 mr-2" />}
          {isCopied ? 'Đã chép!' : 'Chép nội dung'}
        </button>
        <button 
          onClick={handleExportToPdf}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <PdfIcon className="w-5 h-5 mr-2" />
          Xuất PDF
        </button>
      </div>
    </div>
  );
};

export default LessonPlanDisplay;