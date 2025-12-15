
const API_URL="http://localhost:3000"

function goToAdm() {
  const isAdmin = localStorage.getItem('isAdmin')

  if (isAdmin === 'true') {
    window.location.href = 'adm.html'
  } else {
    alert('Você não é administrador')
  }
}

async function GetBooks() {
  try {
    const res = await fetch(`${API_URL}/book`)
    if (!res.ok) throw new Error('Erro ao buscar livros')
    
    const books = await res.json()
    const tbody = document.getElementById('GetBooks')
    tbody.innerHTML = ''

    const dispbooks = books.filter(book => !book.status)


    dispbooks.forEach(book => {
      const tr = document.createElement('tr')
      tr.innerHTML = `
      <tr>
        <td>${book.titulo}</td>
        <td>${book.autor}</td>
        <td>${book.genero}</td>
        <td>${book.usuario ? 'Alugado' : 'Disponível'}</td>
        <td>
          ${!book.usuario ? `<button onclick="AlugarBook('${book.id}')">Alugar</button>` : ''}
        </td>
      </tr>
      `
      tbody.appendChild(tr)
    })

  } catch (error) {
    console.error(error)
    alert('Erro ao carregar livros')
  }
}

window.onload = GetBooks


async function AlugarBook(id) {
  const UserId = localStorage.getItem('UserId') 
  console.log(UserId)

    if (!UserId) {
    alert('Usuário não logado')
    return
  }

  try {
    const res = await fetch(`${API_URL}/AlugarBook/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ UserId })
    })

    if (!res.ok) {
      const error = await res.json()
      alert(error.error)
    }

    const book = await res.json()
    alert(`Livro "${book.titulo}" alugado com sucesso!`)

    GetBooks()

  } catch (error) {
    console.error(error)
    alert('Erro na requisição')
  }

}