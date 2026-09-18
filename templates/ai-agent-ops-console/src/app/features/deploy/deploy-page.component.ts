import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  EdsButtonComponent,
  EdsCardComponent,
  EdsCheckboxComponent,
  EdsInputComponent,
  EdsSelectComponent,
  EdsStatusComponent,
  EdsStepperComponent,
  EdsTextareaComponent,
  type EdsSelectOption,
  type EdsStepperStep
} from '@poluru-labs/enterprise-design-system-angular';
import { templateConfig } from '../../core/config/template.config';

@Component({
  selector: 'app-deploy-page',
  standalone: true,
  imports: [
    EdsButtonComponent,
    EdsCardComponent,
    EdsCheckboxComponent,
    EdsInputComponent,
    EdsSelectComponent,
    EdsStatusComponent,
    EdsStepperComponent,
    EdsTextareaComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <p class="eyebrow">Release control</p>
        <h1>Deploy agent</h1>
        <p class="summary">Publish a new agent version into the enterprise workspace with the approved tool set. Policy, eval, and tool reviews are required before production.</p>
      </div>
      <eds-button variant="secondary" icon="chevron-left" (clicked)="goAgents()">Back to agents</eds-button>
    </section>

    <eds-card class="card-pad" [elevated]="false">
      <div class="section-head">
        <h2>Release checks</h2>
        <eds-status [label]="submitted() ? 'Ready to monitor' : 'Preflight'" [variant]="submitted() ? 'success' : 'info'" [pulse]="true"></eds-status>
      </div>
      <eds-stepper [steps]="steps" [current]="submitted() ? 4 : 2"></eds-stepper>
    </eds-card>

    <section class="split" style="margin-top: 0.9rem">
      <eds-card class="card-pad" [elevated]="false">
        <eds-input
          label="Agent name"
          placeholder="Collections follow-up"
          icon="user"
          [value]="name()"
          (valueChange)="name.set($event)"
        ></eds-input>
        <div style="margin-top: 0.9rem">
          <eds-select
            label="Owner team"
            placeholder="Choose a team"
            [options]="teamOptions"
            [value]="owner()"
            (valueChange)="owner.set($event)"
          ></eds-select>
        </div>
        <div style="margin-top: 0.9rem">
          <eds-select
            label="Model"
            placeholder="Choose a model"
            [options]="modelOptions"
            [value]="model()"
            (valueChange)="model.set($event)"
          ></eds-select>
        </div>
        <div style="margin-top: 0.9rem">
          <eds-textarea
            label="Release notes"
            placeholder="What this version changes"
            [rows]="4"
            [value]="notes()"
            (valueChange)="notes.set($event)"
          ></eds-textarea>
        </div>
        <div style="margin-top: 1rem">
          <p class="eyebrow">Approved tools</p>
          @for (tool of config.deployTools; track tool) {
            <eds-checkbox
              [label]="tool"
              [checked]="tools().includes(tool)"
              (checkedChange)="toggleTool(tool, $event)"
            ></eds-checkbox>
          }
        </div>
        <div style="margin-top: 1.1rem">
          <eds-button variant="primary" icon="upload" (clicked)="submitted.set(true)">Deploy to production</eds-button>
        </div>
      </eds-card>

      <eds-card class="card-pad" [elevated]="false">
        <p class="eyebrow">Gates</p>
        <h2>{{ submitted() ? 'Queued for health check' : 'Preflight complete' }}</h2>
        <p class="meta">{{ submitted() ? 'This agent will appear in the directory after the next health check.' : 'Policy, eval, and tool reviews are required before a production publish.' }}</p>
        <div class="meter-row">
          <span><span>Policy gate</span><strong>Pass</strong></span>
        </div>
        <div class="meter-row">
          <span><span>Eval suite</span><strong>96.4%</strong></span>
        </div>
        <div class="meter-row">
          <span><span>Tool access</span><strong>{{ tools().length }} selected</strong></span>
        </div>
        <div class="meter-row">
          <span><span>Owner</span><strong>{{ owner() }}</strong></span>
        </div>
        <div class="meter-row">
          <span><span>Model</span><strong>{{ model() }}</strong></span>
        </div>
      </eds-card>
    </section>
  `
})
export class DeployPageComponent {
  private readonly router = inject(Router);
  protected readonly config = templateConfig;
  protected readonly name = signal('Collections follow-up');
  protected readonly owner = signal('Finance');
  protected readonly model = signal(templateConfig.deployModels[0]);
  protected readonly notes = signal('Ship reminder sequences with ERP lookup and Slack notify.');
  protected readonly tools = signal(['ERP lookup', 'Slack notify']);
  protected readonly submitted = signal(false);

  protected readonly steps: EdsStepperStep[] = [
    { label: 'Draft', description: 'Name and model' },
    { label: 'Policy', description: 'Tool access' },
    { label: 'Eval', description: '96.4% suite' },
    { label: 'Canary', description: 'Shadow traffic' },
    { label: 'Live', description: 'Production' }
  ];

  protected readonly teamOptions: EdsSelectOption[] = [
    { label: 'Finance', value: 'Finance' },
    { label: 'People', value: 'People' },
    { label: 'Support', value: 'Support' },
    { label: 'Legal', value: 'Legal' },
    { label: 'Platform', value: 'Platform' }
  ];

  protected readonly modelOptions: EdsSelectOption[] = this.config.deployModels.map((label) => ({
    label,
    value: label
  }));

  protected goAgents(): void {
    void this.router.navigateByUrl('/agents');
  }

  protected toggleTool(tool: string, checked: boolean): void {
    this.tools.update((current) => {
      if (checked) {
        return current.includes(tool) ? current : [...current, tool];
      }
      return current.filter((item) => item !== tool);
    });
  }
}
