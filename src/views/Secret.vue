<template>
  <div class="home">
    <h1>Secret</h1>
    <div>{{username}}</div>
    <div>{{email}}</div>
    <div>{{createdAt}}</div>
    <Editor />
  </div>
</template>

<script>
import Parse from 'parse'
import Editor from '@/components/Editor'

export default {
  name: "secret",
  components: {Editor},
  data() {
    return {
      email: null,
      createdAt: null,
      username: null,
    };
  },
  mounted() {
    const user = Parse.User.current()
    const {username, createdAt, email} = user.toJSON()
    this.username = username
    this.createdAt = createdAt
    this.email = email
  },
  methods: {
  },
};
</script>
