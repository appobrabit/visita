# Como colocar o app "Visita OBRABIT" no celular (de graça)

São duas contas gratuitas:

- **Firebase (do Google):** guarda os dados das visitas e faz o login.
- **GitHub:** deixa o app no ar num endereço só seu.

Leva uns 20 minutos, uma vez só. Nenhuma das duas pede cartão.

---

## Parte 1: Firebase (banco de dados e login)

1. Abra **console.firebase.google.com** e entre com sua conta Google.
2. **Criar projeto.** Nome: `obrabit-visitas`. Desative o Google Analytics e toque em **Criar**.

### Login

3. No menu lateral, vá em **Criação → Authentication → Vamos começar**.
   - Escolha **E-mail/senha**, ative e salve.
   - Na aba **Usuários**, toque em **Adicionar usuário** e cadastre seu e-mail e uma senha.
   - Repita para o seu pai.
   - Na aba **Configurações → Ações do usuário**, desmarque **"Ativar criação (inscrição)"**. Assim ninguém mais consegue criar conta.

### Banco de dados

4. No menu, vá em **Criação → Firestore Database → Criar banco de dados**.
   - Local: **southamerica-east1 (São Paulo)**.
   - Modo: **produção**.
5. Na aba **Regras**:
   - apague o que estiver lá;
   - cole o conteúdo do arquivo `firestore.rules`;
   - troque os dois e-mails de exemplo pelos de vocês;
   - toque em **Publicar**.

### Configuração do app

6. Toque na engrenagem → **Configurações do projeto**. Em **Seus apps**, toque no ícone **`</>`** (Web).
   - Apelido: `visita`. Não marque Hosting.
   - Toque em **Registrar app**.
7. Vai aparecer um bloco chamado `firebaseConfig`. Copie os valores para o arquivo `config.js`, ou mande o bloco para o Claude preencher.

## Parte 2: GitHub (deixa o app no ar)

1. Crie uma conta gratuita em **github.com**.
2. Toque em **New repository**.
   - Nome: `visita`.
   - Marque **Public** e toque em **Create repository**.
3. Toque em **"uploading an existing file"** e arraste os arquivos da pasta:
   - `index.html`, `config.js` (já preenchido), `sw.js`, `manifest.webmanifest`
   - os ícones `.png`

   Depois toque em **Commit changes**.
4. Vá em **Settings → Pages**.
   - Source: **Deploy from a branch**.
   - Branch: **main**, pasta **/ (root)**.
   - Toque em **Save**.
5. Em 1 ou 2 minutos o app estará em **https://SEU-USUARIO.github.io/visita/**
6. Volte ao Firebase: **Authentication → Configurações → Domínios autorizados → Adicionar domínio** → `SEU-USUARIO.github.io`.

> O código fica público no GitHub, mas os dados não. Só os e-mails listados nas regras conseguem ler ou gravar visitas.

## Parte 3: Instalar nos celulares

- **Android (Chrome):** abra o endereço, toque no menu **⋮** e depois em **Instalar app** (ou **Adicionar à tela inicial**).
- **iPhone (Safari):** abra o endereço, toque em **Compartilhar** e depois em **Adicionar à Tela de Início**.

Entre com o e-mail e a senha cadastrados. O app guarda o login.

---

## Como funciona no dia a dia

- **Sem internet:** dá para preencher a visita sem sinal. Ela fica salva no celular e sobe sozinha quando a internet voltar.
- **Dois celulares:** você e seu pai veem as mesmas visitas.
- **Onde ficam os dados:** no Firestore, na coleção **`visitas`**, com um documento por visita. Visita com `status: "concluida"` está pronta para o orçamento. É daí que a etapa de orçamento vai ler os dados quando vocês a montarem.
- **Atualizar o app:**
  1. Suba o `index.html` novo no GitHub (**Add file → Upload files**, substituindo o antigo).
  2. No `sw.js`, troque `v1` por `v2` (depois `v3`, e assim por diante) para os celulares pegarem a versão nova.
- **Custo:** o plano gratuito do Firebase (Spark) dá dezenas de milhares de gravações por dia. Vocês vão usar uma fração mínima disso.
