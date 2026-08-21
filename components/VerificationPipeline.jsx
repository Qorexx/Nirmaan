import React from 'react';

export default function VerificationPipeline({ logs, isComplete, result }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl max-w-4xl w-full mx-auto font-mono text-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center">
          <span className="animate-pulse h-3 w-3 bg-blue-500 rounded-full mr-3"></span>
          x402 Autonomous Verification Pipeline
        </h2>
        {!isComplete && <span className="text-blue-400 animate-pulse">Processing...</span>}
      </div>

      <div className="space-y-4">
        {logs.map((log, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border flex gap-4 transition-all ${
              log.type === 'error' ? 'bg-red-900/20 border-red-800/50 text-red-200' :
              log.type === 'success' ? 'bg-emerald-900/20 border-emerald-800/50 text-emerald-200' :
              log.type === 'warning' ? 'bg-amber-900/20 border-amber-800/50 text-amber-200' :
              log.type === 'payment' ? 'bg-purple-900/20 border-purple-800/50 text-purple-200' :
              'bg-slate-800/50 border-slate-700 text-slate-300'
            }`}
          >
            <div className="text-slate-500 flex-shrink-0">[{log.timestamp}]</div>
            <div className="flex-1">
              <span className="font-bold mr-2">Step {log.step}:</span>
              {log.message}
              
              {/* Optional Extra JSON Payload Dump */}
              {log.extra && (
                <div className="mt-2 p-2 bg-black/40 rounded text-xs overflow-x-auto text-slate-400">
                  <pre>{JSON.stringify(log.extra, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        ))}

        {!isComplete && (
          <div className="p-4 rounded-lg border bg-slate-800/50 border-slate-700 text-slate-400 flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Awaiting next sequence...
          </div>
        )}
      </div>

      {isComplete && result && (
        <div className={`mt-8 p-6 rounded-xl border ${result.success ? 'bg-emerald-900/30 border-emerald-500' : 'bg-red-900/30 border-red-500'}`}>
          <h3 className={`text-2xl font-bold mb-2 ${result.success ? 'text-emerald-400' : 'text-red-400'}`}>
            {result.success ? '✅ Smart Contract Time-Locked' : '❌ Pipeline Rejected'}
          </h3>
          <p className="text-slate-300">
            {result.success 
              ? `Project status updated to ${result.status}. Audit Hash generated.`
              : result.error}
          </p>
        </div>
      )}
    </div>
  );
}
