import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import type {
  ChartData,
  ChartOptions,
  ScriptableContext,
} from 'chart.js';
import {
  CircleDollarSign,
  ClipboardList,
  LucideAngularModule,
  Package,
  ShoppingBag,
} from 'lucide-angular';
import { ChartModule } from 'primeng/chart';

type RevenueRange = 'Monthly' | 'Last Week';

interface OverviewMetricCard {
  title: string;
  value: string;
  icon: typeof Package;
  tone: 'rose' | 'blue' | 'violet' | 'mint';
}

interface CategoryRow {
  name: string;
  products: number;
}

interface OrderStatusRow {
  label: string;
  value: number;
  share: number;
  color: string;
}

interface ProductRow {
  name: string;
  price: string;
  sales: string;
  highlighted?: boolean;
}

interface LowStockRow {
  name: string;
  count: number;
  critical?: boolean;
}

const OVERVIEW_METRICS: OverviewMetricCard[] = [
  {
    title: 'Total products',
    value: '12',
    icon: Package,
    tone: 'rose',
  },
  {
    title: 'Total orders',
    value: '1,284',
    icon: ShoppingBag,
    tone: 'blue',
  },
  {
    title: 'Total categories',
    value: '125',
    icon: ClipboardList,
    tone: 'violet',
  },
  {
    title: 'Total revenue',
    value: '6,824,528 EGP',
    icon: CircleDollarSign,
    tone: 'mint',
  },
];

const CATEGORY_ROWS: CategoryRow[] = [
  { name: 'Chocolate', products: 4 },
  { name: 'Flowers', products: 8 },
  { name: 'Chocolate', products: 4 },
  { name: 'Chocolate', products: 4 },
  { name: 'Chocolate', products: 4 },
  { name: 'Chocolate', products: 4 },
  { name: 'Flowers', products: 8 },
];

const ORDER_STATUS_ROWS: OrderStatusRow[] = [
  { label: 'Completed', value: 216, share: 33, color: '#10b981' },
  { label: 'In progress', value: 513, share: 57, color: '#3479eb' },
  { label: 'Canceled', value: 19, share: 10, color: '#dc2626' },
];

const TOP_SELLING_ROWS: ProductRow[] = [
  { name: '25 Red Roses | Black Wrap', price: '(1,999 EGP)', sales: '5011 Sales', highlighted: true },
  { name: 'Wedding Flower', price: '(440 EGP)', sales: '1464 Sales' },
  { name: 'Moko Chocolate Set | Esper...', price: '(1,200 EGP)', sales: '1042 Sales', highlighted: true },
  { name: 'Red Wedding Flower', price: '(250 EGP)', sales: '613 Sales' },
  { name: 'Patchi Chocolate 500g | Lil...', price: '(1,900 EGP)', sales: '194 Sales' },
  { name: 'Patchi Chocolate 500g | Lil...', price: '(1,900 EGP)', sales: '194 Sales' },
  { name: 'Patchi Chocolate 500g | Lil...', price: '(1,900 EGP)', sales: '194 Sales' },
  { name: 'Patchi Chocolate 500g | Lil...', price: '(1,900 EGP)', sales: '194 Sales' },
  { name: 'Patchi Chocolate 500g | Lil...', price: '(1,900 EGP)', sales: '194 Sales' },
];

const LOW_STOCK_ROWS: LowStockRow[] = [
  { name: '25 Red Roses | Black Wrap', count: 0, critical: true },
  { name: '25 Red Roses | Black Wrap', count: 0, critical: true },
  { name: '25 Red Roses | Black Wrap', count: 2, critical: true },
  { name: '25 Red Roses | Black Wrap', count: 4, critical: true },
  { name: '25 Red Roses | Black Wrap', count: 10 },
  { name: '25 Red Roses | Black Wrap', count: 12 },
  { name: '25 Red Roses | Black Wrap', count: 19 },
  { name: '25 Red Roses | Black Wrap', count: 19 },
  { name: '25 Red Roses | Black Wrap', count: 19 },
];

