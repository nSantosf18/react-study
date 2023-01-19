import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css'

interface Funcionario {
  id: string,
  nome: string,
  salario: string
}

function App() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
    { id: uuidv4(), nome: 'Carlos Alberto', salario: '7000' },
    { id: uuidv4(), nome: 'Vinicius Souza', salario: '250' },
    { id: uuidv4(), nome: 'Luiz Portinoli', salario: '600' }
  ]);
  const [search, setSearch] = useState('');
  const [nome, setNome] = useState<string>('');
  const [salario, setSalario] = useState<string>('');

  const filteredSearch = search.length > 0 ? funcionarios.filter(func => func.nome.toLowerCase().includes(search.toLowerCase())) : [];

  const addFunc = () => {
    if (nome.length > 1) {
      setFuncionarios([...funcionarios, { id: uuidv4(), nome: nome, salario: salario }]);
      setNome('');
      setSalario('');
    }
  }

  const removeFunc = (func: Funcionario) => {
    const index = funcionarios.indexOf(func);
    setFuncionarios(funcionarios.filter((_, i) => i !== index));
  }

  return (
    <div className="App">
      <div className="input-wrapper">
        <input className="search" type="text"
          placeholder="search..."
          value={search}
          onChange={e => setSearch(e.target.value)}></input>
        <i className="ph-magnifying-glass-light" />
      </div>
      <table>
        <caption>Funcionários</caption>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Salário</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            search.length > 0 ? (
              filteredSearch.map(func =>
                <tr key={func.id}>
                  <td>{func.nome}</td>
                  <td>{Number(func.salario).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                  <td>
                    <button type="button">
                      <i className="ph-trash"></i>
                    </button>
                  </td>
                </tr>)
            ) : (
              funcionarios.map(func =>
                <tr key={func.id}>
                  <td>{func.nome}</td>
                  <td>{Number(func.salario).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                  <td>
                    <button type="button" onClick={() => removeFunc(func)}>
                      <i className="ph-trash-light"></i>
                    </button>
                  </td>
                </tr>)
            )
          }
        </tbody>
      </table>

      <div className="container">
        <input type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}></input>

        <input type="number"
          placeholder="Salário"
          value={salario}
          onChange={e => setSalario(e.target.value)}></input>
        <button type="button" onClick={addFunc}>
          <i className="ph-plus" />
        </button>
      </div>

    </div>
  )
}

export default App;
