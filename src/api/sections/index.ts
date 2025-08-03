import { baseUrl } from '@/constants/config';

export const createSession = async (data: { name: string; }) => {
  try {
    const accessToken = localStorage.getItem('custom-auth-token');

    const response = await fetch(`${baseUrl}/v1/section/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create session');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to create session');
  }
};
