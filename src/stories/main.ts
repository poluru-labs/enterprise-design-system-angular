import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'eds-root',
  standalone: true,
  template: `<p>Enterprise Design Systems — Storybook host</p>`,
})
class RootComponent {}

bootstrapApplication(RootComponent).catch((err) => console.error(err));