const MONTHLY_REVENUE_VALUES = [4300, 3850, 3400, 4300, 3200, 4500, 3500, 3250, 4300, 3400];
const WEEKLY_REVENUE_VALUES = [3200, 3550, 3380, 4020, 3760, 4150, 3900];

function createRevenueChartData(range: RevenueRange): ChartData<'line'> {
  const labels =
    range === 'Monthly'
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
      : ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const values =
    range === 'Monthly' ? MONTHLY_REVENUE_VALUES : WEEKLY_REVENUE_VALUES;
  const activeIndex = range === 'Monthly' ? 5 : 4;

  return {
    labels,
    datasets: [
      {
        data: values,
        borderColor: '#c53a3a',
        borderWidth: 1.5,
        fill: true,
        tension: 0.42,
        pointRadius: values.map((_, index) => (index === activeIndex ? 7 : 0)),
        pointHoverRadius: values.map((_, index) =>
          index === activeIndex ? 7 : 0,
        ),
        pointBackgroundColor: values.map((_, index) =>
          index === activeIndex ? '#c53a3a' : 'transparent',
        ),
        pointBorderColor: values.map((_, index) =>
          index === activeIndex ? '#ffffff' : 'transparent',
        ),
        pointBorderWidth: values.map((_, index) => (index === activeIndex ? 3 : 0)),
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const { chart } = context;
          const { chartArea, ctx } = chart;

          if (!chartArea) {
            return 'rgba(197, 58, 58, 0.12)';
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );

          gradient.addColorStop(0, 'rgba(197, 58, 58, 0.34)');
          gradient.addColorStop(1, 'rgba(197, 58, 58, 0)');

          return gradient;
        },
      },
    ],
  };
}

const REVENUE_CHART_OPTIONS: ChartOptions<'line'> = {
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      displayColors: false,
      backgroundColor: '#2f3138',
      padding: 12,
      callbacks: {
        label: (context) => `${context.parsed.y} EGP`,
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  scales: {
    x: {
      border: { display: false },
      grid: {
        color: '#dddbe4',
        drawTicks: false,
      },
      ticks: {
        color: '#2f3138',
        font: {
          family: 'inherit',
          size: 12,
          weight: 600,
        },
      },
    },
    y: {
      min: 0,
      max: 5000,
      ticks: {
        stepSize: 1000,
        color: '#2f3138',
        font: {
          family: 'inherit',
          size: 12,
          weight: 600,
        },
      },
      border: { display: false },
      grid: {
        display: false,
        drawTicks: false,
      },
    },
  },
};

const ORDER_STATUS_CHART_DATA: ChartData<'doughnut'> = {
  labels: ORDER_STATUS_ROWS.map((item) => item.label),
  datasets: [
    {
      data: ORDER_STATUS_ROWS.map((item) => item.share),
      backgroundColor: ORDER_STATUS_ROWS.map((item) => item.color),
      borderWidth: 0,
      hoverOffset: 0,
      spacing: 0,
    },
  ],
};

const ORDER_STATUS_CHART_OPTIONS: ChartOptions<'doughnut'> = {
  maintainAspectRatio: false,
  cutout: '53%',
  rotation: -60,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#2f3138',
      padding: 12,
      callbacks: {
        label: (context) => `${context.label}: ${context.parsed}%`,
      },
    },
  },
};

