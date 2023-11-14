<template>
  <v-card id="card"
      justify-center
  >
      <v-card-title>Sobre o projeto</v-card-title>

    <v-card-subtitle class="pt-4">
      How Noise It Is?
    </v-card-subtitle>

    <v-card-text id="textArea"

    >
      <div><p>Esse projeto foi desenvolvido para a discuplina "projeto integrador 5" do curso "Engenraria da Computação" da Universidade Virtual Do Estado De São Paulo</p>
      <br>
        <p>How noise it is é um projeto prático que tem como objetivo medir e informar o usuário sobre o quão barulhento está o ambiente. Para realizar as medições foi usado
        um senssor de pressão sonora ligado ao microcontrolador nodeMCU que a cada 5 segundos envia os dados medidos via wifi para uma API prória que armazena essas informações
          em um banco de dados.</p> <br> <p> Posteriormente esses dados são recuperados e exibidos em dois gráficos na aba Dashboard, um deles mostra o historico de medicçoes realizadas
          nos ultimos dois dias e é atualizado com novas informações a cada 5 segundos,  e o segundo é um mostrador do tipo gauge que mostra os dois últimos valores medidos.  </p>
      </div>
      <br><br><br>


      <ul id="lista">
        <h3>Grupo:</h3><br>
        <li>Bruna Pereira De Souza</li>
        <li>Jackeline Dos Santos Soares</li>
        <li>Raul De Souza Lessa</li>
        <li>Tereza Cristina De Andrade</li>
        <li>Tonny James Pereira Dos Reis</li>
      </ul>

    </v-card-text>

    <v-card-actions>
      <a href="https://github.com/TonnyJames?tab=repositories" target="_blank">código Github</a>


    </v-card-actions>
  </v-card>
</template>

<style scoped>

#card{
  color: #f2f2f2;
  background-color: #282828;
  margin-right: 0px;
  width: 100%

}
#textArea{
  align-self: center;
  padding: 50px;
  font-size: 15px;
}

#lista {
  text-align: center;
  list-style-type: none;
  font-size: medium;
  font-size: 15px;
  line-height: 25px;
}
</style>

