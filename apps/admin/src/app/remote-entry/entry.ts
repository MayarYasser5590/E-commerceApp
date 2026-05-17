import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-entry',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admin-layout">
      <aside class="admin-sidebar" aria-label="Admin navigation">
        <a class="admin-brand" href="." aria-label="Rose admin dashboard">
          <span class="admin-brand__mark" aria-hidden="true">R</span>
          <span>
            <strong>Rose</strong>
            <small>Admin</small>
          </span>
        </a>

        <nav class="admin-nav" aria-label="Primary">
          @for (item of navItems; track item.label) {
            <a
              class="admin-nav__item"
              href="."
              [class.admin-nav__item--active]="item.active"
              [attr.aria-current]="item.active ? 'page' : null"
            >
              <span class="admin-nav__icon" aria-hidden="true">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </a>
          }
        </nav>

        <div class="admin-profile">
          <span class="admin-profile__avatar" aria-hidden="true">A</span>
          <span>
            <strong>Admin</strong>
            <small>Operations</small>
          </span>
        </div>
      </aside>

      <main class="admin-main">
        <header class="admin-header">
          <div>
            <p class="admin-eyebrow">Remote workspace</p>
            <h1>Admin Dashboard</h1>
          </div>

          <div class="admin-actions" aria-label="Dashboard actions">
            <label class="admin-search">
              <span class="sr-only">Search dashboard</span>
              <input type="search" placeholder="Search" />
            </label>
            <button type="button">Export</button>
          </div>
        </header>

        <section class="admin-content" aria-label="Admin dashboard overview">
          <div class="admin-panel admin-panel--summary">
            <p class="admin-eyebrow">Today</p>
            <h2>Orders Overview</h2>
            <div class="admin-metrics">
              @for (metric of metrics; track metric.label) {
                <article class="admin-metric">
                  <span>{{ metric.label }}</span>
                  <strong>{{ metric.value }}</strong>
                  <small>{{ metric.delta }}</small>
                </article>
              }
            </div>
          </div>

          <div class="admin-panel">
            <p class="admin-eyebrow">Runtime source</p>
            <h2>Admin remote feature</h2>
            <p>
              This layout is rendered by the admin remote and loaded by the shop
              host at runtime.
            </p>
          </div>

          <router-outlet></router-outlet>
        </section>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        color: #1f2933;
        background: #f7f4f2;
        font-family:
          Inter,
          ui-sans-serif,
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          sans-serif;
      }

      .admin-layout {
        display: grid;
        grid-template-columns: 17.5rem minmax(0, 1fr);
        min-height: 100vh;
      }

      .admin-sidebar {
        position: sticky;
        top: 0;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        height: 100vh;
        padding: 1.5rem;
        background: #ffffff;
        border-right: 1px solid #eadfd9;
      }

      .admin-brand,
      .admin-profile,
      .admin-nav__item {
        display: flex;
        align-items: center;
      }

      .admin-brand {
        gap: 0.75rem;
        color: inherit;
        text-decoration: none;
      }

      .admin-brand__mark,
      .admin-profile__avatar,
      .admin-nav__icon {
        display: grid;
        place-items: center;
        flex: 0 0 auto;
      }

      .admin-brand__mark {
        width: 2.75rem;
        height: 2.75rem;
        color: #ffffff;
        background: #a6255f;
        border-radius: 0.875rem;
        font-weight: 800;
      }

      .admin-brand strong,
      .admin-profile strong {
        display: block;
        font-size: 0.95rem;
      }

      .admin-brand small,
      .admin-profile small,
      .admin-metric small {
        display: block;
        color: #7b6f68;
        font-size: 0.78rem;
      }

      .admin-nav {
        display: grid;
        gap: 0.35rem;
      }

      .admin-nav__item {
        gap: 0.75rem;
        min-height: 2.75rem;
        padding: 0 0.85rem;
        color: #62554f;
        border-radius: 0.75rem;
        text-decoration: none;
        font-size: 0.92rem;
        font-weight: 600;
      }

      .admin-nav__item:hover,
      .admin-nav__item--active {
        color: #a6255f;
        background: #f8e9f0;
      }

      .admin-nav__icon {
        width: 1.5rem;
        height: 1.5rem;
      }

      .admin-profile {
        gap: 0.75rem;
        margin-top: auto;
        padding-top: 1rem;
        border-top: 1px solid #eadfd9;
      }

      .admin-profile__avatar {
        width: 2.25rem;
        height: 2.25rem;
        color: #a6255f;
        background: #f8e9f0;
        border-radius: 50%;
        font-weight: 800;
      }

      .admin-main {
        min-width: 0;
        padding: 1.5rem;
      }

      .admin-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .admin-eyebrow {
        margin: 0 0 0.35rem;
        color: #a6255f;
        font-size: 0.75rem;
        font-weight: 800;
        letter-spacing: 0;
        text-transform: uppercase;
      }

      h1,
      h2,
      p {
        margin-top: 0;
      }

      h1 {
        margin: 0;
        color: #231f20;
        font-size: 1.85rem;
        line-height: 1.2;
      }

      h2 {
        margin-bottom: 1rem;
        color: #231f20;
        font-size: 1.15rem;
        line-height: 1.35;
      }

      .admin-actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .admin-search input {
        width: min(16rem, 35vw);
        height: 2.5rem;
        padding: 0 0.9rem;
        color: #231f20;
        background: #ffffff;
        border: 1px solid #eadfd9;
        border-radius: 0.75rem;
      }

      button {
        height: 2.5rem;
        padding: 0 1rem;
        color: #ffffff;
        background: #a6255f;
        border: 0;
        border-radius: 0.75rem;
        font-weight: 700;
        cursor: pointer;
      }

      button:hover {
        background: #8f1f51;
      }

      .admin-content {
        display: grid;
        grid-template-columns: minmax(0, 1.45fr) minmax(20rem, 0.85fr);
        gap: 1rem;
      }

      .admin-panel {
        min-width: 0;
        padding: 1.25rem;
        background: #ffffff;
        border: 1px solid #eadfd9;
        border-radius: 1rem;
        box-shadow: 0 1rem 2.5rem rgb(54 38 28 / 0.07);
      }

      .admin-panel--summary {
        grid-column: span 2;
      }

      .admin-metrics {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.75rem;
      }

      .admin-metric {
        display: grid;
        gap: 0.35rem;
        padding: 1rem;
        background: #fbf7f5;
        border: 1px solid #f0e6e1;
        border-radius: 0.85rem;
      }

      .admin-metric span {
        color: #62554f;
        font-size: 0.82rem;
        font-weight: 700;
      }

      .admin-metric strong {
        color: #231f20;
        font-size: 1.5rem;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        overflow: hidden;
        white-space: nowrap;
        border: 0;
        clip: rect(0, 0, 0, 0);
      }

      @media (max-width: 900px) {
        .admin-layout {
          grid-template-columns: 1fr;
        }

        .admin-sidebar {
          position: static;
          height: auto;
          gap: 1rem;
        }

        .admin-nav {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .admin-profile {
          display: none;
        }

        .admin-header,
        .admin-actions {
          align-items: stretch;
          flex-direction: column;
        }

        .admin-search input {
          width: 100%;
        }

        .admin-content,
        .admin-metrics {
          grid-template-columns: 1fr;
        }

        .admin-panel--summary {
          grid-column: auto;
        }
      }
    `,
  ],
})
export class RemoteEntry {
  protected readonly navItems = [
    { label: 'Dashboard', icon: 'D', active: true },
    { label: 'Orders', icon: 'O', active: false },
    { label: 'Products', icon: 'P', active: false },
    { label: 'Customers', icon: 'C', active: false },
    { label: 'Reports', icon: 'R', active: false },
  ];

  protected readonly metrics = [
    { label: 'Orders', value: '128', delta: '+12.5%' },
    { label: 'Revenue', value: '$8.4k', delta: '+8.2%' },
    { label: 'Products', value: '436', delta: '+18 new' },
  ];
}
