import type { ReactNode } from 'react';

export type Mode = 'info' | 'success' | 'warning' | 'error';

export interface DefaultProps {
  children: ReactNode;
}

export interface Journal {
  id: string;
  title: string;
  status: 'Approved' | 'Under Review' | 'Submitted';
  author: string; // New field for the author
  coAuthors: string[];
  category: string;
  submissionDate: Date;
}
