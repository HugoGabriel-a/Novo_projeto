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

  const user = await res.json()
  localStorage.setItem('isAdmin', user.isAdmin)
  localStorage.setItem('userId', user.id)


  if (!res.ok) {
    alert('Usuário ou senha inválidos')
    return
  }


  if (user.isAdmin) {
    alert(`Login bem-sucedido! Usuário ADMIN: ${user.nome}`)
    location.href= "inicio.html"
  } else {
    location.href= "inicio.html"
  }

  } catch (error) {
    alert('Erro ao conectar com o servidor')
    console.error(error)
  }
}



