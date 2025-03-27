<template> 
<div class="pa-10">
  <v-card variant="outlined">
    <v-toolbar>
      <p class="ml-2 font-weight-bold">Roles</p>
      <v-spacer></v-spacer>
      <v-btn @click="role_form_dialog = true">Create Roles</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="items">

    </v-data-table>
  </v-card>

  <div>
    <v-card v-if="isChatOpen" class="chat-widget" width="500" style="position: fixed; bottom: 80px; left: 20px; z-index: 2000; border-radius: 10px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1)">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>SCTC BOT</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="isChatOpen = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <div class="chat-messages" style="max-height: 400px; overflow-y: auto; padding: 10px;">
          <div v-for="(message, index) in messages" :key="index" class="message" :class="{'user-message': message.role === 'user', 'bot-message': message.role === 'bot'}">

            <div>
              
             <v-icon>
              {{message.role === 'assistant' ? 'mdi-robot-excited-outline' : 'mdi-account'}}
              </v-icon> {{ message.content }}
            </div>
            {{message_loader ? 'Bot is typing...' : ''}}
          </div>
        </div>
       
      </v-card-text>
      <div class="pa-2">
        <v-text-field
          v-model="user_input"
          placeholder="Type a message..."
          @keyup.enter="sendMessage"
          clearable
          outlined
          dense
          class="mt-2"
        ></v-text-field>
      </div>
       
    </v-card>

    <div style="position: fixed; bottom: 20px; left: 20px;" class="d-print-none">
      <v-btn color="primary" size="large" fab icon class="mb-2" @click="isChatOpen = true">
        <v-icon size="30">mdi-chat-processing-outline</v-icon>
      </v-btn>
    </div>
  </div>

  <v-dialog persistent v-model="role_form_dialog" width="500">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>
          Create Role
        </v-toolbar-title>
        <v-spacer/>
        <v-icon class="mr-2" color="red">
          mdi-close
        </v-icon>
      </v-toolbar>

      <v-card-text>
        <v-form  @submit.prevent="set_role">
          <v-text-field label="Name" v-model="role_data.name"/>
          <v-text-field label="Description" v-model="role_data.description"/>
          <v-btn block type="submit">Submit Form</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

  </v-dialog>
</div>

</template>

<script setup lang="ts">

onBeforeMount(async () => {
  const response = await $fetch('http://localhost:3001/roles', {
    method: 'GET',
  })
  return items.value = response.data
})


const headers = ref([
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'description',
    title: 'Description'
  }
]) 
const items = ref([])

const role_form_dialog = ref(false)  
const role_data = ref({
  name: '',
  description: ''
})
async function set_role(){
  const {data, error} = await $fetch('http://localhost:3001/roles', {
    method: 'POST',
    body: {
      name: role_data.value.name,
      description: role_data.value.description
    }
  })
  console.log(data)
  console.log(error)
}

const isChatOpen = ref(false)

// For Chat Bot
const user_input = ref('')
const messages = ref([
  {
    content: "SCTC, or Southern Convergence Technologies Corporation, is a company specializing in creating customized, cutting-edge software products. They focus on enhancing productivity and efficiency for their clients and provide solutions tailored to meet their specific needs. The company houses a team of skilled professionals committed to delivering exceptional software solutions and firmly believe in the transformative power of technology to drive business success. They aim to empower their clients to realize their full potential.",
    type: 'bot',
    role: 'assistant'
  },
  {
    content: "SCTC, or Southern Convergence Technologies Corporation, is a company specializing in creating customized, cutting-edge software products. They focus on enhancing productivity and efficiency for their clients and provide solutions tailored to meet their specific needs. The company houses a team of skilled professionals committed to delivering exceptional software solutions and firmly believe in the transformative power of technology to drive business success. They aim to empower their clients to realize their full potential.",
    type: 'bot',
    role: 'assistant'
  }
])
const message_loader = ref(true)
async function sendMessage(){
  if (user_input.value.trim() === '') return;

  messages.value.push({ content: user_input.value, type: 'user', role: 'user' });
  const response = await $fetch('http://localhost:3001/chat', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body : {
      messages: messages.value
    }
  })
  message_loader.value = false
  messages.value.push({ content: response, type: 'bot', role: 'assistant'  });
  user_input.value = '';
}
</script>

<style scoped>
.chat-widget {
  z-index: 1000; /* Ensure the chat widget is above other elements */
}
.chat-messages {
  margin-bottom: 16px;
}
.message {
  margin: 4px 0;
}
</style>