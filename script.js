const alunos = [];

const notaInput = document.getElementById('nota');

notaInput.addEventListener('input', function() {
    if (parseFloat(this.value) < 0 || parseFloat(this.value) > 10) {
        this.value = '';
    }
});

function adicionarAluno() {
    const nomeInput = document.getElementById('nome');
    const notaInput = document.getElementById('nota');

    const nome = nomeInput.value;
    const nota = parseFloat(notaInput.value);

    if (nome && !isNaN(nota)) {
        const aluno = {
            nome: nome,
            nota: nota
        };

        alunos.push(aluno);

        nomeInput.value = '';
        notaInput.value = '';

        atualizarListaAlunos();
    } else {
        alert('Por favor, preencha o nome e a nota corretamente.');
    }
}

function atualizarListaAlunos() {
    const listaAlunos = document.getElementById('lista-alunos');
    listaAlunos.innerHTML = '';

    for (const aluno of alunos) {
        const li = document.createElement('li');
        li.textContent = `${aluno.nome}: ${aluno.nota}`;
        listaAlunos.appendChild(li);
    }
}

function ordenarPorNome() {
    const alunosOrdenadosPorNome = [...alunos].sort((a, b) => a.nome.localeCompare(b.nome));
    exibirResultado(alunosOrdenadosPorNome);
}

function ordenarPorNota() {
    const alunosOrdenadosPorNota = [...alunos].sort((a, b) => b.nota - a.nota);
    exibirResultado(alunosOrdenadosPorNota);
}

function encontrarMaiorNota() {
    const alunoComMaiorNota = alunos.reduce((max, aluno) => (aluno.nota > max.nota ? aluno : max), alunos[0]);
    exibirResultado([alunoComMaiorNota]);
}

function calcularMediaNotas() {
    const totalNotas = alunos.reduce((acumulador, aluno) => acumulador + aluno.nota, 0);
    const media = totalNotas / alunos.length;
    exibirResultado([{ nome: 'Média das Notas', nota: media }]);
}

function alunosAprovados() {
    const aprovados = alunos.filter(aluno => aluno.nota >= 6);
    exibirResultado(aprovados);
}

function exibirResultado(resultado) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (resultado.length === 0) {
        resultadoDiv.textContent = 'Nenhum resultado encontrado.';
        return;
    }

    const ul = document.createElement('ul');
    for (const aluno of resultado) {
        const li = document.createElement('li');
        li.textContent = `${aluno.nome}: ${aluno.nota}`;
        ul.appendChild(li);
    }
    resultadoDiv.appendChild(ul);
}

document.getElementById('adicionar').addEventListener('click', adicionarAluno);
document.getElementById('ordenar-nome').addEventListener('click', ordenarPorNome);
document.getElementById('ordenar-nota').addEventListener('click', ordenarPorNota);
document.getElementById('maior-nota').addEventListener('click', encontrarMaiorNota);
document.getElementById('media-notas').addEventListener('click', calcularMediaNotas);
document.getElementById('aprovados').addEventListener('click', alunosAprovados);
