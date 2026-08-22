import React from 'react';

export default function VerificationPipeline({ logs, isComplete, result }) {
  return (
    <div className="bg-white/95 backdrop-blur-xl border border-white rounded-[2rem] p-10 shadow-2xl max-w-4xl w-full mx-auto font-mono text-[13px]">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-[#0f172a] flex items-center tracking-tight">
          <span className="animate-pulse h-3 w-3 bg-blue-600 rounded-full mr-4 shadow-[0_0_10px_rgba(37,99,235,0.5)]"></span>
          x402 Autonomous Verification Pipeline
        </h2>
        {!isComplete && <span className="text-blue-600 font-bold animate-pulse">Processing...</span>}
      </div>

      <div className="space-y-4">
        {logs.map((log, index) => (
          <div 
            key={index} 
            className={`p-5 rounded-xl border flex gap-4 transition-all duration-300 ${
              log.type === 'error' ? 'bg-red-50 border-red-200 text-red-700 shadow-sm' :
              log.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' :
              log.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm' :
              log.type === 'payment' ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' :
              'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <div className="text-slate-400 flex-shrink-0 font-medium">[{log.timestamp}]</div>
            <div className="flex-1">
              <span className="font-bold mr-2 text-[#0f172a]">Step {log.step}:</span>
              {log.message}
              
              {/* Optional Extra JSON Payload Dump */}
              {log.extra && (
                <div className="mt-3 p-4 bg-white border border-slate-200 rounded-lg text-[11px] overflow-x-auto text-slate-600 shadow-inner">
                  <pre>{JSON.stringify(log.extra, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        ))}

        {!isComplete && (
          <div className="p-5 rounded-xl border bg-slate-50 border-slate-200 text-slate-500 flex items-center font-medium">
            <svg className="animate-spin -ml-1 mr-4 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Awaiting next sequence...
          </div>
        )}
      </div>

      {isComplete && result && (
        <div className={`mt-10 p-8 rounded-2xl border shadow-lg ${result.success ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'}`}>
          <h3 className={`text-2xl font-bold mb-3 tracking-tight ${result.success ? 'text-emerald-700' : 'text-red-700'}`}>
            {result.success ? '✅ Smart Contract Time-Locked' : '❌ Pipeline Rejected'}
          </h3>
          <p className="text-[14px] text-slate-700 font-medium leading-relaxed">
            {result.success 
              ? `Project status updated to ${result.status}. Audit Hash generated.`
              : result.error}
          </p>
        </div>
      )}
    </div>
  );
}
