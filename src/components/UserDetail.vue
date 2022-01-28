<template>
  <div class="userDetail">
    <div class="widget">
      <div class="user-profile">
        <div class="user-info">
          <img
            :src="user.picture.large"
            class="picture border border-dark rounded-circle"
          />
          <div id="full-name">{{ user.name.first }} {{ user.name.last }}</div>
          <div id="username">
            <strong>Username: </strong> {{ user.login.username }}
          </div>
          <div>
            <strong>Id: </strong> {{ user.id.name}} - {{ user.id.value }}
          </div>
          <div>
            <strong>Age: </strong>{{ user.dob.age }} <strong>Gender: </strong
            >{{ user.gender }}
          </div>
          <div><strong>Email: </strong> {{ user.email }}</div>
          <div>
            <strong>Street: </strong> {{ user.location.street.name }} 
            <strong>Number: </strong> {{ user.location.street.number }}
            <strong>City: </strong> {{ user.location.city }}
          </div>
          <div>
            <strong>State: </strong> {{ user.location.state }}
            <strong>Country: </strong> {{ user.location.country }}
            <strong> Postcode: </strong> {{ user.location.postcode }}
            <strong>Nationality: </strong> {{ user.nat }}
          </div>
          <div>
            <strong>Phone: </strong> {{ user.phone }} - <strong>Cell: </strong>
            {{ user.cell }} <strong>Registered for: </strong>
            {{ user.registered.age }} years
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class UserDetail extends Vue {
  @Prop() private user: any;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.picture {
  float: left;
  margin-right: 15px;
}
.userDetail {
  height: 100%;
}
.widget {
  position: sticky;
  top: 20vh;
  margin: 20px auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: $shadow;
  background: rgba(255, 255, 255, 0.8);

  .user-profile {
    padding: 14px;

  .user-info {
    margin-left: 1rem;
    line-height: 200%;
    }
  }

  #full-name {
    font-weight: bold;
    text-transform: capitalize;
  }

  #username {
    margin-bottom: 1rem;
  }
}
</style>
