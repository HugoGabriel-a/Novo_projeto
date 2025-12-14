const API_URL = 'http://localhost:3000' 

async function login() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  if (!email || !senha) {
    alert('Preencha todos os campos')
    return
  }

  try {
  const res = await fetch(`${API_URL}/VerifUser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  })

  const data = await res.json()

  if (!res.ok) {
    alert('Usuário ou senha inválidos')
    return
  }


  if (data.isAdmin) {
    alert(`Login bem-sucedido! Usuário ADMIN: ${data.nome}`)
  } else {
    alert(`Login bem-sucedido! Usuário comum: ${data.nome}`)
  }

  } catch (error) {
    alert('Erro ao conectar com o servidor')
    console.error(error)
  }
}
