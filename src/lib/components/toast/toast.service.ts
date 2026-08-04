import {
  ApplicationRef,
  Component,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  createComponent,
} from '@angular/core';
import { EdsToastComponent, EdsToastVariant } from './toast.component';

export interface ToastShowOptions {
  title: string;
  description?: string;
  variant?: EdsToastVariant;
  duration?: number;
}

interface ToastRecord extends Required<Pick<ToastShowOptions, 'title'>> {
  id: string;
  description?: string;
  variant: EdsToastVariant;
  duration: number;
}

@Component({
  selector: 'eds-toast-host',
  standalone: true,
  imports: [EdsToastComponent],
  template: `
    <div class="host" aria-live="polite">
      @for (toast of toasts; track toast.id) {
        <eds-toast
          [title]="toast.title"
          [description]="toast.description ?? ''"
          [variant]="toast.variant"
          [duration]="toast.duration"
          [open]="true"
          (closed)="dismiss(toast.id)"
          (openChange)="onOpenChange(toast.id, $event)"
        />
      }
    </div>
  `,
  styles: [
    `
      .host {
        position: fixed;
        z-index: 1200;
        inset: auto var(--eds-space-6) var(--eds-space-6) auto;
        display: flex;
        flex-direction: column;
        gap: var(--eds-space-3);
        pointer-events: none;
        max-width: calc(100vw - var(--eds-space-12));
      }
    `,
  ],
})
export class EdsToastHostComponent {
  toasts: ToastRecord[] = [];

  addToast(options: ToastShowOptions): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    this.toasts = [
      ...this.toasts,
      {
        id,
        title: options.title,
        description: options.description,
        variant: options.variant ?? 'info',
        duration: options.duration ?? 5000,
      },
    ];
    return id;
  }

  dismiss(id: string): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }

  onOpenChange(id: string, open: boolean): void {
    if (!open) {
      this.dismiss(id);
    }
  }
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private hostRef: ComponentRef<EdsToastHostComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
  ) {}

  show(options: ToastShowOptions): string {
    const host = this.ensureHost();
    const id = host.addToast(options);
    this.hostRef?.changeDetectorRef.detectChanges();
    return id;
  }

  private ensureHost(): EdsToastHostComponent {
    if (!this.hostRef) {
      this.hostRef = createComponent(EdsToastHostComponent, {
        environmentInjector: this.injector,
      });
      document.body.appendChild(this.hostRef.location.nativeElement);
      this.appRef.attachView(this.hostRef.hostView);
    }
    return this.hostRef.instance;
  }
}
