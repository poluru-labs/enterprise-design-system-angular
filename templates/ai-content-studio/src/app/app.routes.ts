import { Routes } from '@angular/router';
import { ApprovalsPageComponent } from './features/approvals/approvals-page.component';
import { BrandVoicePageComponent } from './features/brand-voice/brand-voice-page.component';
import { CalendarPageComponent } from './features/calendar/calendar-page.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';
import { LibraryPageComponent } from './features/library/library-page.component';
import { ProjectsPageComponent } from './features/projects/projects-page.component';
import { SearchPageComponent } from './features/search/search-page.component';
import { SettingsPageComponent } from './features/settings/settings-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardPageComponent },
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'library', component: LibraryPageComponent },
  { path: 'calendar', component: CalendarPageComponent },
  { path: 'approvals', component: ApprovalsPageComponent },
  { path: 'brand-voice', component: BrandVoicePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: '**', redirectTo: '' }
];
