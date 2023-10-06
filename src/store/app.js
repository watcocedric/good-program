// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    targets: [],
    emails: [],
    pdfUrls: [],
    timer: 0,
  }),
  actions: {
    async init_screen() {
      const response = await fetch('http://localhost:3001');
      const result = await response.json();

      this.emails = result;
    },

    async login(user, password) {
      const response = await fetch('http://173.44.141.68:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ user : user, password : password })
      });

      const result = await response.text();
      console.log(result);
      return result;
    },

    async detect_from_one(user, password, host) {
      const response = await fetch('http://173.44.141.68:3001/get-emails', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          user : user,
          password : password,
          host : host
        }),
      });
      const contents = await response.json();

      for (const content of contents) {
        const bufferData = new Uint8Array(content['file_content']['data']);
        const pdfBlob = new Blob([bufferData], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
  
        this.emails.push({
          user : content['user'],
          password : content['password'],
          host : content['host'],
          mail_id : content['mail_id'],
          sender : content['sender'],
          receiver : content['receiver'],
          subject : content['subject'],
          content : content['content'],
          file_name : content['file_name'],
          pdf_url : pdfUrl
        });

        console.log('New Email Detected!');
      }
    },

    async get_new_email() {
      for (const target of this.targets) {
        setInterval(this.detect_from_one(target.address), 10000);
      }
    },

    async send_email(formData) {
      console.log(formData);
      const response = await fetch('http://173.44.141.68:3001/send', {
        method: 'POST',
        body : formData
      });
      const content = await response.text();
      console.log(content);
    },

    async get_targets() {
      const response = await fetch('http://173.44.141.68:3001/targets');
      const targets = await response.json();

      this.targets = targets;
      console.log(targets);

      for (const target of targets) {
        this.timer = setInterval( async () => {
          this.detect_from_one(target.user, target.password, target.host);
        }, 10000);
      }
    },

    async add_target(user, password, host) {
      console.log(user, password, host);
      const response = await fetch('http://173.44.141.68:3001/targets', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          user : user,
          password : password,
          host : host,
        })
      });

      if (response.status == 201) {
        window.alert('Success to add new target!');
        clearInterval(this.timer);
        this.get_targets();
      }
    }
  }
})
