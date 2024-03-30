<template>
  <header class="header">
    <label for="UserEmail" class="header__label">
      <input
        type="email"
        id="UserEmail"
        placeholder="Artistas, faixas, podcasts..."
        class="header__input"
      />
    </label>
    <div class="header__account">
      <div class="header__user-container">
        <img
          class="header__user-icon"
          src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/ddde9c36-3bed-4f13-989a-23e7f5972d5b"
          alt="icon ring"
          @click="toggleNotification"
        />
        <summary class="header__summary">
          <span class="header__text">
            <div class="header__icon-container">
              <img
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="user photo"
                class="header__user"
                @click="toggleModal"
              />
            </div>
          </span>
        </summary>
      </div>

      <div v-if="showModal" class="header__user-menu">
        <ul class="header__details-hide">
          <li class="header__hover">
            <img
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="user photo"
              class="header__user"
            />
            <a class="header__user-link" href="#">Eric Frusciante</a>
          </li>
          <li class="header__hover">
            <a class="header__announcement" href="#">
              <span class="header__announcement-text"
                >Escolha oque você ouve. Sem anúncios.</span
              >
              <span class="header__announcement-description"
                >1 mês grátis; a partir daí R$ 24,90/mês. Experimente
                agora.</span
              >
            </a>
          </li>
        </ul>

        <ul class="header__details-hide border">
          <li class="header__hover">
            <a class="header__user-link" href="#">Configurações da conta</a>
          </li>
          <li class="header__hover">
            <a class="header__user-link" href="#">Gerenciar minha assinatura</a>
          </li>
          <li class="header__hover">
            <a class="header__user-link" href="#">Gerenciar minhas exclusões</a>
          </li>
          <li class="header__hover">
            <a class="header__user-link" href="#">Comprar um vale presente</a>
          </li>
          <li class="header__hover">
            <a class="header__user-link" href="#">Ativar um código</a>
          </li>
          <li class="header__hover">
            <a class="header__user-link" href="#">Desconectar</a>
          </li>
        </ul>

        <ul class="header__details-hide border">
          <li class="header__hover justify">
            <a class="header__user-link" href="#">Modo noturno</a>
            <label class="header__switch">
              <input type="checkbox" checked />
              <span class="header__slider round"></span>
            </label>
          </li>
          <li class="header__hover">
            <a class="header__user-link" href="#">Suporte</a>
          </li>
          <li class="header__hover">
            <a class="header__user-link" href="#">Community e feedback</a>
          </li>
          <li class="header__hover">
            <a class="header__user-link" href="#">Planos</a>
          </li>
          <li class="header__hover">
            <a class="header__user-link" href="#">Recursos</a>
          </li>
          <li class="header__hover">
            <a class="header__user-link" href="#">Sobre nós</a>
          </li>
          <li class="header__hover">
            <a class="header__user-link" href="#">Jobs</a>
          </li>
          <li class="header__hover">
            <a class="header__user-link" href="#">Legal</a>
          </li>
        </ul>
      </div>
      <div v-if="showNotification" class="header__user-menu">
        <h1 class="header__notification-title">Notificações</h1>
        <div class="header__notification">
          <img
            src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/43b34444-348d-4bb1-beab-7c4dfe86d8b7"
            alt=""
            class="header__notification-photo"
          />
          <p class="header__notification-text">Não fique sozinho.</p>
          <button class="header__notification-button">Adicione artistas</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showModal: false,
      showNotification: false,
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
      this.showNotification = false
    },
    toggleNotification() {
      this.showNotification = !this.showNotification
      this.showModal = false
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/header.scss";

.header__user-container:hover .header__user-menu {
  display: block;
}

.header__user-container:hover .header__notification {
  display: block;
}

a {
  text-decoration: none !important;
}
</style>