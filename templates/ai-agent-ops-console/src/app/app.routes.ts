import { Routes } from '@angular/router';
import { AlertsPageComponent } from './features/alerts/alerts-page.component';
import { AgentsPageComponent } from './features/agents/agents-page.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DeployPageComponent } from './features/deploy/deploy-page.component';
import { HandoffsPageComponent } from './features/handoffs/handoffs-page.component';
import { RunsPageComponent } from './features/runs/runs-page.component';
import { SearchPageComponent } from './features/search/search-page.component';
import { SettingsPageComponent } from './features/settings/settings-page.component';
import { ToolsPageComponent } from './features/tools/tools-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent },
  { path: 'agents', component: AgentsPageComponent },
  { path: 'runs', component: RunsPageComponent },
  { path: 'tools', component: ToolsPageComponent },
  { path: 'handoffs', component: HandoffsPageComponent },
  { path: 'alerts', component: AlertsPageComponent },
  { path: 'deploy', component: DeployPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: '**', redirectTo: '' }
];
