// // QuizWithTabGuard.jsx
// import React, { useEffect, useRef, useState } from 'react';

// /**
//  * Props:
//  *  - maxWarnings (number) default 3
//  *  - warningDisplayMs (number) default 3500
//  *  - onAutoSubmit (function) called when warnings exceeded; receives current answers/warningCount
//  *  - children: quiz UI (form, questions)
//  */
// export default function QuizWithTabGuard({
//   maxWarnings = 3,
//   warningDisplayMs = 3500,
//   onAutoSubmit = (ctx) => { console.log('Auto-submit', ctx); },
//   children
// }) {
//   const [warnings, setWarnings] = useState(0);
//   const [showWarning, setShowWarning] = useState(false);
//   const [warningText, setWarningText] = useState('');
//   const [locked, setLocked] = useState(false);
//   const lastHiddenRef = useRef(null);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     function handleVisibilityChange() {
//       if (document.hidden) {
//         lastHiddenRef.current = Date.now();
//         addWarning('You left the quiz tab or minimized the browser.');
//       } else {
//         if (lastHiddenRef.current) {
//           const secs = Math.round((Date.now() - lastHiddenRef.current) / 1000);
//           showTransientWarning(`Welcome back — away for ${secs} s`);
//           lastHiddenRef.current = null;
//         }
//       }
//     }

//     function handleBlur() {
//       // small delay to avoid false positives when clicking inside page
//       setTimeout(() => {
//         // if document is hidden, visibilitychange already handled it — avoid duplicate
//         if (document.hidden) return;
//         addWarning('Window lost focus.');
//       }, 120);
//     }

//     function handleBeforeUnload(e) {
//       if (locked) return;
//       e.preventDefault();
//       e.returnValue = 'You have unsaved quiz progress. Leaving may auto-submit.';
//       // Optionally send beacon to log
//     }

//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     window.addEventListener('blur', handleBlur);
//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       window.removeEventListener('blur', handleBlur);
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       clearTimeout(timeoutRef.current);
//     };
//   }, [locked]);

//   function addWarning(reason) {
//     setWarnings(prev => {
//       const next = prev + 1;
//       setWarningText(`Warning ${next}/${maxWarnings}: ${reason}`);
//       setShowWarning(true);
//       clearTimeout(timeoutRef.current);
//       timeoutRef.current = setTimeout(() => setShowWarning(false), warningDisplayMs);

//       if (next >= maxWarnings) {
//         setLocked(true);
//         handleExceededWarnings(next);
//       }
//       return next;
//     });
//     // Optionally: send tracking to server via navigator.sendBeacon(...)
//   }

//   function showTransientWarning(text) {
//     setWarningText(text);
//     setShowWarning(true);
//     clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => setShowWarning(false), warningDisplayMs);
//   }

//   function handleExceededWarnings(currentWarnings) {
//     // Call parent's auto-submit handler
//     try {
//       onAutoSubmit({ warnings: currentWarnings, timestamp: Date.now() });
//     } catch (err) {
//       console.error('onAutoSubmit failed', err);
//     }
//   }

//   return (
//     <div style={{ padding: 16 }}>
//       <div style={{ marginBottom: 12 }}>
//         Warnings: <strong>{warnings}</strong> / <strong>{maxWarnings}</strong>
//       </div>

//       {showWarning && (
//         <div role="status" aria-live="polite"
//              style={{ background: '#fff3cd', padding: 10, borderRadius: 6, marginBottom: 12 }}>
//           {warningText}
//         </div>
//       )}

//       {locked ? (
//         <div style={{ padding: 20, borderRadius: 8, background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,.1)' }}>
//           <h3>Quiz Locked</h3>
//           <p>Too many tab switches. The quiz has been auto-submitted or locked.</p>
//         </div>
//       ) : (
//         <div>
//           {/*
//             children should contain the quiz form and a submit handler;
//             parents can read warning count from server or pass callbacks.
//           */}
//           {children}
//         </div>
//       )}
//     </div>
//   );
// }

