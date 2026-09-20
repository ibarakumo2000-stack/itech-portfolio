import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Sparkles, Play, Square, RefreshCw, Music2, Activity } from 'lucide-react';

interface Note {
  name: string;
  freq: number;
  label: string;
  interval: string;
  keyHint: string;
}

const NOTES: Note[] = [
  { name: 'C4', freq: 261.63, label: 'Tonic', interval: '1', keyHint: '1' },
  { name: 'D4', freq: 293.66, label: 'Supertonic', interval: '2', keyHint: '2' },
  { name: 'E4', freq: 329.63, label: 'Mediant', interval: '3', keyHint: '3' },
  { name: 'F4', freq: 349.23, label: 'Subdominant', interval: '4', keyHint: '4' },
  { name: 'G4', freq: 392.00, label: 'Dominant', interval: '5', keyHint: '5' },
  { name: 'A4', freq: 440.00, label: 'Submediant', interval: '6', keyHint: '6' },
  { name: 'B4', freq: 493.88, label: 'Leading Tone', interval: '7', keyHint: '7' },
  { name: 'C5', freq: 523.25, label: 'Octave', interval: '8', keyHint: '8' }
];

export const InteractiveSonicCanvas: React.FC = () => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [recentSequence, setRecentSequence] = useState<string[]>([]);
  const [isPlayingArpeggio, setIsPlayingArpeggio] = useState(false);
  const [timbre, setTimbre] = useState<'warm' | 'pure' | 'rich'>('warm');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const activeOscillatorsRef = useRef<OscillatorNode[]>([]);
  const arpeggioTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  // Initialize or resume shared AudioContext safely
  const getAudioContext = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;

      if (!audioCtxRef.current) {
        const ctx = new AudioCtx();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.85;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(isMuted ? 0 : 0.4, ctx.currentTime);

        masterGain.connect(analyser);
        analyser.connect(ctx.destination);

        audioCtxRef.current = ctx;
        analyserRef.current = analyser;
        masterGainRef.current = masterGain;
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      return audioCtxRef.current;
    } catch {
      return null;
    }
  }, [isMuted]);

  // Update master gain when mute changes
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        isMuted ? 0 : 0.4,
        audioCtxRef.current.currentTime,
        0.05
      );
    }
  }, [isMuted]);

  // Visualizer Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    let phase = 0;

    const render = () => {
      animFrameIdRef.current = requestAnimationFrame(render);
      const width = canvas.width;
      const height = canvas.height;

      // Dark background with trail effect
      ctx2d.fillStyle = 'rgba(11, 13, 20, 0.25)';
      ctx2d.fillRect(0, 0, width, height);

      const analyser = analyserRef.current;
      let hasSignal = false;
      const bufferLength = analyser ? analyser.frequencyBinCount : 128;
      const dataArray = new Uint8Array(bufferLength);

      if (analyser && !isMuted) {
        analyser.getByteTimeDomainData(dataArray);
        // Check if there's active sound
        for (let i = 0; i < bufferLength; i++) {
          if (Math.abs(dataArray[i] - 128) > 3) {
            hasSignal = true;
            break;
          }
        }
      }

      // Draw subtle grid lines
      ctx2d.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx2d.lineWidth = 1;
      ctx2d.beginPath();
      ctx2d.moveTo(0, height / 2);
      ctx2d.lineTo(width, height / 2);
      ctx2d.stroke();

      if (hasSignal && analyser) {
        // Draw Real-time Web Audio Waveform
        ctx2d.lineWidth = 2.5;
        const gradient = ctx2d.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#f43f5e'); // rose-500
        gradient.addColorStop(0.5, '#06b6d4'); // cyan-500
        gradient.addColorStop(1, '#10b981'); // emerald-500

        ctx2d.strokeStyle = gradient;
        ctx2d.shadowBlur = 10;
        ctx2d.shadowColor = 'rgba(6, 182, 212, 0.4)';
        ctx2d.beginPath();

        const sliceWidth = (width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx2d.moveTo(x, y);
          } else {
            ctx2d.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx2d.lineTo(width, height / 2);
        ctx2d.stroke();
        ctx2d.shadowBlur = 0;
      } else {
        // Idle gentle harmonic sine wave
        phase += 0.03;
        ctx2d.lineWidth = 1.5;
        ctx2d.strokeStyle = 'rgba(6, 182, 212, 0.25)';
        ctx2d.beginPath();

        for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.sin(x * 0.02 + phase) * 6 + Math.sin(x * 0.01 - phase * 0.5) * 3;
          if (x === 0) ctx2d.moveTo(x, y);
          else ctx2d.lineTo(x, y);
        }
        ctx2d.stroke();
      }
    };

    render();

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isMuted]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      arpeggioTimeoutRef.current.forEach(clearTimeout);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const playHarmonicTone = useCallback((note: Note, duration = 0.85) => {
    setActiveNote(note.name);
    setRecentSequence((prev) => [...prev.slice(-5), note.name]);

    const ctx = getAudioContext();
    if (!ctx || !masterGainRef.current) {
      setTimeout(() => setActiveNote(null), 300);
      return;
    }

    try {
      const now = ctx.currentTime;
      const oscPrimary = ctx.createOscillator();
      const oscOvertone = ctx.createOscillator();
      const noteGain = ctx.createGain();

      // Timbre configurations
      if (timbre === 'pure') {
        oscPrimary.type = 'sine';
        oscPrimary.frequency.setValueAtTime(note.freq, now);
        oscPrimary.connect(noteGain);
      } else if (timbre === 'rich') {
        oscPrimary.type = 'triangle';
        oscPrimary.frequency.setValueAtTime(note.freq, now);

        oscOvertone.type = 'sine';
        oscOvertone.frequency.setValueAtTime(note.freq * 2, now); // Octave overtone
        const overtoneGain = ctx.createGain();
        overtoneGain.gain.setValueAtTime(0.2, now);
        oscOvertone.connect(overtoneGain);
        overtoneGain.connect(noteGain);

        oscOvertone.start(now);
        oscOvertone.stop(now + duration);
        oscPrimary.connect(noteGain);
      } else {
        // 'warm' default
        oscPrimary.type = 'sine';
        oscPrimary.frequency.setValueAtTime(note.freq, now);

        oscOvertone.type = 'sine';
        oscOvertone.frequency.setValueAtTime(note.freq * 1.5, now); // Perfect fifth subtle resonance
        const overtoneGain = ctx.createGain();
        overtoneGain.gain.setValueAtTime(0.08, now);
        oscOvertone.connect(overtoneGain);
        overtoneGain.connect(noteGain);

        oscOvertone.start(now);
        oscOvertone.stop(now + duration);
        oscPrimary.connect(noteGain);
      }

      // Envelope ADSR (Attack, Decay, Sustain, Release)
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.25, now + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.2);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noteGain.connect(masterGainRef.current);

      oscPrimary.start(now);
      oscPrimary.stop(now + duration);

      activeOscillatorsRef.current.push(oscPrimary);

      setTimeout(() => {
        setActiveNote((current) => (current === note.name ? null : current));
      }, duration * 1000);
    } catch {
      setTimeout(() => setActiveNote(null), 300);
    }
  }, [getAudioContext, timbre]);

  // Play full harmonic arpeggio sequence (Full Scale Cadence: C D E F G A B C)
  const handlePlayArpeggio = () => {
    if (isPlayingArpeggio) {
      arpeggioTimeoutRef.current.forEach(clearTimeout);
      arpeggioTimeoutRef.current = [];
      setIsPlayingArpeggio(false);
      setActiveNote(null);
      return;
    }

    setIsPlayingArpeggio(true);
    // Full scale cadence sequence: C, D, E, F, G, A, B, C
    const sequence = [
      NOTES[0], // C4
      NOTES[1], // D4
      NOTES[2], // E4
      NOTES[3], // F4
      NOTES[4], // G4
      NOTES[5], // A4
      NOTES[6], // B4
      NOTES[7]  // C5
    ];
    const intervalTime = 300;

    sequence.forEach((note, index) => {
      const timeout = setTimeout(() => {
        playHarmonicTone(note, 0.65);
        if (index === sequence.length - 1) {
          setTimeout(() => setIsPlayingArpeggio(false), 700);
        }
      }, index * intervalTime);

      arpeggioTimeoutRef.current.push(timeout);
    });
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const noteMap: { [key: string]: Note } = {
        '1': NOTES[0],
        '2': NOTES[1],
        '3': NOTES[2],
        '4': NOTES[3],
        '5': NOTES[4],
        '6': NOTES[5],
        '7': NOTES[6],
        '8': NOTES[7],
        c: NOTES[0],
        d: NOTES[1],
        e: NOTES[2],
        f: NOTES[3],
        g: NOTES[4],
        a: NOTES[5],
        b: NOTES[6]
      };

      const matchedNote = noteMap[e.key.toLowerCase()];
      if (matchedNote) {
        playHarmonicTone(matchedNote);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playHarmonicTone]);

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#121524] to-[#0d0f1a] border border-slate-800 space-y-6 shadow-xl">
      
      {/* Top Header & Mode Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
            <h4 className="text-sm font-bold font-display text-white">
              Harmonic Resonance Visualizer (Web Audio Synthesizer)
            </h4>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Click notes or use keys (1–8 or C–B) to synthesize full scale cadence frequencies (C D E F G A B C)
          </p>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-2">
          {/* Arpeggio Player */}
          <button
            onClick={handlePlayArpeggio}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              isPlayingArpeggio
                ? 'bg-rose-500 text-white font-bold animate-pulse'
                : 'bg-slate-900 border border-slate-800 text-cyan-300 hover:text-white hover:border-cyan-500/40'
            }`}
          >
            {isPlayingArpeggio ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlayingArpeggio ? 'Stop Cadence' : 'Play Full Cadence (C–C)'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isMuted ? 'Muted' : 'Sound On'}</span>
          </button>
        </div>
      </div>

      {/* Real-time Waveform Canvas Display */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800/90 bg-[#080a11] h-28 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={600}
          height={112}
          className="w-full h-full block"
        />
        <div className="absolute top-2.5 left-3 flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded border border-white/5">
          <Activity className="w-3 h-3 text-cyan-400" />
          <span>Real-time Waveform & Spectral Resonance</span>
        </div>
        <div className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-400">
          Timbre: <span className="text-cyan-300 capitalize">{timbre}</span>
        </div>
      </div>

      {/* Timbre & Acoustic Controls */}
      <div className="flex items-center justify-between gap-2 text-xs font-mono pt-1">
        <span className="text-slate-400 text-[11px]">Timbre Harmonic:</span>
        <div className="flex items-center gap-1.5">
          {(['warm', 'pure', 'rich'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimbre(t)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                timbre === t
                  ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Note Triggers Grid: Full Diatonic Cadence Scale (C D E F G A B C) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {NOTES.map((note) => {
          const isActive = activeNote === note.name;
          return (
            <button
              key={note.name}
              onClick={() => playHarmonicTone(note)}
              className={`p-3 sm:p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer select-none ${
                isActive
                  ? 'bg-rose-500/25 border-rose-400 text-white scale-95 shadow-lg shadow-rose-500/20'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono text-slate-400">[{note.keyHint}]</span>
                <span className="text-[10px] font-mono text-cyan-400">{note.interval}°</span>
              </div>
              <span className="text-base sm:text-lg font-bold font-mono text-white">{note.name}</span>
              <span className="text-[9px] uppercase font-mono text-slate-400 truncate max-w-full">{note.label}</span>
              <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-black/50 text-cyan-300">
                {note.freq.toFixed(0)} Hz
              </span>
            </button>
          );
        })}
      </div>

      {/* Sequence Feed */}
      <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-slate-800/80 text-slate-400">
        <span className="flex items-center gap-1.5">
          <Music2 className="w-3.5 h-3.5 text-rose-400" />
          <span>Active Cadence:</span>
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {recentSequence.length === 0 ? (
            <span className="text-slate-400 italic">Click notes or keys 1–8</span>
          ) : (
            recentSequence.map((n, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-rose-300 font-semibold text-[11px]"
              >
                {n}
              </span>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

