<template>
  <v-main style="height: 100vh; max-width: 100vw; padding: 3%; background-color: #212121; overflow-y: scroll;">
    <div style="display: flex; justify-content: space-between;">
      <v-btn icon color="cyan" style="display: inline;" @click="router.push('/spam')"><v-icon>mdi-email-plus-outline</v-icon></v-btn>
      <h1 style="color: white; text-align: center; margin-bottom: 20px;">Good Program</h1>
      <div></div>
    </div>
    
    <v-table theme="dark">
      <thead>
        <tr>
          <th class="text-left" style="color: aquamarine;">
            ID
          </th>
          <th class="text-left" style="color: aquamarine;">
            From
          </th>
          <th class="text-left" style="color: aquamarine;">
            To
          </th>
          <th class="text-left" style="color: aquamarine;">
            Subject
          </th>
          <th class="text-left" style="color: aquamarine;">
            Attachment
          </th>
          <th class="text-left" style="color: aquamarine;">
            Upload New File
          </th>
          <th class="text-left" style="color: aquamarine;">
            Send
          </th>
        </tr>
      </thead>
      <tbody>
        <each-email 
          v-for="item in appStore.emails"
          :item = item
          :user = "item.user"
          :password = "item.password"
          :host = "item.host"
          :mail_id="item.mail_id"
          :sender="item.sender" 
          :receiver="item.receiver" 
          :subject="item.subject"
          :content="item.content"
          :pdfUrl="item.pdf_url" 
          :fileName="item.file_name" />
      </tbody>
    </v-table>


    <v-dialog
      v-model="isOpened"
      width="500"
    >
      <template v-slot:activator="{ props }">
        <v-layout-item model-value position="bottom" class="text-end" size="88">
          <div class="ma-4">
              <v-btn icon="mdi-plus" size="large" color="pink" elevation="8" v-bind="props" />
          </div>
        </v-layout-item>
      </template>

      <v-card color="black">
        <v-card-title>
          <span class="text-h5"><b>User Profile</b></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              label="Email"
              v-model = "user"
              variant="outlined"
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model = "password"
              variant="outlined"
              required
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="isOpened = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="handleAddTarget"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-main>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { useAppStore } from '../store/app'
import EachEmail from './EachEmail.vue';
import router from '@/router';

const appStore = useAppStore();
const isOpened = ref(false);
const user = ref('');
const password = ref('');

onMounted( async () => {
  appStore.init_screen();
  appStore.get_targets();
  // appStore.get_new_email();
})

const findHost = (user) => {
  if (user.includes('@web.de')) {
    return 'imap.web.de';
  } else if (user.includes('@gmx.de') || user.includes('@gmx.net')) {
    return 'imap.gmx.net';
  } else if (user.includes('@t-online.de')) {
    return 'secureimap.t-online.de';
  }
}

const handleAddTarget = () => {
  if (user.value && password.value) {
    isOpened.value = false;
    console.log(user.value, password.value);
    const host = findHost(user.value);
    if (host) {
      appStore.add_target(user.value, password.value, host);
    }

    user.value = '', password.value = '';
  }
};

</script>

<style scoped>

tbody > tr:hover {
  /* background-color: white; */
  color: bisque;
  cursor: default;
}

</style>