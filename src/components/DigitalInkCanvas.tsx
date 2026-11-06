import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PenTool, Eraser, RotateCcw, Download, Check, Sparkles, Undo2 } from 'lucide-react';

interface DigitalInkCanvasProps {
  onSaveSnapshot?: (dataUrl: string) => void;
  height?: number;
  initialStrokeColor?: string;
  className?: string;
  showLinedBackground?: boolean;
}

interface Point {
  x: number;
  y: number;
  pressure?: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
  isEraser: boolean;
}

export const DigitalInkCanvas: React.FC<DigitalInkCanvasProps> = ({
  onSaveSnapshot,
  height = 240,
  initialStrokeColor = '#0D3B3E',
  className = '',
  showLinedBackground = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [penColor, setPenColor] = useState(initialStrokeColor);
  const [strokeWidth, setStrokeWidth] = useState(3.5);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [hasSaved, setHasSaved] = useState(false);

  // Redraw canvas with ruled lines and all recorded strokes
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, width, canvasHeight);

    // Draw lined exam paper lines (Garisan Peperiksaan)
    if (showLinedBackground) {
      const lineSpacing = 36;
      ctx.save();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      for (let y = lineSpacing; y < canvasHeight; y += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(12, y);
        ctx.lineTo(width - 12, y);
        ctx.stroke();
      }

      // Draw faint margin guideline on the right (for RTL Jawi writing margin!)
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)'; // Gilded Ochre margin
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(width - 40, 0);
      ctx.lineTo(width - 40, canvasHeight);
      ctx.stroke();
      ctx.restore();
    }

    // Render all confirmed strokes
    const allStrokes = [...strokes];
    if (currentStroke.length > 0) {
      allStrokes.push({
        points: currentStroke,
        color: penColor,
        width: strokeWidth,
        isEraser: tool === 'eraser'
      });
    }

    allStrokes.forEach((st) => {
      if (st.points.length < 2) return;
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (st.isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = st.width * 3.5;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = st.color;
        ctx.lineWidth = st.width;
      }

      ctx.beginPath();
      ctx.moveTo(st.points[0].x, st.points[0].y);

      for (let i = 1; i < st.points.length; i++) {
        const p1 = st.points[i - 1];
        const p2 = st.points[i];
        // Quadratic bezier smoothing for fluid Jawi Arabic curves
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
      }
      ctx.stroke();
      ctx.restore();
    });
  }, [strokes, currentStroke, penColor, strokeWidth, tool, showLinedBackground]);

  // Adjust canvas pixel resolution to container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    redraw();
  }, [height, redraw]);

  // Event handlers
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | PointerEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;
    let pressure = 0.5;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
      if ('pressure' in e && (e as PointerEvent).pressure > 0) {
        pressure = (e as PointerEvent).pressure;
      }
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
      pressure
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    setHasSaved(false);
    const pt = getCoordinates(e);
    setCurrentStroke([pt]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const pt = getCoordinates(e);
    setCurrentStroke((prev) => [...prev, pt]);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentStroke.length > 1) {
      const newStroke: Stroke = {
        points: currentStroke,
        color: penColor,
        width: strokeWidth,
        isEraser: tool === 'eraser'
      };
      setStrokes((prev) => [...prev, newStroke]);
    }
    setCurrentStroke([]);
  };

  const handleClear = () => {
    setStrokes([]);
    setCurrentStroke([]);
    setHasSaved(false);
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
    setHasSaved(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    if (onSaveSnapshot) {
      onSaveSnapshot(dataUrl);
    }
    setHasSaved(true);
    setTimeout(() => setHasSaved(false), 2500);
  };

  return (
    <div className={`border border-stone-300 dark:border-stone-700 rounded-xl overflow-hidden bg-white dark:bg-[#12282a] shadow-xs flex flex-col ${className}`}>
      {/* Canvas Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-stone-100/90 dark:bg-[#0f2426] border-b border-stone-200 dark:border-stone-800 text-xs">
        <div className="flex items-center gap-1.5">
          {/* Tool Selector */}
          <div className="flex items-center bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 p-0.5 rounded-lg shadow-xs">
            <button
              type="button"
              onClick={() => setTool('pen')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                tool === 'pen'
                  ? 'bg-[#0D3B3E] text-[#FBFBF9] font-medium shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <PenTool className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>قلم جاوي (Pen)</span>
            </button>
            <button
              type="button"
              onClick={() => setTool('eraser')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                tool === 'eraser'
                  ? 'bg-[#0D3B3E] text-[#FBFBF9] font-medium shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>ڤمادم (Eraser)</span>
            </button>
          </div>

          {/* Stroke Width Buttons */}
          {tool === 'pen' && (
            <div className="hidden sm:flex items-center gap-1 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 p-0.5 rounded-lg">
              <button
                type="button"
                onClick={() => setStrokeWidth(2)}
                className={`w-6 h-6 rounded flex items-center justify-center ${
                  strokeWidth === 2 ? 'bg-stone-200 dark:bg-stone-700 font-bold' : ''
                }`}
                title="Garisan Halus (2px)"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
              </button>
              <button
                type="button"
                onClick={() => setStrokeWidth(3.5)}
                className={`w-6 h-6 rounded flex items-center justify-center ${
                  strokeWidth === 3.5 ? 'bg-stone-200 dark:bg-stone-700 font-bold' : ''
                }`}
                title="Khat Sederhana (3.5px)"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-current inline-block" />
              </button>
              <button
                type="button"
                onClick={() => setStrokeWidth(5.5)}
                className={`w-6 h-6 rounded flex items-center justify-center ${
                  strokeWidth === 5.5 ? 'bg-stone-200 dark:bg-stone-700 font-bold' : ''
                }`}
                title="Khat Tebal (5.5px)"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-current inline-block" />
              </button>
            </div>
          )}

          {/* Color Presets */}
          {tool === 'pen' && (
            <div className="flex items-center gap-1">
              {[
                { color: '#0D3B3E', label: 'Biru Andalus' },
                { color: '#1a1a1a', label: 'Hitam Dakwat' },
                { color: '#0369a1', label: 'Biru Peperiksaan' },
                { color: '#b45309', label: 'Coklat Khat' }
              ].map((c) => (
                <button
                  key={c.color}
                  type="button"
                  onClick={() => setPenColor(c.color)}
                  style={{ backgroundColor: c.color }}
                  className={`w-5 h-5 rounded-full border transition-transform ${
                    penColor === c.color ? 'scale-115 ring-2 ring-[#D4AF37] ring-offset-1' : 'border-stone-300'
                  }`}
                  title={c.label}
                />
              ))}
            </div>
          )}
        </div>

        {/* Action buttons: Undo, Clear, Save Attempt */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleUndo}
            disabled={strokes.length === 0}
            className="flex items-center gap-1 px-2.5 py-1 text-stone-600 dark:text-stone-300 hover:text-stone-900 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Undur (Undo)"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">انوندور</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={strokes.length === 0}
            className="flex items-center gap-1 px-2.5 py-1 text-rose-600 hover:text-rose-700 dark:text-rose-400 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Kosongkan Kanvas"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">كوسوڠكن</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={strokes.length === 0}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              hasSaved
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-[#D4AF37] hover:bg-[#c4a132] text-[#0D3B3E] shadow-xs'
            }`}
          >
            {hasSaved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ترسيمڤن! (Tersimpan)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#0D3B3E]" />
                <span>سيمڤن چوبيئن (Simpan Tulisan)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full overflow-hidden touch-none cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{ height: `${height}px` }}
          className="w-full block bg-white dark:bg-[#12282a]"
        />

        {strokes.length === 0 && !isDrawing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center p-3 rounded-lg bg-stone-50/70 dark:bg-stone-900/60 backdrop-blur-xs border border-stone-200/50 dark:border-stone-800/50">
              <p className="font-jawi text-lg text-stone-500 dark:text-stone-400">
                توليسكن جواڤن اندا دسين دڠن ستيلوس (Apple Pencil / S-Pen) اتاو جاري
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                Ruang jawapan bergaris digital mengikut format kertas peperiksaan SSSRU
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