@Component({
  selector: 'lib-admin-feature-dashboard',
  imports: [CommonModule, ChartModule, LucideAngularModule],
  templateUrl: './admin-feature-dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class AdminFeatureDashboard {
  protected readonly panelCardClass =
    'rounded-[1.55rem] bg-white shadow-[0_0_0_1px_rgba(235,232,226,0.72)]';
  protected readonly sectionHeadingClass =
    'm-0 text-[clamp(1.85rem,1.6vw,2.1rem)] font-extrabold leading-[1.1] text-[#2f3138]';
  protected readonly metricToneClasses: Record<OverviewMetricCard['tone'], string> =
    {
      rose: 'bg-[#f6e2e3] text-[#b4292e]',
      blue: 'bg-[#e9f0fb] text-[#2d6ff5]',
      violet: 'bg-[#efebfb] text-[#7a46db]',
      mint: 'bg-[#edf7f4] text-[#029669]',
    };
  protected readonly orderBadgeClasses: Record<OrderStatusRow['label'], string> = {
    Completed:
      'left-[2.4rem] top-[0.95rem]',
    'In progress':
      'bottom-[1.2rem] left-[3rem]',
    Canceled:
      'right-[2rem] top-[1.55rem]',
  };

  protected readonly metrics = OVERVIEW_METRICS;
  protected readonly categories = CATEGORY_ROWS;
  protected readonly orderStatuses = ORDER_STATUS_ROWS;
  protected readonly topSellingProducts = TOP_SELLING_ROWS;
  protected readonly lowStockProducts = LOW_STOCK_ROWS;
  protected readonly revenueRanges: RevenueRange[] = ['Monthly', 'Last Week'];
  protected readonly selectedRevenueRange = signal<RevenueRange>('Monthly');
  protected readonly revenueChartOptions = REVENUE_CHART_OPTIONS;
  protected readonly orderStatusChartData = ORDER_STATUS_CHART_DATA;
  protected readonly orderStatusChartOptions = ORDER_STATUS_CHART_OPTIONS;
  protected readonly revenueChartData = computed(() =>
    createRevenueChartData(this.selectedRevenueRange()),
  );

  protected metricCardClass(tone: OverviewMetricCard['tone']): string {
    return `min-h-[8.05rem] rounded-[1.15rem] px-[1.35rem] py-[1.25rem] ${
      this.metricToneClasses[tone]
    }`;
  }

  protected orderBadgeClass(label: OrderStatusRow['label']): string {
    return `absolute inline-flex h-[2.1rem] min-w-[2.5rem] items-center justify-center rounded-full border border-[#e6e4dd] bg-white px-2 text-[0.78rem] font-bold text-[#3b3d44] shadow-[0_8px_18px_rgba(35,31,32,0.08)] ${
      this.orderBadgeClasses[label]
    }`;
  }

  protected revenueRangeClass(range: RevenueRange): string {
    return this.selectedRevenueRange() === range
      ? 'border-0 bg-transparent p-0 text-base font-bold text-[#b4292e]'
      : 'border-0 bg-transparent p-0 text-base font-medium text-[#a7a0a4]';
  }

  protected revenueCalloutClass(): string {
    return this.selectedRevenueRange() === 'Last Week'
      ? 'absolute right-3 top-[0.35rem] z-[1] text-base font-extrabold text-[#c53a3a] min-[721px]:left-[61%] min-[721px]:right-auto min-[721px]:top-[1.15rem]'
      : 'absolute right-3 top-[0.35rem] z-[1] text-base font-extrabold text-[#c53a3a] min-[721px]:left-[49%] min-[721px]:right-auto min-[721px]:top-[1.15rem]';
  }

  protected productRowClass(highlighted?: boolean): string {
    return highlighted
      ? 'flex min-h-8 flex-col items-start justify-between gap-4 rounded-[0.38rem] bg-[linear-gradient(90deg,#efd8bf_0%,#f4e9d2_52%,#efece1_100%)] px-[0.65rem] py-[0.55rem] min-[721px]:flex-row min-[721px]:items-center'
      : 'flex min-h-8 flex-col items-start justify-between gap-4 rounded-[0.38rem] bg-[#efeff4] px-[0.65rem] py-[0.55rem] min-[721px]:flex-row min-[721px]:items-center';
  }

  protected stockCountClass(critical?: boolean): string {
    return critical
      ? 'shrink-0 text-[0.98rem] font-medium text-[#ff2a1f]'
      : 'shrink-0 text-[0.98rem] font-medium text-[#2f3138]';
  }
}
