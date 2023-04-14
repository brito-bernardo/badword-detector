import React, { useState } from "react";
// Importa o hook 'useState' da biblioteca React
import { palavrasOfensivasBanco } from "./PalavrasOfensivasBanco";
// Importa o banco de palavras ofensivas
import "../style/DetectorPalavrasOfensivas.css";
// Importa o estilo CSS do componente
import verdeIcone from '../assets/approved-icon.png'
import vermelhoIcone from '../assets/rejected-icon.png'
import badIcone from '../assets/bad-icon.png';

function DetectorPalavrasOfensivas() {
  // Declaração dos estados do componente utilizando o hook 'useState'
  const [palavrasOfensivas, setPalavrasOfensivas] = useState([]);
  const [mostrarPalavrasOfensivas, setMostrarPalavrasOfensivas] = useState(false);
  const [palavrasOfensivasEncontradas, setPalavrasOfensivasEncontradas] = useState(false);

  function handleSubmit() {
    // Função que será chamada quando o botão 'Verificar' for clicado
    const textoEntrada = document.getElementById("texto-entrada").value;
    // Obtém o texto digitado pelo usuário no elemento de texto com id 'texto-entrada'
    const palavrasOfensivasEncontradas = palavrasOfensivasBanco.filter(palavra =>
      textoEntrada.toLowerCase().includes(palavra.toLowerCase())
    );
    // Verifica se o texto digitado pelo usuário contém alguma palavra ofensiva do banco
    setPalavrasOfensivas(palavrasOfensivasEncontradas);
    // Define o estado 'palavrasOfensivas' com a lista de palavras ofensivas encontradas
    setMostrarPalavrasOfensivas(true);
    // Define o estado 'mostrarPalavrasOfensivas' como verdadeiro para exibir o resultado
    setPalavrasOfensivasEncontradas(palavrasOfensivasEncontradas.length > 0);
    // Define o estado 'palavrasOfensivasEncontradas' com um valor booleano para indicar se foram encontradas palavras ofensivas
  }

  return (
    <div className="detector-container">
      <img src={badIcone} alt="Ícone" className="detector-image" />
      <h2 className="detector-title">Bad words detector</h2>
      <div className="detector-form">
        <label htmlFor="texto-entrada" className="detector-label">
          Type the text
        </label>
        <textarea id="texto-entrada" className="detector-textarea"></textarea>
        <button onClick={handleSubmit} className="detector-button">
          Verify
          <img
            src={
              palavrasOfensivasEncontradas ? vermelhoIcone: verdeIcone
            }
            alt="Ícone"
            className="icon"
            style={{ marginLeft: "10px" }
          }
          />
        </button>
      </div>
      {mostrarPalavrasOfensivas && (
        palavrasOfensivas.length > 0 ? (
          <div className="detector-result">
            <p className="detector-result-text">Não seja mal educado! </p>
            <p className="detector-result-text">Palavras ofensivas encontradas:</p>
            <ul className="detector-result-list">
              {palavrasOfensivas.map((palavra, index) => (
                <li key={index} className="detector-result-item">
                  {palavra}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="detector-result">
            <p className="detector-result-text">
              As pessoas educadas são verdadeiros tesouros na sociedade, tornando  o mundo um lugar mais respeitoso, pacífico e amoroso para todos.</p>
            <p className="detector-result-text">Nenhuma palavra ofensiva encontrada.</p>
          </div>
        )
      )}
    </div>
  );
}
export default DetectorPalavrasOfensivas;