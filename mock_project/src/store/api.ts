export async function fetchJson(url: string) {
  try {
    const res = await fetch(url, {
      method: 'GET',
    });
    const jsonData = await res.json()
    return jsonData
  } catch (error) {
    console.error(`Unexpected error:`, error);
    throw error
  }
}

export async function updateJson(url: string, body: any, method: 'PUT' | 'POST' | 'PATCH') {
  try {
    const res = await fetch(url, {
      method,
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();

      return data;
    }
  } catch (error) {
    console.error(`Unexpected error:`, error);
    throw error
  }
}

export async function deleteJson(url: string, id: string) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      console.log('JSON object deleted successfully');
    } else {
      const errorData = await res.json();
      console.error('Error deleting JSON object:', errorData);
      throw new Error('Failed to delete JSON object');
    }
  } catch (error) {
    console.error(`Unexpected error with ${id}`, error);
    throw error;
  }
}