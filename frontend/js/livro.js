
const API_URL="http://localhost:3000"


async function GetBooksAdm() {
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
        <td>${book.titulo}</td>
        <td>${book.autor}</td>
        <td>${book.genero}</td>
        <td>${book.status ? 'Alugado' : 'Disponível'}</td>
        <td>
          <button onclick="ExcluirBook('${book.id}')">Excluir</button>
        </td>
      `
      tbody.appendChild(tr)
    })
  } catch (error) {
    console.error(error)
    alert('Erro ao carregar livros')
  }
}

async function ExcluirBook(id) {
  const confirmacao = confirm('Deseja realmente excluir este livro?')
  if (!confirmacao) return

  try {
    const res = await fetch(`${API_URL}/DeleteBook/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()

    if (res.ok) {
      alert("livro excluido")
      GetBooksAdm() 
    } else {
      alert(data.message)
    }
  } catch (error) {
    console.error('Erro ao excluir livro:', error)
    alert('Erro ao excluir livro')
  }
}

async function CriarLivro() {
  const titulo = document.getElementById('titulo').value
  const autor = document.getElementById('autor').value
  const genero = document.getElementById('genero').value

  if (!titulo || !autor || !genero) {
    alert('Preencha todos os campos')
    return
  }

  try {
    const res = await fetch(`${API_URL}/Createbook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, autor, genero })
    })

    const data = await res.json()

    if (res.ok) {
      alert(`Livro "${data.titulo}" adicionado com sucesso!`)
      document.getElementById('titulo').value = ''
      document.getElementById('autor').value = ''
      document.getElementById('genero').value = ''
      GetBooksAdm() // Atualiza a tabela
    } else {
      alert(data.message)
    }
  } catch (error) {
    console.error('Erro ao criar livro:', error)
    alert('Erro ao criar livro')
  }
}
window.onload = GetBooksAdm