// QuizWithTabGuard.jsx
import React, { useEffect, useRef, useState } from 'react';

export default function QuizWithTabGuard({
  maxWarnings = 3,
  warningDisplayMs = 3500,
  onAutoSubmit = (ctx) => console.log('Auto-submit', ctx),
  children
}) {
  const [warnings, setWarnings] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningText, setWarningText] = useState('');
  const [locked, setLocked] = useState(false);
  const lastHiddenRef = useRef(null);
  const timeoutRef = useRef(null);

  // ---------------- Local animations (stay inside file) ----------------
  const localStyles = `
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .slideDown { animation: slideDown 0.3s ease-out; }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(.96); }
      to { opacity: 1; transform: scale(1); }
    }
    .fadeIn { animation: fadeIn .4s ease-out; }

    @keyframes fadeSlow {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .fadeSlow { animation: fadeSlow .6s ease-out; }
  `;

  // ---------------- VISIBILITY + BLUR HANDLERS ----------------
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        lastHiddenRef.current = Date.now();
        addWarning('You left the quiz tab or minimized the browser.');
      } else {
        if (lastHiddenRef.current) {
          const secs = Math.round((Date.now() - lastHiddenRef.current) / 1000);
          showTransientWarning(`Welcome back — away for ${secs}s`);
          lastHiddenRef.current = null;
        }
      }
    }

    function handleBlur() {
      setTimeout(() => {
        if (document.hidden) return;
        addWarning('Window lost focus.');
      }, 120);
    }

    function handleBeforeUnload(e) {
      if (locked) return;
      e.preventDefault();
      e.returnValue = 'Quiz progress may be lost.';
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearTimeout(timeoutRef.current);
    };
  }, [locked]);

  // ---------------- WARNING HELPERS ----------------
  function addWarning(reason) {
    setWarnings((prev) => {
      const next = prev + 1;
      setWarningText(`⚠️ Warning ${next}/${maxWarnings}: ${reason}`);
      setShowWarning(true);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowWarning(false), warningDisplayMs);

      if (next >= maxWarnings) {
        setLocked(true);
        handleExceededWarnings(next);
      }
      return next;
    });
  }

  function showTransientWarning(text) {
    setWarningText(text);
    setShowWarning(true);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowWarning(false), warningDisplayMs);
  }

  function handleExceededWarnings(currentWarnings) {
    try {
      onAutoSubmit({ warnings: currentWarnings, timestamp: Date.now() });
    } catch (err) {
      console.error('onAutoSubmit failed:', err);
    }
  }

  // ---------------- UI ----------------
  return (
    <div className="p-4 md:p-6">

      {/* Local animation CSS */}
      <style>{localStyles}</style>

      {/* Warning Counter */}
      <div className="mb-4 flex items-center justify-between bg-white shadow-md rounded-xl p-4 border border-gray-100">
        <p className="text-lg font-semibold">
          ⚠️ Warnings:
          <span className={`ml-2 font-bold ${warnings > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {warnings}
          </span>
          <span className="text-gray-500"> / {maxWarnings}</span>
        </p>

        {/* Progress Bar */}
        <div className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 transition-all duration-500"
            style={{ width: `${(warnings / maxWarnings) * 100}%` }}
          />
        </div>
      </div>

      {/* Warning Toast */}
      {showWarning && (
        <div
          role="status"
          aria-live="polite"
          className="slideDown mb-4 p-4 rounded-xl border-l-8 border-yellow-500 bg-yellow-100 shadow text-yellow-900 font-medium"
        >
          {warningText}
        </div>
      )}

      {/* Locked Screen */}
      {locked ? (
        <div className="fadeIn p-10 bg-white rounded-2xl shadow-xl border border-red-200 text-center">
          <h3 className="text-3xl font-bold text-red-600 mb-3">🔒 Quiz Locked</h3>
          <p className="text-gray-600 text-lg">
            Too many tab switches. The quiz has been auto-submitted.
          </p>
        </div>
      ) : (
        <div className="fadeSlow">{children}</div>
      )}
    </div>
  );
}

