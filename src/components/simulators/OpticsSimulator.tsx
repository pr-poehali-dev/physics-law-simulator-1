import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export const OpticsSimulator = () => {
  const [angle1, setAngle1] = useState([30]);
  const [n1, setN1] = useState([1.0]);
  const [n2, setN2] = useState([1.5]);

  const angle1Rad = (angle1[0] * Math.PI) / 180;
  const angle2Rad = Math.asin((n1[0] / n2[0]) * Math.sin(angle1Rad));
  const angle2Deg = isNaN(angle2Rad) ? 0 : (angle2Rad * 180) / Math.PI;

  const criticalAngle = Math.asin(n2[0] / n1[0]);
  const criticalAngleDeg = isNaN(criticalAngle) ? 90 : (criticalAngle * 180) / Math.PI;
  const isTotalReflection = angle1[0] > criticalAngleDeg && n1[0] > n2[0];

  const rayData = Array.from({ length: 90 }, (_, i) => {
    const a = (i + 1);
    const aRad = (a * Math.PI) / 180;
    const a2Rad = Math.asin((n1[0] / n2[0]) * Math.sin(aRad));
    const a2 = isNaN(a2Rad) ? null : (a2Rad * 180) / Math.PI;
    return { angle: a, refracted: a2 };
  }).filter(d => d.refracted !== null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6">Закон преломления света (Закон Снеллиуса)</h3>
          
          <div className="relative bg-gradient-to-b from-sky-200/30 to-blue-400/30 rounded-lg h-[400px] border border-border overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-sky-200/20" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-blue-400/30" />
            
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/50 border-t-2 border-dashed border-white/30" />
            
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--primary))" />
                </marker>
                <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--secondary))" />
                </marker>
              </defs>
              
              <line 
                x1="50%" 
                y1="0" 
                x2="50%" 
                y2="50%" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1" 
                strokeDasharray="5,5"
              />
              
              <line
                x1="50%"
                y1="5%"
                x2={`${50 + Math.sin(angle1Rad) * 35}%`}
                y2="50%"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                markerEnd="url(#arrowhead)"
                opacity="0.9"
              />
              
              {!isTotalReflection ? (
                <line
                  x1={`${50 + Math.sin(angle1Rad) * 35}%`}
                  y1="50%"
                  x2={`${50 + Math.sin(angle2Rad) * 35}%`}
                  y2="95%"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="3"
                  markerEnd="url(#arrowhead2)"
                  opacity="0.9"
                />
              ) : (
                <line
                  x1={`${50 + Math.sin(angle1Rad) * 35}%`}
                  y1="50%"
                  x2={`${50 + Math.sin(angle1Rad) * 35 + Math.sin(angle1Rad) * 35}%`}
                  y2="5%"
                  stroke="hsl(var(--destructive))"
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                  opacity="0.9"
                />
              )}
              
              <circle cx="50%" cy="50%" r="4" fill="white" />
            </svg>

            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur p-3 rounded border border-border">
              <div className="text-xs text-muted-foreground">Среда 1</div>
              <div className="font-mono font-semibold">n₁ = {n1[0].toFixed(2)}</div>
            </div>

            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur p-3 rounded border border-border">
              <div className="text-xs text-muted-foreground">Среда 2</div>
              <div className="font-mono font-semibold">n₂ = {n2[0].toFixed(2)}</div>
            </div>

            <div className="absolute top-4 right-4 bg-card/90 backdrop-blur p-3 rounded border border-border">
              <div className="text-xs text-muted-foreground">Угол падения</div>
              <div className="font-mono font-semibold text-primary">{angle1[0]}°</div>
            </div>

            {!isTotalReflection && (
              <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur p-3 rounded border border-border">
                <div className="text-xs text-muted-foreground">Угол преломления</div>
                <div className="font-mono font-semibold text-secondary">{angle2Deg.toFixed(1)}°</div>
              </div>
            )}

            {isTotalReflection && (
              <div className="absolute bottom-4 right-4 bg-destructive/90 backdrop-blur p-3 rounded border border-destructive">
                <div className="text-xs text-destructive-foreground font-semibold">Полное отражение!</div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">График зависимости угла преломления от угла падения</h3>
          <div className="w-full">
            <svg viewBox="0 0 400 300" className="w-full border border-border rounded bg-card/50">
              <polyline
                points={rayData.map((d, i) => `${10 + (d.angle / 90) * 380},${290 - (d.refracted! / 90) * 270}`).join(' ')}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
              />
              {n1[0] > n2[0] && (
                <line 
                  x1={10 + (criticalAngleDeg / 90) * 380}
                  y1="20"
                  x2={10 + (criticalAngleDeg / 90) * 380}
                  y2="290"
                  stroke="hsl(var(--destructive))"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              )}
              <line x1="10" y1="290" x2="390" y2="290" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
              <line x1="10" y1="20" x2="10" y2="290" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
              <text x="200" y="15" fill="hsl(var(--foreground))" fontSize="14" textAnchor="middle" fontWeight="bold">
                Угол преломления от угла падения
              </text>
              <text x="380" y="310" fill="hsl(var(--muted-foreground))" fontSize="12" textAnchor="end">θ₁</text>
              <text x="5" y="25" fill="hsl(var(--muted-foreground))" fontSize="12">θ₂</text>
            </svg>
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
                <Label className="font-mono">Угол падения (°)</Label>
                <span className="font-mono text-primary">{angle1[0]}</span>
              </div>
              <Slider value={angle1} onValueChange={setAngle1} min={0} max={89} step={1} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label className="font-mono">Показатель n₁</Label>
                <span className="font-mono text-primary">{n1[0].toFixed(2)}</span>
              </div>
              <Slider value={n1} onValueChange={setN1} min={1.0} max={2.5} step={0.1} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label className="font-mono">Показатель n₂</Label>
                <span className="font-mono text-primary">{n2[0].toFixed(2)}</span>
              </div>
              <Slider value={n2} onValueChange={setN2} min={1.0} max={2.5} step={0.1} />
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
              <span className="text-sm text-muted-foreground">Угол преломления</span>
              <span className="font-mono font-semibold text-secondary">
                {isTotalReflection ? '—' : `${angle2Deg.toFixed(2)}°`}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card/50 rounded border border-border">
              <span className="text-sm text-muted-foreground">Критический угол</span>
              <span className="font-mono font-semibold text-primary">
                {n1[0] > n2[0] ? `${criticalAngleDeg.toFixed(2)}°` : '—'}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card/50 rounded border border-border">
              <span className="text-sm text-muted-foreground">Скорость света (среда 1)</span>
              <span className="font-mono font-semibold text-secondary">
                {(300000 / n1[0]).toFixed(0)} км/с
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card/50 rounded border border-border">
              <span className="text-sm text-muted-foreground">Скорость света (среда 2)</span>
              <span className="font-mono font-semibold text-primary">
                {(300000 / n2[0]).toFixed(0)} км/с
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-accent/5">
          <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
            <Icon name="Info" size={16} />
            Формула
          </h4>
          <div className="space-y-2 text-sm font-mono">
            <div>n₁ × sin(θ₁) = n₂ × sin(θ₂)</div>
          </div>
        </Card>

        <Card className="p-4 bg-muted/20">
          <h4 className="font-semibold mb-2 text-sm">Примеры сред:</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Воздух:</span>
              <span className="font-mono">n ≈ 1.00</span>
            </div>
            <div className="flex justify-between">
              <span>Вода:</span>
              <span className="font-mono">n ≈ 1.33</span>
            </div>
            <div className="flex justify-between">
              <span>Стекло:</span>
              <span className="font-mono">n ≈ 1.50</span>
            </div>
            <div className="flex justify-between">
              <span>Алмаз:</span>
              <span className="font-mono">n ≈ 2.42</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
