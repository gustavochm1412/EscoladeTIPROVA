import { useEffect, useMemo, useState } from 'react'
import './App.css'

type Periferico = {
  _id: string
  nome: string
  computadorId: string
}

type Computador = {
  _id: string
  nome: string
  cor: string
  dataFabricacao: number
  perifericos: Periferico[]
}

const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

function App() {
  const [computadores, setComputadores] = useState<Computador[]>([])
  const [loading, setLoading] = useState(false)
  const [nome, setNome] = useState('')
  const [cor, setCor] = useState('')
  const [dataFabricacao, setDataFabricacao] = useState('')
  const [perifericoNome, setPerifericoNome] = useState('')
  const [selectedComputador, setSelectedComputador] = useState<string>('')
  const headers = useMemo(() => ({ 'Content-Type': 'application/json' }), [])

  async function fetchComputadores() {
    setLoading(true)
    try {
      const res = await fetch(`${apiBase}/computadores`)
      const data = await res.json()
      setComputadores(data)
    } finally {
      setLoading(false)
    }
  }

  async function createComputador() {
    if (!nome.trim() || !cor.trim() || !dataFabricacao) return
    try {
      const res = await fetch(`${apiBase}/computadores`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ nome, cor, dataFabricacao: parseInt(dataFabricacao) })
      })
      if (!res.ok) {
        console.error('Erro ao criar computador:', res.status, res.statusText)
        return
      }
      const created: Computador = await res.json()
      setComputadores((prev) => [created, ...prev])
      setNome('')
      setCor('')
      setDataFabricacao('')
    } catch (error) {
      console.error('Erro na requisição:', error)
    }
  }

  async function updateComputador(id: string, payload: Partial<Computador>) {
    try {
      const res = await fetch(`${apiBase}/computadores/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        console.error('Erro ao atualizar computador:', res.status, res.statusText)
        return
      }
      const updated: Computador = await res.json()
      setComputadores((prev) => prev.map((c) => (c._id === id ? updated : c)))
    } catch (error) {
      console.error('Erro na requisição:', error)
    }
  }

  async function deleteComputador(id: string) {
    try {
      const res = await fetch(`${apiBase}/computadores/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setComputadores((prev) => prev.filter((c) => c._id !== id))
      } else {
        console.error('Erro ao deletar computador:', res.status, res.statusText)
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
    }
  }

  async function addPeriferico(computadorId: string) {
    if (!perifericoNome.trim()) return
    try {
      const res = await fetch(`${apiBase}/computadores/${computadorId}/perifericos`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ nome: perifericoNome })
      })
      if (res.ok) {
        setPerifericoNome('')
        fetchComputadores() // Recarrega para mostrar o periférico
      } else {
        console.error('Erro ao adicionar periférico:', res.status, res.statusText)
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
    }
  }

  async function updatePeriferico(computadorId: string, perifericoId: string, nome: string) {
    try {
      const res = await fetch(`${apiBase}/computadores/${computadorId}/perifericos/${perifericoId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ nome })
      })
      if (res.ok) {
        fetchComputadores() // Recarrega para mostrar a atualização
      } else {
        console.error('Erro ao atualizar periférico:', res.status, res.statusText)
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
    }
  }

  async function removePeriferico(computadorId: string, perifericoId: string) {
    try {
      const res = await fetch(`${apiBase}/computadores/${computadorId}/perifericos/${perifericoId}`, { method: 'DELETE' })
      if (res.ok) {
        fetchComputadores() // Recarrega para atualizar a lista
      } else {
        console.error('Erro ao remover periférico:', res.status, res.statusText)
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
    }
  }

  useEffect(() => {
    fetchComputadores()
  }, [])

  return (
    <div className="container">
      <h2>CRUD Computadores e Periféricos</h2>
      
      {/* Formulário para criar computador */}
      <div className="section">
        <h3>Adicionar Computador</h3>
        <div className="row">
          <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input placeholder="Cor" value={cor} onChange={(e) => setCor(e.target.value)} />
          <input placeholder="Ano (ex: 2024)" type="number" value={dataFabricacao} onChange={(e) => setDataFabricacao(e.target.value)} />
          <button onClick={createComputador} disabled={!nome.trim() || !cor.trim() || !dataFabricacao}>Adicionar</button>
        </div>
      </div>

      {/* Formulário para adicionar periférico */}
      <div className="section">
        <h3>Adicionar Periférico</h3>
        <div className="row">
          <select value={selectedComputador} onChange={(e) => setSelectedComputador(e.target.value)}>
            <option value="">Selecione um computador</option>
            {computadores.map((c) => (
              <option key={c._id} value={c._id}>{c.nome}</option>
            ))}
          </select>
          <input placeholder="Nome do periférico" value={perifericoNome} onChange={(e) => setPerifericoNome(e.target.value)} />
          <button onClick={() => addPeriferico(selectedComputador)} disabled={!selectedComputador || !perifericoNome.trim()}>Adicionar</button>
        </div>
      </div>

      <div className="muted">API: {apiBase}</div>
      
      {loading ? <p>Carregando...</p> : (
        <div className="list">
          {computadores.length === 0 ? <p>Nenhum computador.</p> : computadores.map((comp) => (
            <div key={comp._id} className="computador">
              <div className="computador-header">
                <input value={comp.nome} onChange={(e) => updateComputador(comp._id, { nome: e.target.value })} />
                <input value={comp.cor} onChange={(e) => updateComputador(comp._id, { cor: e.target.value })} />
                <input value={comp.dataFabricacao} type="number" onChange={(e) => updateComputador(comp._id, { dataFabricacao: parseInt(e.target.value) })} />
                <button onClick={() => deleteComputador(comp._id)}>Excluir</button>
              </div>
              <div className="perifericos">
                <h4>Periféricos:</h4>
                {comp.perifericos.length === 0 ? <p className="muted">Nenhum periférico</p> : comp.perifericos.map((perif) => (
                  <div key={perif._id} className="periferico">
                    <input 
                      value={perif.nome} 
                      onChange={(e) => updatePeriferico(comp._id, perif._id, e.target.value)}
                      style={{flex: 1, marginRight: '10px'}}
                    />
                    <button onClick={() => removePeriferico(comp._id, perif._id)}>Remover</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
