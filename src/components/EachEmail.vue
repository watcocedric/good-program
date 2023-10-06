<template>
    <tr>
        <td>{{ mail_id }}</td>
        <td>{{ sender }}</td>
        <td>{{ receiver }}</td>
        <td>{{ subject }}</td>
        <td> <v-btn variant="outlined" @click="handleOpenFile"> {{ fileName }} </v-btn></td>
        <td> <input type="file" @change="handleFileChange" > </td>
        <td> <v-btn icon @click="handleSendEmail" :disabled="!newFile"><v-icon>mdi-send</v-icon></v-btn> </td>
    </tr>
</template>

<script setup>

import { defineProps, toRefs, ref } from 'vue';
import { useAppStore } from '@/store/app';

const props = defineProps({
    item : Object,
    user : String,
    password : String,
    host : String,
    mail_id : Number,
    sender : String,
    receiver : String,
    subject : String,
    content : String,
    fileName : String,
    pdfUrl : String,
});

const { item, user, password, host, mail_id, sender, receiver, subject, content, fileName, pdfUrl } = toRefs(props);

console.log(item.value)

const appStore = useAppStore();
const newFile = ref(null);

const handleSendEmail = async () => {
    const formData = new FormData();
    formData.append('user', user.value);
    formData.append('password', password.value);
    formData.append('host', host.value);
    formData.append('mail_id', mail_id.value);
    formData.append('sender', sender.value);
    formData.append('receiver', receiver.value);
    formData.append('subject', subject.value);
    formData.append('content', content.value);
    formData.append('fileName', fileName.value);
    formData.append('attachment', newFile.value);

    appStore.send_email(formData);
}

const handleOpenFile = () => {
  window.open(pdfUrl.value, '_blank')
}

const handleFileChange = (event) => {
    newFile.value = event.target.files[0];
    console.log(newFile.value);
}

</script>