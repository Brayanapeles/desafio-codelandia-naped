/* Função que carrega todas as outras (funções) quando a tela é renderizada */
document.addEventListener(
  "DOMContentLoaded",
  function () {
    var lista = document.querySelectorAll(".item-lista");
    var main = document.querySelector("main");
    var btnTopo = document.getElementById("btnTopo");
    //Essa função corre todas as <li> que possui a classe ativo e as removem (classe)
    function desativarClasse() {
      var desabilitado = document.querySelectorAll(".ativo");
      if (desabilitado != undefined) {
        desabilitado.forEach((e) => {
          e.classList.remove("ativo");
        });
      }
    }
    //esse foreach corre as <li> e adiciona um evento de click
    //Essa verficia a posição da tela e ativa o botão de voltar para o topo da pagina
    function voltarAoTopo() {
      document.addEventListener("scroll", () => {
        if (window.pageYOffset > 100) {
          btnTopo.classList.add("ativo");
        } else {
          btnTopo.classList.remove("ativo");
        }
        btnTopo.addEventListener("click", () => {
          window.scroll({
            top: 0,
            behavior: "smooth",
          });
        });
      });
    }
    lista.forEach((li) => {
      li.addEventListener("click", () => {
        desativarClasse();
        li.classList.add("ativo");
        //requisições ajax XHR(xml http request) com js
        var requisicao = new XMLHttpRequest();
        //documento vai ser onde eu vou guardar a resposta da requisição
        var documento;
        //setando o tipo da requisição que eu quero receber
        //nesse caso tem que ser do tipo text por ser um doc.html
        requisicao.responseType = "text";
        /*
          Ready State :
          *representa o estado atual da requisição
          0: req não inicializada
          1: estabeleceu conexão
          2: pedido recebido
          3: Processando pedido
          4: Solicitação concluída e resposta pronta
        */
        //monitorando o estado da requisição
        requisicao.onreadystatechange = function () {
          //status: 200 = Ok!
          if (requisicao.readyState == 4 && requisicao.status == 200) {
            documento = requisicao.response;
            main.innerHTML = documento;
          } else if (requisicao.status === 404) {
            //"tratando" o erro 404
            requisicao.open("GET", `telas/404.html`);
            requisicao.send();
            documento = requisicao.response;
            main.innerHTML = documento;
            console.log("Sessão indisponível no momento ;)");
          }
        };
        //tipo, url
        requisicao.open("GET", `telas/${li.dataset.tela}.html`);
        //enviando a requisição
        requisicao.send();
      });
    });
    voltarAoTopo();
  },
  false
);
//Usando jquery pra fazer uma função em um elemento que ainda não "nasceu"
$(function () {
  $("body").on("click", "#voltarHome", function () {
    $("#header>nav>ul>li:first-child").click();
  });
});
