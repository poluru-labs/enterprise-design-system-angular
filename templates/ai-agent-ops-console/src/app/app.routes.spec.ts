import { routes } from './app.routes';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AgentsPageComponent } from './features/agents/agents-page.component';
import { RunsPageComponent } from './features/runs/runs-page.component';
import { ToolsPageComponent } from './features/tools/tools-page.component';
import { HandoffsPageComponent } from './features/handoffs/handoffs-page.component';
import { AlertsPageComponent } from './features/alerts/alerts-page.component';
import { DeployPageComponent } from './features/deploy/deploy-page.component';
import { SearchPageComponent } from './features/search/search-page.component';
import { SettingsPageComponent } from './features/settings/settings-page.component';

describe('routes', () => {
  it('maps every AgentOps page', () => {
    const paths = routes.map((route) => ({ path: route.path, component: route.component }));
    expect(paths).toEqual(
      expect.arrayContaining([
        { path: '', component: DashboardComponent },
        { path: 'agents', component: AgentsPageComponent },
        { path: 'runs', component: RunsPageComponent },
        { path: 'tools', component: ToolsPageComponent },
        { path: 'handoffs', component: HandoffsPageComponent },
        { path: 'alerts', component: AlertsPageComponent },
        { path: 'deploy', component: DeployPageComponent },
        { path: 'search', component: SearchPageComponent },
        { path: 'settings', component: SettingsPageComponent }
      ])
    );
  });
});
