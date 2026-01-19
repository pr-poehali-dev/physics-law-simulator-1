import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export const ElectricitySimulator = () => {
  const [voltage, setVoltage] = useState([12]);
  const [resistance, setResistance] = useState([6]);

  const current = voltage[0] / resistance[0];
  const power = voltage[0] * current;

  const maxCurrent = 20;
  const currentPercent = Math.min((current / maxCurrent) * 100, 100);

  const voltageData = Array.from({ length: 50 }, (_, i) => {
    const r = (i / 50) * 20 + 0.5;
    return { r, i: voltage[0] / r };
  });

  const powerData = Array.from({ length: 50 }, (_, i) => {
    const r = (i / 50) * 20 + 0.5;
    const curr = voltage[0] / r;
    return { r, p: voltage[0] * curr };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6">Закон Ома для участка цепи</h3>
          
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 border border-primary/20 mb-6">
            <div className="flex items-center justify-center gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center bg-card">
                    <div className="text-center">
                      <div className="text-2xl font-bold font-mono text-primary">{voltage[0]}</div>
                      <div className="text-xs text-muted-foreground">В</div>
                    </div>
                  </div>
                  <Icon name="Zap" className="absolute -top-2 -right-2 text-primary" size={24} />
                </div>
                <span className="text-sm font-semibold">Напряжение</span>
              </div>

              <div className="flex flex-col gap-2">
                <Icon name="ArrowRight" size={32} className="text-muted-foreground" />
                <div className="relative w-32 h-2 bg-secondary/20 rounded-full overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full bg-secondary transition-all duration-300"
                    style={{ width: `${currentPercent}%` }}
                  />
                </div>
                <div className="text-center">
                  <div className="font-mono font-bold text-secondary">{current.toFixed(2)} А</div>
                  <div className="text-xs text-muted-foreground">Ток</div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-32 border-4 border-primary rounded-lg flex items-center justify-center bg-card relative">
                  <div className="absolute inset-2 border-2 border-primary/50 rounded" />
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-primary">{resistance[0]}</div>
                    <div className="text-xs text-muted-foreground">Ом</div>
                  </div>
                </div>
                <span className="text-sm font-semibold">Сопротивление</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-center text-lg font-mono">
              <span className="text-primary font-bold">I</span> = 
              <span className="text-primary font-bold"> U</span> / 
              <span className="text-primary font-bold"> R</span>
              <span className="mx-4">→</span>
              <span className="text-secondary font-bold">{current.toFixed(2)}</span> = 
              <span className="text-primary font-bold"> {voltage[0]}</span> / 
              <span className="text-primary font-bold"> {resistance[0]}</span>
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Графики зависимостей</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-3 font-mono">Ток от сопротивления (U = const)</p>
              <svg viewBox="0 0 300 200" className="w-full border border-border rounded bg-card/50">
                <polyline
                  points={voltageData.map((d, i) => `${(i / 50) * 280 + 10},${190 - d.i * 8}`).join(' ')}
                  fill="none"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="3"
                />
                <line x1="10" y1="190" x2="290" y2="190" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
                <line x1="10" y1="10" x2="10" y2="190" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
                <text x="150" y="15" fill="hsl(var(--foreground))" fontSize="12" textAnchor="middle">I(R)</text>
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-3 font-mono">Мощность от сопротивления</p>
              <svg viewBox="0 0 300 200" className="w-full border border-border rounded bg-card/50">
                <polyline
                  points={powerData.map((d, i) => `${(i / 50) * 280 + 10},${190 - d.p * 2}`).join(' ')}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                />
                <line x1="10" y1="190" x2="290" y2="190" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
                <line x1="10" y1="10" x2="10" y2="190" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
                <text x="150" y="15" fill="hsl(var(--foreground))" fontSize="12" textAnchor="middle">P(R)</text>
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
                <Label className="font-mono">Напряжение (В)</Label>
                <span className="font-mono text-primary">{voltage[0]}</span>
              </div>
              <Slider value={voltage} onValueChange={setVoltage} min={1} max={24} step={0.5} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label className="font-mono">Сопротивление (Ом)</Label>
                <span className="font-mono text-primary">{resistance[0]}</span>
              </div>
              <Slider value={resistance} onValueChange={setResistance} min={0.5} max={20} step={0.5} />
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
              <span className="text-sm text-muted-foreground">Сила тока</span>
              <span className="font-mono font-semibold text-secondary">{current.toFixed(2)} А</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card/50 rounded border border-border">
              <span className="text-sm text-muted-foreground">Мощность</span>
              <span className="font-mono font-semibold text-primary">{power.toFixed(2)} Вт</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card/50 rounded border border-border">
              <span className="text-sm text-muted-foreground">Энергия за 1 час</span>
              <span className="font-mono font-semibold text-secondary">{(power * 3600).toFixed(0)} Дж</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card/50 rounded border border-border">
              <span className="text-sm text-muted-foreground">Тепловыделение</span>
              <span className="font-mono font-semibold text-primary">{power.toFixed(2)} Вт</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-accent/5">
          <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
            <Icon name="Info" size={16} />
            Формулы
          </h4>
          <div className="space-y-2 text-sm font-mono">
            <div>I = U / R</div>
            <div>P = U × I</div>
            <div>Q = I² × R × t</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
