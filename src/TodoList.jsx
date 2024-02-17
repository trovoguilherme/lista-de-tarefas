
import React, {useState, useEffect} from 'react' // Use effect é para fazer outra coisa se caso um estado (State) for mudado,  efeito colateral
import './TodoList.css'
import Icone from './assets/icon.png'

function TodoList() {

    const listaStorage = localStorage.getItem('Lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []); //Tem que converter por o localstorage só guarda uma string
    const [novoItem, setNovoItem] = useState("");

    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista)) //Tem que converter a lista em string para salvar no localstorage
    }, [lista])

    function adicionaItem(form) {
        form.preventDefault();
        if (!novoItem) {
            return;
        } else {
            setLista([...lista, {text: novoItem, isCompleted: false}]);
            setNovoItem("");
            document.getElementById('input-entrada').focus();
        }
    }

    function clicou(index) {
        const listaAux = [...lista]; //[...lista] Cria uma cópia superficial da lista shallow copy
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deletar(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletarTodos() {
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input id='input-entrada' value={novoItem} onChange={(e) => setNovoItem(e.target.value)} type="text" placeholder="Adicione uma tarefa"/>
                <button className='add' type="submit">Add</button>
            </form>
            <div className="listaTarefas">
                <div style={{textAlign: 'center'}}>
                    {
                        lista.length < 1 ?
                        <img className='icone-central' src={Icone} alt="" />
                        :
                        lista.map((item, index) => (
                            <div key={index} className={item.isCompleted ? "item completo" : "item"}>
                            <span onClick={() => {clicou(index)}}>{item.text}</span>
                            <button onClick={() => {deletar(index)}} className='del'>Deletar</button>
                        </div>
                        ))
                    }
                    {
                        lista.length > 0 && //Pra ver se essa condição é verdadeira
                        <button onClick={() => {deletarTodos()}} className='deleteAll'>Deletar Todas</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TodoList