import { baseUrl } from '@/constants/config';

export const submitManuscript = async (data: any) => {
  try {
    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem('custom-auth-token');

    console.log(accessToken ? true : false);
    const mappedData = {
      title: data.title,
      abstract: data.abstract,
      keywords: data.keywords,
      author: data.author,
      coAuthors: data.coAuthor, 
      suggestedReviewer: data.suggestedReviewer,
      manuscriptLink: data.manuscript, 
      proofofPayment: data.proofofPayment,
      otherDocsLink: data.otherDocs, 
    };

    const response = await fetch(`${baseUrl}/manuscripts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken ? `Bearer ${accessToken}` : '', 
      },
      body: JSON.stringify(mappedData),
    });

    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Submission failed');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Submission failed');
  }
};

export const getSubmittedManuscripts = async () => {
  try {
    const accessToken = localStorage.getItem('custom-auth-token');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${baseUrl}/v1/author/Submitted-Manuscript`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch manuscripts');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch manuscripts');
  }
};

export const getAssignedManuscripts = async () => {
  try {
    const accessToken = localStorage.getItem('custom-auth-token');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${baseUrl}/manuscripts/assigned`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch manuscripts');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch manuscripts');
  }
};


export const getUnAssignedManuscripts = async () => {
  try {
    const accessToken = localStorage.getItem('custom-auth-token');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${baseUrl}/manuscripts/unassigned`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch manuscripts');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch manuscripts');
  }
};