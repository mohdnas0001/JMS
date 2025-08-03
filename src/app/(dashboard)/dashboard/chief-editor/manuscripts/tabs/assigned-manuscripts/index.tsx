'use client';

import React, { useEffect, useState } from 'react';
import ManuscriptTable from '../../components/table';
import { getAssignedManuscripts } from '@/api/manuscript';

interface Manuscript {
    id: string;
    title: string;
    author: string;
    coAuthor: string;
    createdAt: string;
    status: string;
}
  
const AssignedManuscriptsTab: React.FC = () => {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAssignedManuscripts();
        setManuscripts(data.filter((manuscript: Manuscript) => manuscript.sectionId !== null));
      } catch (error) {
        console.error('Error fetching assigned manuscripts:', error);
      }
    };

    fetchData();
  }, []);

  const handleAssign = (id: string) => {
    // Logic to assign the manuscript
  };

  const handleDelete = (id: string) => {
    // Logic to delete the manuscript
  };

  return <ManuscriptTable manuscripts={manuscripts} onAssign={handleAssign} onDelete={handleDelete} />;
};

export default AssignedManuscriptsTab;
