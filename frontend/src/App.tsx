import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { WeekView } from './views/WeekView';
import { MonthView } from './views/MonthView';
import { YearView } from './views/YearView';
import { UnitsView } from './views/UnitsView';
import { PlanningBuddy } from './panels/PlanningBuddy';
import { CustomizePanel } from './panels/CustomizePanel';

function AppContent() {
  const { theme, view } = useApp();
  const t = theme;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', background: t.page, fontFamily: t.fBody, color: t.ink }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar />
        <div style={{ flex: 1, overflowY: 'auto', padding: '26px 30px 60px' }}>
          {view === 'week' && <WeekView />}
          {view === 'month' && <MonthView />}
          {view === 'year' && <YearView />}
          {view === 'units' && <UnitsView />}
        </div>
      </main>
      <PlanningBuddy />
      <CustomizePanel />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
