import MySubmissionTab from '@/app/(dashboard)/dashboard/author/submission/tabs/my-submission';
import SubmitManuscriptTab from '@/app/(dashboard)/dashboard/author/submit-manuscript/tabs/submit-manuscript';
import AssignedManuscriptsTab from '@/app/(dashboard)/dashboard/chief-editor/manuscripts/tabs/assigned-manuscripts';
import UnassignedManuscriptsTab from '@/app/(dashboard)/dashboard/chief-editor/manuscripts/tabs/unassigned-manuscripts';
import CreateSectionsTab from '@/app/(dashboard)/dashboard/chief-editor/sections/tabs/create-section';

export const SubmissionPageTabs = [
  {
    title: 'My Submission',
    component: MySubmissionTab,
  },
];

export const SubmitManuscriptPageTabs = [
  {
    title: 'Submit Manuscript',
    component: SubmitManuscriptTab,
  },
];

//EIC ---- Editor in chief
export const EditorManuscriptsPageTab = [
  {
    title: 'Assigned Manuscript',
    component: AssignedManuscriptsTab,
  },
  {
    title: 'Un-assigned Manuscript',
    component: UnassignedManuscriptsTab,
  }
]

export const SectionsPageTab = [
  {
    title: 'Create Section',
    component : CreateSectionsTab
  }
]