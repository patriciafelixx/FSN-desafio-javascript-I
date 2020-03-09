// Base a ser utilizada
const alunosDaEscola = [{
    nome: "Henrique",
    notas: [],
    cursos: [],
    faltas: 5
}, {
    nome: "Edson",
    notas: [],
    cursos: [],
    faltas: 2
}, {
    nome: "Bruno",
    notas: [10, 9.8, 9.6],
    cursos: [],
    faltas: 0
}, {
    nome: "Guilherme",
    notas: [10, 9.8, 9.6],
    cursos: [{
        nomeDoCurso: "Full Stack",
        dataMatricula: new Date
    }],
    faltas: 0
}, {
    nome: "Carlos",
    notas: [],
    cursos: [],
    faltas: 0
}, {
    nome: "Lucca",
    notas: [10, 9.8, 9.6],
    cursos: [{
        nomeDoCurso: "UX",
        dataMatricula: new Date
    }],
    faltas: 0
}];

// Implementação

function adicionarAluno(nome) {
    let novoAluno = { nome, notas: [], cursos: [], faltas: 0 };
    if (novoAluno.nome) {
        alunosDaEscola.push(novoAluno);
        console.log(`${nome} adicionado(a) com sucesso!`);
    } else {
        console.log('Erro! Campo nome vazio, tente novamente!');
    }
};

function listarCursos(arr) {
    if (arr.length <= 0) {
        console.log('Nenhum curso registrado.')
    } else {
        arr.forEach((curso, i) => {
            console.log(`Curso ${i + 1}: ${[curso.nomeDoCurso]} - Data de matrícula: ${[curso.dataMatricula.toLocaleDateString('pt-BR')]}`);
            i++;
        })
    }
}

function listarAlunos() {
    alunosDaEscola.forEach((aluno) => {
        console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
        console.log(`Nome: ${aluno.nome} | Notas: ${aluno.notas} | Faltas: ${aluno.faltas}`);
        listarCursos(aluno.cursos);
    });
}

function buscarAluno(nome) {
    let resBusca = alunosDaEscola.find(a => a.nome == nome);
    if (resBusca) {
        const { notas, cursos, faltas } = resBusca;
        console.log(`Nome: ${nome} | Notas: ${notas} | Faltas: ${faltas}`)
        listarCursos(cursos);
    } else {
        console.log('Aluno não registrado no sistema. Tente novamente!');
    }
    return resBusca;
}

function matricularAluno(aluno, curso) {
    const { nome } = aluno;
    let i = alunosDaEscola.findIndex(a => a.nome == nome);
    if (i >= 0) {
        alunosDaEscola[i].cursos.push({ nomeDoCurso: curso, dataMatricula: new Date });
        console.log(`${nome} matriculado(a) com sucesso no curso de ${curso}.`);
    } else {
        console.log('Aluno não registrado no sistema. Tente novamente!')
    }
}

function aplicarFalta(aluno) {
    const { nome } = aluno;
    let i = alunosDaEscola.findIndex(a => a.nome == nome);
    if (i >= 0) {
        alunosDaEscola[i].faltas += 1;
        console.log(`Falta aplicada à ${nome}. Qtde de faltas atual: ${alunosDaEscola[i].faltas}.`);
    } else {
        console.log('Aluno não registrado no sistema. Tente novamente!')
    }
}

function aplicarNota(aluno) {
    const { nome, nota } = aluno;
    let i = alunosDaEscola.findIndex(a => a.nome == nome);
    if (i >= 0 && alunosDaEscola[i].cursos.length > 0) {
        alunosDaEscola[i].notas.push(nota);
        console.log(`Nota ${nota} aplicada à ${nome}. Notas atualizadas: ${alunosDaEscola[i].notas}.`);
    } else if (i >= 0) {
        console.log(`Não permitido! ${nome} matriculado(a) em nenhum curso.`);
    } else {
        console.log('Aluno não registrado no sistema. Tente novamente!')
    }
}

function aprovarAluno(aluno) {
    let dadosAluno = alunosDaEscola.find(a => a.nome == aluno.nome);
    const { nome, notas, cursos, faltas } = dadosAluno;
    let media = cursos.length > 0 ? (notas.reduce((x, y) => x + y)/notas.length).toFixed(1) : 'N/A';
    let situacao = cursos.length > 0 && faltas <= 3 && media >= 7 ? 'Aprovado' : 'Reprovado';
    console.log(`Nome: ${nome} | Média: ${media} | Faltas: ${faltas} | Situação: ${situacao}`);
    return situacao;
}

module.exports = { adicionarAluno, listarAlunos, buscarAluno, matricularAluno, aplicarFalta, aplicarNota, aprovarAluno };