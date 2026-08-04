#!/usr/bin/env node
/**
 * One-off generator for batch component scaffolding.
 * Run: node scripts/generate-components.mjs
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/lib/components');

function write(rel, content) {
  const path = join(ROOT, rel);
  mkdirSync(dirname(path), { recursive: true });
  if (existsSync(path)) return;
  writeFileSync(path, content);
  console.log('created', rel);
}

function index(name) {
  return `export * from './${name}.component';\n`;
}

function spec(className, selector, extra = '') {
  return `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${className} } from './${selector.replace('eds-', '')}.component';

describe('${className}', () => {
  let fixture: ComponentFixture<${className}>;
  let component: ${className};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [${className}],
    }).compileComponents();

    fixture = TestBed.createComponent(${className});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('${selector}')).toBeTruthy();
  });

  it('should render root element', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.firstElementChild).toBeTruthy();
  });
${extra}
});
`;
}

function stories(title, className, selector, template, args = '') {
  return `import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ${className} } from './${selector.replace('eds-', '')}.component';

const meta: Meta<${className}> = {
  title: 'Components/${title}',
  component: ${className},
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [${className}] })],
  ${args}
  render: (args) => ({
    props: args,
    template: \`${template}\`,
  }),
};

export default meta;
type Story = StoryObj<${className}>;

export const Default: Story = {};
`;
}

console.log('Generator placeholder — components written directly.');
