const messages = [{ role: 'user', content: 'Hi Coach Nexa, please give me a 1 sentence tip for a beginner.' }];

fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages })
})
.then(async res => {
  const data = await res.json();
  if (!res.ok) {
    console.error(`Error ${res.status}:`, data.error);
    return;
  }
  
  console.log('\n--- Complete Response ---');
  console.log(data.content);
})
.catch(err => console.error(err));
