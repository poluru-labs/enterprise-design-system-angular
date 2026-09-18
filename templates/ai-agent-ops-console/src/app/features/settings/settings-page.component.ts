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
  EdsPinInputComponent,
  EdsSliderComponent,
  EdsSwitchComponent,
  EdsTimePickerComponent
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
    EdsPinInputComponent,
    EdsSliderComponent,
    EdsSwitchComponent,
    EdsTimePickerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <p class="eyebrow">Workspace controls</p>
        <h1>Settings</h1>
        <p class="summary">Set workspace policies, alerts, and access rules for Alex Poluru’s agent operations console.</p>
      </div>
    </section>

    <section class="stack">
      <eds-card class="card-pad setting" [elevated]="false">
        <div>
          <h3>Require approval for external tools</h3>
          <p>Agents must pause before calling unapproved third-party APIs such as web search.</p>
        </div>
        <eds-switch label="Enabled" [checked]="externalApproval()" (checkedChange)="externalApproval.set($event)"></eds-switch>
      </eds-card>

      <eds-card class="card-pad setting" [elevated]="false">
        <div>
          <h3>Auto-pause failed agents</h3>
          <p>Stop an agent after three consecutive failed runs so Maya Subbu can inspect the trace.</p>
        </div>
        <eds-switch label="Enabled" [checked]="autoPause()" (checkedChange)="autoPause.set($event)"></eds-switch>
      </eds-card>

      <eds-card class="card-pad setting" [elevated]="false">
        <div>
          <h3>Handoff notifications</h3>
          <p>Notify reviewers when an agent needs a human decision.</p>
        </div>
        <eds-switch label="Enabled" [checked]="handoffAlerts()" (checkedChange)="handoffAlerts.set($event)"></eds-switch>
      </eds-card>

      <eds-card class="card-pad" [elevated]="false">
        <h3>Reliability</h3>
        <p class="meta">Alert when a tool drops below this success rate.</p>
        <eds-slider
          label="Reliability floor"
          [min]="80"
          [max]="100"
          [step]="1"
          [value]="reliabilityFloor()"
          [showValue]="true"
          (valueChange)="reliabilityFloor.set($event)"
        ></eds-slider>
        <eds-number-input
          label="Failed-run pause after"
          [value]="failCount()"
          [min]="1"
          [max]="10"
          [step]="1"
          (valueChange)="failCount.set($event)"
        ></eds-number-input>
        <eds-checkbox
          label="Share run traces with operators"
          [checked]="shareTraces()"
          (checkedChange)="shareTraces.set($event)"
        ></eds-checkbox>
      </eds-card>

      <eds-card class="card-pad" [elevated]="false">
        <h3>Retention</h3>
        <eds-date-picker
          label="Purge traces after"
          hint="Raw prompts stay until this date"
          [value]="purgeDate()"
          (valueChange)="purgeDate.set($event)"
        ></eds-date-picker>
        <eds-time-picker
          label="Daily operations digest"
          hint="Priya Subbu’s ops email"
          [value]="digestTime()"
          (valueChange)="digestTime.set($event)"
        ></eds-time-picker>
        <eds-code-snippet [code]="samplePolicy" language="json" label="Workspace policy"></eds-code-snippet>
        <eds-divider spacing="md" label="Admin"></eds-divider>
        <eds-pin-input
          label="Confirm destructive actions"
          [length]="4"
          [value]="pin()"
          (valueChange)="pin.set($event)"
        ></eds-pin-input>
        <p class="meta" style="margin-top: 0.75rem">
          <eds-icon name="lock" size="sm" [decorative]="true"></eds-icon>
          PIN is held by Alex Poluru ·
          <eds-link href="https://polurus.com" [external]="true">Workspace docs</eds-link>
        </p>
      </eds-card>
    </section>
  `
})
export class SettingsPageComponent {
  protected readonly externalApproval = signal(true);
  protected readonly autoPause = signal(true);
  protected readonly handoffAlerts = signal(true);
  protected readonly reliabilityFloor = signal(95);
  protected readonly failCount = signal(3);
  protected readonly shareTraces = signal(true);
  protected readonly purgeDate = signal('2026-12-31');
  protected readonly digestTime = signal('07:30');
  protected readonly pin = signal('');

  protected readonly samplePolicy = `{
  "owner": "Alex Poluru",
  "external_tools": "approval",
  "pause_after": 3
}`;
}
