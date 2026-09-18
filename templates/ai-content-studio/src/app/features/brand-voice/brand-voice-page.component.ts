import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  EdsCardComponent,
  EdsStatusComponent,
  EdsTagComponent
} from '@poluru-labs/enterprise-design-system-angular';
import { templateConfig } from '../../core/config/template.config';

@Component({
  selector: 'app-brand-voice-page',
  standalone: true,
  imports: [EdsCardComponent, EdsStatusComponent, EdsTagComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <p class="eyebrow">Guardrails</p>
        <h1>Brand voice</h1>
        <p class="summary">Naming, claims, and tone rules that every assisted draft must pass before it can be scheduled.</p>
      </div>
    </section>

    <section class="grid-3">
      @for (rule of config.brandRules; track rule.title) {
        <eds-card class="card-pad" [elevated]="false">
          <h3>{{ rule.title }}</h3>
          <p class="meta">{{ rule.detail }}</p>
          <div class="chips">
            <eds-tag [label]="rule.priority" variant="brand"></eds-tag>
            <eds-status [label]="rule.status" [variant]="statusVariant(rule.status)"></eds-status>
          </div>
        </eds-card>
      }
    </section>

    <section class="split">
      <eds-card class="card-pad" [elevated]="false">
        <h2>Restricted claims</h2>
        @for (claim of config.restrictedClaims; track claim.term) {
          <div class="job-row">
            <strong>{{ claim.term }}</strong>
            <p class="meta">{{ claim.reason }} · {{ claim.owner }}</p>
          </div>
        }
      </eds-card>
      <aside class="tone">
        Default tone profile: {{ config.toneProfile }}
      </aside>
    </section>
  `
})
export class BrandVoicePageComponent {
  protected readonly config = templateConfig;

  protected statusVariant(status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
    if (status === 'Healthy') {
      return 'success';
    }
    if (status === 'Guarded') {
      return 'info';
    }
    return 'neutral';
  }
}
