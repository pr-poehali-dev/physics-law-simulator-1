import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { MechanicsSimulator } from '@/components/simulators/MechanicsSimulator';
import { ElectricitySimulator } from '@/components/simulators/ElectricitySimulator';
import { OpticsSimulator } from '@/components/simulators/OpticsSimulator';
import { ThermodynamicsSimulator } from '@/components/simulators/ThermodynamicsSimulator';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Icon name="Atom" className="text-primary" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">PhysicsLab</h1>
                <p className="text-xs text-muted-foreground">Интерактивный симулятор физических законов</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Icon name="BookOpen" size={18} className="mr-2" />
                Справка
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Icon name="Home" size={18} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="mechanics" className="flex items-center gap-2">
              <Icon name="Move" size={18} />
              Механика
            </TabsTrigger>
            <TabsTrigger value="electricity" className="flex items-center gap-2">
              <Icon name="Zap" size={18} />
              Электричество
            </TabsTrigger>
            <TabsTrigger value="optics" className="flex items-center gap-2">
              <Icon name="Lightbulb" size={18} />
              Оптика
            </TabsTrigger>
            <TabsTrigger value="thermodynamics" className="flex items-center gap-2">
              <Icon name="Thermometer" size={18} />
              Термодинамика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                  <h2 className="text-4xl font-bold">Добро пожаловать в PhysicsLab</h2>
                  <p className="text-lg text-muted-foreground">
                    Исследуйте фундаментальные законы физики через интерактивные 3D визуализации и динамические графики.
                    Изменяйте параметры в реальном времени и наблюдайте за изменением физических процессов.
                  </p>
                  <div className="flex gap-4">
                    <Button onClick={() => setActiveTab('mechanics')} size="lg">
                      <Icon name="Play" size={18} className="mr-2" />
                      Начать исследование
                    </Button>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: 'Move', title: 'Механика', desc: 'Законы движения' },
                      { icon: 'Zap', title: 'Электричество', desc: 'Закон Ома' },
                      { icon: 'Lightbulb', title: 'Оптика', desc: 'Преломление света' },
                      { icon: 'Thermometer', title: 'Термодинамика', desc: 'Газовые законы' },
                    ].map((item, i) => (
                      <Card key={i} className="p-4 bg-card/80 hover:bg-card transition-colors cursor-pointer">
                        <Icon name={item.icon as any} className="text-primary mb-2" size={24} />
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <Icon name="Cpu" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">3D Визуализация</h3>
                <p className="text-muted-foreground">
                  Наблюдайте за физическими процессами в интерактивном трехмерном пространстве
                </p>
              </Card>
              <Card className="p-6">
                <Icon name="LineChart" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">Динамические графики</h3>
                <p className="text-muted-foreground">
                  Анализируйте зависимости величин в реальном времени на интерактивных графиках
                </p>
              </Card>
              <Card className="p-6">
                <Icon name="Settings" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">Гибкие настройки</h3>
                <p className="text-muted-foreground">
                  Изменяйте параметры симуляции и мгновенно видите результаты изменений
                </p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mechanics">
            <MechanicsSimulator />
          </TabsContent>

          <TabsContent value="electricity">
            <ElectricitySimulator />
          </TabsContent>

          <TabsContent value="optics">
            <OpticsSimulator />
          </TabsContent>

          <TabsContent value="thermodynamics">
            <ThermodynamicsSimulator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
