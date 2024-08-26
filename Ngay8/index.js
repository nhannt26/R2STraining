async function fetchPostsAndUsers() {
  try {
    // Fetch both posts and users concurrently
    const [postsResponse, usersResponse] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/users'),   

    ]);

    // Parse JSON responses
    const postsData = await postsResponse.json();
    const usersData = await usersResponse.json();

    // Create a map of users for efficient lookup
    const usersMap = new Map(usersData.map(user => [user.id, user.name]));

    // Combine posts and users data
    const combinedData = postsData.map(post => ({
      id: post.id,
      title: post.title,
      body: post.body,
      author: usersMap.get(post.userId),
    }));

    return combinedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Usage:
fetchPostsAndUsers()
  .then(data => {
    console.log(data);
  });