import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  EdsCardComponent,
  EdsCheckboxComponent,
  EdsCodeSnippetComponent,
  EdsDatePickerComponent,
  EdsDividerComponent,
  EdsIconComponent,
  EdsLinkComponent,
  EdsNumberInputComponent,
  EdsSliderComponent,
  EdsSwitchComponent
} from '@poluru-labs/enterprise-design-system-angular';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    EdsCardComponent,
    EdsCheckboxComponent,
    EdsCodeSnippetComponent,
    EdsDatePickerComponent,
    EdsDividerComponent,
    EdsIconComponent,
    EdsLinkComponent,
    EdsNumberInputComponent,
    EdsSliderComponent,
    EdsSwitchComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <p class="eyebrow">Workspace controls</p>
        <h1>Settings</h1>
        <p class="summary">Set draft suggestions, approval reminders, and brand-rule strictness for Alex Poluru’s content workspace.</p>
      </div>
    </section>

    <section class="stack">
      <eds-card class="card-pad setting" [elevated]="false">
        <div>
          <h3>AI Suggestions</h3>
          <p>Show composition suggestions while editing briefs and drafts.</p>
        </div>
        <eds-switch label="Enabled" [checked]="aiSuggestions()" (checkedChange)="aiSuggestions.set($event)"></eds-switch>
      </eds-card>

      <eds-card class="card-pad setting" [elevated]="false">
        <div>
          <h3>Approval Notifications</h3>
          <p>Send reminders to reviewers when deadlines are within 24 hours.</p>
        </div>
        <eds-switch label="Enabled" [checked]="approvalNotifications()" (checkedChange)="approvalNotifications.set($event)"></eds-switch>
      </eds-card>

      <eds-card class="card-pad setting" [elevated]="false">
        <div>
          <h3>Brand Rule Strictness</h3>
          <p>Require all guardrails to pass before publication status is available.</p>
        </div>
        <eds-switch label="Enabled" [checked]="brandStrictness()" (checkedChange)="brandStrictness.set($event)"></eds-switch>
      </eds-card>

      <eds-card class="card-pad" [elevated]="false">
        <h3>Guardrail floor</h3>
        <p class="meta">Block publish when brand-match drops below this score.</p>
        <eds-slider
          label="Brand-match floor"
          [min]="80"
          [max]="100"
          [step]="1"
          [value]="brandFloor()"
          [showValue]="true"
          (valueChange)="brandFloor.set($event)"
        ></eds-slider>
        <eds-number-input
          label="Reminder hours before due"
          [value]="reminderHours()"
          [min]="1"
          [max]="72"
          [step]="1"
          (valueChange)="reminderHours.set($event)"
        ></eds-number-input>
        <eds-checkbox
          label="Share draft history with reviewers"
          [checked]="shareHistory()"
          (checkedChange)="shareHistory.set($event)"
        ></eds-checkbox>
      </eds-card>

      <eds-card class="card-pad" [elevated]="false">
        <h3>Retention</h3>
        <eds-date-picker
          label="Archive drafts after"
          hint="Rejected drafts stay until this date"
          [value]="archiveDate()"
          (valueChange)="archiveDate.set($event)"
        ></eds-date-picker>
        <eds-code-snippet [code]="samplePolicy" language="json" label="Workspace policy"></eds-code-snippet>
        <eds-divider spacing="md" label="Admin"></eds-divider>
        <p class="meta admin-note">
          <eds-icon name="lock" size="sm" [decorative]="true"></eds-icon>
          Editorial lead is Alex Poluru ·
          <eds-link href="https://polurus.com" [external]="true">Workspace docs</eds-link>
        </p>
      </eds-card>
    </section>
  `
})
export class SettingsPageComponent {
  protected readonly aiSuggestions = signal(true);
  protected readonly approvalNotifications = signal(true);
  protected readonly brandStrictness = signal(false);
  protected readonly brandFloor = signal(90);
  protected readonly reminderHours = signal(24);
  protected readonly shareHistory = signal(true);
  protected readonly archiveDate = signal('2026-12-31');

  protected readonly samplePolicy = `{
  "owner": "Alex Poluru",
  "brand_strictness": false,
  "brand_floor": 90,
  "reminder_hours": 24
}`;
}
