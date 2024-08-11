import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItemsAuthor: NavItemConfig[] = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.author.overview, icon: 'chart-pie' },
  { key: 'submission', title: 'Submission', href: paths.dashboard.author.submission, icon: 'manuscript' },
  { key: 'submit', title: 'Submit Manuscript', href: paths.dashboard.author.submit, icon: 'plugs-connected' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.author.settings, icon: 'gear-six' },
] satisfies NavItemConfig[];

export const navItemsChiefEditor = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.chiefEditor.overview, icon: 'chart-pie' },
  { key: 'manuscripts', title: 'Manuscripts', href: paths.dashboard.chiefEditor.manuscripts, icon: 'manuscript' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.chiefEditor.settings, icon: 'gear-six' },
] satisfies NavItemConfig[];

export const navItemsReviewer: NavItemConfig[] = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.reviewer.overview, icon: 'chart-pie' },
  { key: 'manuscripts', title: 'Manuscripts', href: paths.dashboard.reviewer.manuscripts, icon: 'manuscript' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.reviewer.settings, icon: 'gear-six' },
] satisfies NavItemConfig[];

export const navItemsManagingEditor: NavItemConfig[] = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.managingEditor.overview, icon: 'chart-pie' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.managingEditor.settings, icon: 'gear-six' },
] satisfies NavItemConfig[];

export const navItemsProductionEditor: NavItemConfig[] = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.productionEditor.overview, icon: 'chart-pie' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.productionEditor.settings, icon: 'gear-six' },
] satisfies NavItemConfig[];

export const navItemsSectionEditor: NavItemConfig[] = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.sectionEditor.overview, icon: 'chart-pie' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.sectionEditor.settings, icon: 'gear-six' },
] satisfies NavItemConfig[];
