export const paths = {
  home: '/',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    resetPassword: '/auth/reset-password',
  },
  dashboard: {
    chiefEditor: {
      overview: '/dashboard/chief-editor',
      manuscripts: '/dashboard/chief-editor/manuscripts',
      settings: '/dashboard/chief-editor/settings',
    },
    reviewer: {
      overview: '/dashboard/reviewer',
      manuscripts: '/dashboard/reviewer/manuscripts',
      settings: '/dashboard/reviewer/settings',
    },
    author: {
      overview: '/dashboard/author',
      submission: '/dashboard/author/submission',
      settings: '/dashboard/author/settings',
      submit: '/dashboard/author/submit-manuscript',
    },
    managingEditor: {
      overview: '/dashboard/managing-editor',
      settings: '/dashboard/managing-editor/settings',
    },
    productionEditor: {
      overview: '/dashboard/production-editor',
      settings: '/dashboard/production-editor/settings',
    },
    sectionEditor: {
      overview: '/dashboard/section-editor',
      settings: '/dashboard/section-editor/settings',
    },
  },
  errors: {
    notFound: '/errors/not-found',
    notAuthorized: '/errors/not-authorized',
  },
} as const;
