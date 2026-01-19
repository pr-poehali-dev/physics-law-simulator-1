import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const ThermodynamicsSimulator = () => {
  const [pressure, setPressure] = useState([100]);
  const [volume, setVolume] = useState([10]);
  const [temperature, setTemperature] = useState([300]);
  const [processType, setProcessType] = useState<'isothermal' | 'isobaric' | 'isochoric'>('isothermal');

  const R = 8.314;
  const n = (pressure[0] * 1000 * volume[0] / 1000) / (R * temperature[0]);

  const calculatePV = () => {
    return (pressure[0] * volume[0]).toFixed(2);
  };

  const generateProcessData = () => {
    const data = [];
    
    if (processType === 'isothermal') {
      const PV = pressure[0] * volume[0];
      for (let v = 2; v <= 20; v += 0.5) {
        data.push({ v, p: PV / v, t: temperature[0] });
      }
    } else if (processType === 'isobaric') {
      for (let v = 2; v <= 20; v += 0.5) {
        data.push({ v, p: pressure[0], t: (pressure[0] * v * 1000) / (n * R * 1000) });
      }
    } else {
      for (let p = 10; p <= 200; p += 5) {
        data.push({ v: volume[0], p, t: (p * volume[0] * 1000) / (n * R * 1000) });
      }
    }
    
    return data;
  };

  const processData = generateProcessData();

  const moleculeCount = Math.min(Math.floor((pressure[0] / 10) * (temperature[0] / 300)), 50);
  const molecules = Array.from({ length: moleculeCount }, (_, i) => ({
    id: i,
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6">Уравнение состояния идеального газа</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border-4 border-primary/30 overflow-hidden"
                 style={{ height: `${Math.max(200, volume[0] * 15)}px` }}>
              <div className="absolute top-4 left-4 right-4 bg-card/90 backdrop-blur p-2 rounded border border-border flex justify-between items-center">
                <span className="text-xs font-semibold">Поршень</span>
                <span className="font-mono text-xs text-primary">{pressure[0]} кПа</span>
              </div>

              <svg className="w-full h-full absolute inset-0">
                {molecules.map((mol) => (
                  <circle
                    key={mol.id}
                    cx={`${mol.x}%`}
                    cy={`${mol.y}%`}
                    r="3"
                    fill="hsl(var(--secondary))"
                    className="animate-pulse"
                  />
                ))}
              </svg>

              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur p-2 rounded border border-border">
                <div className="text-xs text-muted-foreground">Объём</div>
                <div className="font-mono font-semibold text-primary">{volume[0]} л</div>
              </div>

              <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur p-2 rounded border border-border">
                <div className="text-xs text-muted-foreground">Температура</div>
                <div className="font-mono font-semibold text-secondary">{temperature[0]} K</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-center text-lg font-mono font-bold">
                  PV = nRT
                </p>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Уравнение Менделеева-Клапейрона
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={processType === 'isothermal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setProcessType('isothermal')}
                  className="text-xs"
                >
                  T = const
                </Button>
                <Button
                  variant={processType === 'isobaric' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setProcessType('isobaric')}
                  className="text-xs"
                >
                  P = const
                </Button>
                <Button
                  variant={processType === 'isochoric' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setProcessType('isochoric')}
                  className="text-xs"
                >
                  V = const
                </Button>
              </div>

              <Card className="p-4 bg-card/50">
                <h4 className="font-semibold mb-3 text-sm">Текущий процесс:</h4>
                <div className="space-y-2 text-sm">
                  {processType === 'isothermal' && (
                    <>
                      <div className="font-semibold text-primary">Изотермический</div>
                      <p className="text-muted-foreground">Температура постоянна (T = const)</p>
                      <p className="font-mono text-xs">PV = const</p>
                    </>
                  )}
                  {processType === 'isobaric' && (
                    <>
                      <div className="font-semibold text-primary">Изобарический</div>
                      <p className="text-muted-foreground">Давление постоянно (P = const)</p>
                      <p className="font-mono text-xs">V/T = const</p>
                    </>
                  )}
                  {processType === 'isochoric' && (
                    <>
                      <div className="font-semibold text-primary">Изохорический</div>
                      <p className="text-muted-foreground">Объём постоянен (V = const)</p>
                      <p className="font-mono text-xs">P/T = const</p>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">График процесса (P-V диаграмма)</h3>
          <svg viewBox="0 0 500 350" className="w-full border border-border rounded bg-card/50">
            {processType === 'isothermal' ? (
              <polyline
                points={processData.map((d) => `${20 + (d.v / 20) * 460},${330 - (d.p / 200) * 300}`).join(' ')}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
              />
            ) : processType === 'isobaric' ? (
              <line
                x1="20"
                y1={330 - (pressure[0] / 200) * 300}
                x2="480"
                y2={330 - (pressure[0] / 200) * 300}
                stroke="hsl(var(--secondary))"
                strokeWidth="3"
              />
            ) : (
              <line
                x1={20 + (volume[0] / 20) * 460}
                y1="30"
                x2={20 + (volume[0] / 20) * 460}
                y2="330"
                stroke="hsl(var(--accent))"
                strokeWidth="3"
              />
            )}

            <circle
              cx={20 + (volume[0] / 20) * 460}
              cy={330 - (pressure[0] / 200) * 300}
              r="6"
              fill="hsl(var(--destructive))"
            />

            <line x1="20" y1="330" x2="480" y2="330" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
            <line x1="20" y1="30" x2="20" y2="330" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
            
            <text x="250" y="25" fill="hsl(var(--foreground))" fontSize="16" textAnchor="middle" fontWeight="bold">
              Диаграмма P(V)
            </text>
            <text x="470" y="350" fill="hsl(var(--muted-foreground))" fontSize="14" textAnchor="end">V, л</text>
            <text x="10" y="35" fill="hsl(var(--muted-foreground))" fontSize="14">P, кПа</text>
          </svg>
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
                <Label className="font-mono">Давление (кПа)</Label>
                <span className="font-mono text-primary">{pressure[0]}</span>
              </div>
              <Slider value={pressure} onValueChange={setPressure} min={10} max={200} step={5} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label className="font-mono">Объём (л)</Label>
                <span className="font-mono text-primary">{volume[0]}</span>
              </div>
              <Slider value={volume} onValueChange={setVolume} min={2} max={20} step={1} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label className="font-mono">Температура (K)</Label>
                <span className="font-mono text-primary">{temperature[0]}</span>
              </div>
              <Slider value={temperature} onValueChange={setTemperature} min={100} max={600} step={10} />
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
              <span className="text-sm text-muted-foreground">Количество вещества</span>
              <span className="font-mono font-semibold text-primary">{n.toFixed(3)} моль</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card/50 rounded border border-border">
              <span className="text-sm text-muted-foreground">PV произведение</span>
              <span className="font-mono font-semibold text-secondary">{calculatePV()} кПа·л</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card/50 rounded border border-border">
              <span className="text-sm text-muted-foreground">Температура (°C)</span>
              <span className="font-mono font-semibold text-primary">{(temperature[0] - 273).toFixed(0)} °C</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card/50 rounded border border-border">
              <span className="text-sm text-muted-foreground">Число молекул</span>
              <span className="font-mono font-semibold text-secondary">{(n * 6.022e23).toExponential(2)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-accent/5">
          <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
            <Icon name="Info" size={16} />
            Константы
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>R (газовая постоянная):</span>
              <span className="font-mono">8.314 Дж/(моль·К)</span>
            </div>
            <div className="flex justify-between">
              <span>Nₐ (число Авогадро):</span>
              <span className="font-mono">6.022×10²³ моль⁻¹</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
