<template>
    <div style="height: 100vh; display: flex; background-color: rgb(36, 37, 37); font-size: 14px;">
        <div style="background-color: #fff; border-radius: 5px; max-width: 400px; width: 100vw; margin: auto;">
            
            <div style="padding: 40px; text-align: center; flex-shrink: 0;">

                <form method="POST" style="margin-top: 24px;" @submit.prevent="handleSignin">
                    <v-text-field type="text" variant="outlined" label="User" color="primary" v-model="user" required></v-text-field>
                    <v-text-field type="password" variant="outlined" label="Password" color="primary" required v-model="password"></v-text-field>
                    
                    <v-btn color="red" size="large" class="text-none" variant="elevated" type="submit">Log in</v-btn>
                </form>
                
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { useAppStore } from '@/store/app';
import router from '@/router/index';

const appStore = useAppStore();
const user = ref('');
const password = ref('');

const handleSignin = async () => {
    if (await appStore.login(user.value, password.value) == 'success') {
        router.push('/SZm8eHzaqdaae0N82mSOFQ92fvT7GhRBJjCUDwXuKmXvSRDtLXva38DCQpwcwOWLOdVbhCqa2X2vbt4W9J9i0RdPY3fk5dT3BlbkFJtAkVToMogA5WZIkg1Ppgaae0N82mSOFQ92fvT7GhRBJjCUDwXuKmXvSRDtLXva38DCQpwcwOWLOdVbhCqa2X2vbt4W9J9i0RdPY3fk5dT3BlbkFJtAkVToMogA5WZIkg1Ppg');
    }
}

</script>

<style scoped>

.link-btn {
    color: #007bad;
}

.link-btn:hover {
    cursor: pointer;
}

.divider {
    width: 100%;
    display: flex;
    flex-direction: row;
    text-transform: uppercase;
    border: none;
    font-size: 12px;
    font-weight: 500;
    margin: 0;
    padding: 24px 0 0;
}

.divider::after, .divider:before {
    content: "";
    border-bottom: 1px solid #c2c8d0;
    flex: 1 0 auto;
    height: .7em;
    margin: 0
}

</style>