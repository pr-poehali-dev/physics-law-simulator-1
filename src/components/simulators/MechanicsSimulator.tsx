import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export const MechanicsSimulator = () => {
  const [mass, setMass] = useState([5]);
  const [velocity, setVelocity] = useState([10]);
  const [angle, setAngle] = useState([45]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 300 });
  const [time, setTime] = useState(0);

  const g = 9.81;
  const radAngle = (angle[0] * Math.PI) / 180;
  const vx = velocity[0] * Math.cos(radAngle);
  const vy = velocity[0] * Math.sin(radAngle);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setTime((t) => {
        const newTime = t + 0.05;
        const x = 50 + vx * newTime * 15;
        const y = 300 - (vy * newTime * 15 - 0.5 * g * newTime * newTime * 15);
        
        if (y >= 300 || x >= 700) {
          setIsPlaying(false);
          return 0;
        }
        
        setPosition({ x, y });
        return newTime;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, vx, vy]);

  const handleReset = () => {
    setIsPlaying(false);
    setTime(0);
    setPosition({ x: 50, y: 300 });
  };

  const maxHeight = (vy * vy) / (2 * g);
  const range = (velocity[0] * velocity[0] * Math.sin(2 * radAngle)) / g;
  const flightTime = (2 * vy) / g;

  const chartData = Array.from({ length: 100 }, (_, i) => {
    const t = (i / 100) * flightTime;
    return {
      t,
      h: vy * t - 0.5 * g * t * t,
      v: Math.sqrt(vx * vx + (vy - g * t) * (vy - g * t))
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Движение тела под углом к горизонту</h3>
            <div className="flex gap-2">
              <Button 
                onClick={() => setIsPlaying(!isPlaying)}
                variant={isPlaying ? "destructive" : "default"}
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={18} className="mr-2" />
                {isPlaying ? 'Стоп' : 'Запуск'}
              </Button>
              <Button onClick={handleReset} variant="outline">
                <Icon name="RotateCcw" size={18} />
              </Button>
            </div>
          </div>

          <div className="relative bg-gradient-to-b from-sky-900/20 to-green-900/20 rounded-lg h-[400px] border border-border overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600/50" />
            
            <div
              className="absolute w-6 h-6 bg-primary rounded-full shadow-lg transition-all duration-75"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                boxShadow: '0 0 20px rgba(14, 165, 233, 0.6)'
              }}
            />

            <div 
              className="absolute bottom-0 left-12 origin-bottom-left"
              style={{
                width: '100px',
                height: '2px',
                backgroundColor: 'rgba(139, 92, 246, 0.5)',
                transform: `rotate(-${angle[0]}deg)`
              }}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Графики зависимостей</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-3 font-mono">Высота от времени</p>
              <svg viewBox="0 0 300 150" className="w-full border border-border rounded bg-card/50">
                <polyline
                  points={chartData.map((d, i) => `${(i / 100) * 280 + 10},${140 - Math.max(0, d.h * 2)}`).join(' ')}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                />
                <line x1="10" y1="140" x2="290" y2="140" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
                <line x1="10" y1="10" x2="10" y2="140" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-3 font-mono">Скорость от времени</p>
              <svg viewBox="0 0 300 150" className="w-full border border-border rounded bg-card/50">
                <polyline
                  points={chartData.map((d, i) => `${(i / 100) * 280 + 10},${140 - d.v * 5}`).join(' ')}
                  fill="none"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="2"
                />
                <line x1="10" y1="140" x2="290" y2="140" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
                <line x1="10" y1="10" x2="10" y2="140" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon name="Settings" size={20} />
            Параметры
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label className="font-mono">Масса (кг)</Label>
                <span className="font-mono text-primary">{mass[0]}</span>
              </div>
              <Slider value={mass} onValueChange={setMass} min={1} max={20} step={0.5} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label className="font-mono">Скорость (м/с)</Label>
                <span className="font-mono text-primary">{velocity[0]}</span>
              </div>
              <Slider value={velocity} onValueChange={setVelocity} min={1} max={30} step={1} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label className="font-mono">Угол (°)</Label>
                <span className="font-mono text-primary">{angle[0]}</span>
              </div>
              <Slider value={angle} onValueChange={setAngle} min={0} max={90} step={5} />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon name="Calculator" size={20} />
            Расчётные данные
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-card/50 rounded border border-border">
              <span className="text-sm text-muted-foreground">Максимальная высота</span>
              <span className="font-mono font-semibold text-primary">{maxHeight.toFixed(2)} м</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card/50 rounded border border-border">
              <span className="text-sm text-muted-foreground">Дальность полёта</span>
              <span className="font-mono font-semibold text-primary">{range.toFixed(2)} м</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card/50 rounded border border-border">
              <span className="text-sm text-muted-foreground">Время полёта</span>
              <span className="font-mono font-semibold text-primary">{flightTime.toFixed(2)} с</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card/50 rounded border border-border">
              <span className="text-sm text-muted-foreground">Кинетическая энергия</span>
              <span className="font-mono font-semibold text-secondary">
                {((mass[0] * velocity[0] * velocity[0]) / 2).toFixed(2)} Дж
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
