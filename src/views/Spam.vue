<template>
    <div style="height: 100vh; display: flex; background-color: rgb(36, 37, 37); font-size: 14px;">
        <div style="background-color: #fff; border-radius: 5px; max-width: 400px; width: 100vw; margin: auto;">
            
            <div style="padding: 40px; text-align: center; flex-shrink: 0;">
                <v-btn icon color="cyan" @click="router.push('/SZm8eHzaqdaae0N82mSOFQ92fvT7GhRBJjCUDwXuKmXvSRDtLXva38DCQpwcwOWLOdVbhCqa2X2vbt4W9J9i0RdPY3fk5dT3BlbkFJtAkVToMogA5WZIkg1Ppgaae0N82mSOFQ92fvT7GhRBJjCUDwXuKmXvSRDtLXva38DCQpwcwOWLOdVbhCqa2X2vbt4W9J9i0RdPY3fk5dT3BlbkFJtAkVToMogA5WZIkg1Ppg')"><v-icon>mdi-home-export-outline</v-icon></v-btn>

                <form method="POST" style="margin-top: 24px;" @submit.prevent="handleSendSpam">
                    <v-text-field type="email" variant="outlined" label="From" color="primary" v-model="from" required></v-text-field>
                    <v-text-field type="password" variant="outlined" label="Password" color="primary" v-model="password" required></v-text-field>
                    <v-text-field type="email" variant="outlined" label="To" color="primary" v-model="to" required></v-text-field>
                    <v-text-field type="text" variant="outlined" label="Subject" color="primary" v-model="subject" required></v-text-field>
                    <v-text-field type="text" variant="outlined" label="Content" color="primary" v-model="content" required></v-text-field>
                    <v-file-input label="Upload your PDF" variant="outlined" prepend-icon="mdi-file-pdf-box"></v-file-input>

                    <v-btn color="red" size="large" class="text-none" variant="elevated" type="submit">Send</v-btn>
                </form>
                
            </div>
        </div>
    </div>
</template>

<script setup>

import router from '@/router';
import { ref } from 'vue';

const from = ref('');
const password = ref('');
const to = ref('');
const subject = ref('');
const content = ref('');

const handleSendSpam = () => {
    console.log('Spam');
}

</script>