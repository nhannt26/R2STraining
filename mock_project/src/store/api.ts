export async function fetchJson(url: string) {
  const data = await fetch(url, {
    method: 'GET',
  })
  const jsonData = await data.json()
  return jsonData
}

export async function updateJson(url: string, body: any, method: 'PUT' | 'POST') {
  const res = await fetch(url, {
    method: method || 'POST',
    body: JSON.stringify(body)
  })
  const data = await res.json()
  
}