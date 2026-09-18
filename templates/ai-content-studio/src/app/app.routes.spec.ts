import { routes } from './app.routes';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';
import { ProjectsPageComponent } from './features/projects/projects-page.component';
import { LibraryPageComponent } from './features/library/library-page.component';
import { CalendarPageComponent } from './features/calendar/calendar-page.component';
import { ApprovalsPageComponent } from './features/approvals/approvals-page.component';
import { BrandVoicePageComponent } from './features/brand-voice/brand-voice-page.component';
import { SearchPageComponent } from './features/search/search-page.component';
import { SettingsPageComponent } from './features/settings/settings-page.component';

describe('routes', () => {
  it('maps every Content Studio page', () => {
    const paths = routes.map((route) => ({ path: route.path, component: route.component }));
    expect(paths).toEqual(
      expect.arrayContaining([
        { path: '', component: DashboardPageComponent },
        { path: 'projects', component: ProjectsPageComponent },
        { path: 'library', component: LibraryPageComponent },
        { path: 'calendar', component: CalendarPageComponent },
        { path: 'approvals', component: ApprovalsPageComponent },
        { path: 'brand-voice', component: BrandVoicePageComponent },
        { path: 'search', component: SearchPageComponent },
        { path: 'settings', component: SettingsPageComponent }
      ])
    );
  });
});
