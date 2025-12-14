const API_URL = 'http://localhost:3000'


async function CreateUser() {
  try {
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const res = await fetch(`${API_URL}/CreateUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha, email })
    })

    const data = await res.json()

    if (!res.ok) {
        alert('Erro ao criar usuário')
        return
    }

    console.log('Usuário criado com sucesso:')
    alert('Usuário criado com sucesso')


  } catch (error) {
        console.error('Erro de conexão:', error)    
  }
}
