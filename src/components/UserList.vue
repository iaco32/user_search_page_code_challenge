<template>
  <div class="container">
    <div class="row">
      <div class="col-md-5">
        <div class="search hstack gap-2 mb-4 sticky-top">
          <input
            class="form-control mt-4"
            type="text"
            v-model="searchKey"
            placeholder="Search (Lower Case)..."
            aria-label="Search (Lower Case)..."
          />
          <button
            type="button"
            class="btn btn-primary col-md-3 mt-4"
            @click="getUsers"
          >
            Refresh
          </button>
        </div>

        <div v-if="spinner">
          <div class="d-flex justify-content-center">
            <div id="loader"></div>
          </div>
        </div>
        <div v-else>
          <div
            v-for="(person, index) in filteredResources"
            :key="index"
            class="row row-cols-2 my-4 d-flex justify-content-center"
          >
            <div class="col-md-auto">
              <img
                :src="person.picture.thumbnail"
                :alt="person.name.first + ' ' + person.name.last"
                class="border border-dark rounded-circle cursor-pointer"
                @click="getUserDetails(person)"
              />
            </div>
            <div class="col-md-6">
              <div class="user-info">
                {{ person.name.first }}
                {{ person.name.last }}
              </div>
              <div class="fst-italic">
                <a :href="'mailto:' + person.email">{{ person.email }}</a>
              </div>
            </div>
          </div>
          <div class="scrollTop" v-if="showScrollTopButton()">
            <button type="button" class="btn btn-danger" @click="goToTop">
              Scroll to Top
            </button>
          </div>
        </div>
      </div>
      <div v-if="!spinner && userDetail.gender" class="col-md-6">
        <UserDetail :user="userDetail" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import UserDetail from "@/components/UserDetail.vue";

@Component({
  name: "UserList",
  components: {
    UserDetail,
  },
})
export default class UserList extends Vue {
  // default api call
  private results = 25;
  private apiCall = "https://randomuser.me/api/?results=" + this.results;
  private searchKey = "";
  private users: Array<Record<string, unknown>> = [];
  private spinner = false; // boolean variable used to show loading css animation while fetching data
  private userDetail = {};
  // computed property
  get filteredResources(): Array<Record<string, unknown>> {
    if (this.searchKey) {
      return this.users.filter(
        (item: any) =>
          item.name.first.toLowerCase().startsWith(this.searchKey) ||
          item.name.last.toLowerCase().startsWith(this.searchKey) ||
          item.gender === this.searchKey
      );
    } else {
      return this.users;
    }
  }
  // functions to add a Scroll to Top button at the bottom of the page
  public showScrollTopButton(): boolean {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      return true;
    }
    return false;
  }

  public goToTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // Api call that returns a message if the API service is offline or there are server issues
  public async getUsers() {
    try{
    this.spinner = true;
    const response = await axios.get(this.apiCall);
    this.users = response.data.results;
    this.spinner = false;
    } catch(error) {
      alert("There was an error while receiving data!");
        this.spinner = false;
    }

  }

  // This function passes data props to the UserDetail component
  public getUserDetails(object: Record<string, unknown>) {
    this.userDetail = object;
  }

  /**
   * this function implements the infinite scroll and adds new 25 users at once
   * window.innerHeight: the number of pixels for the height of the screen;
   * window.scrollY: returns the number of pixels that the document is currently scrolled vertically.
   * document.documentElement.offsetHeight: the amount of pixels for the entire height of the document element;
   * if window.innerHeight + window.scrollY is greater than document.documentElement.offsetHeight, the end of the page has been reached and the endOfPage variable is true
   */
  public addNewResults(): void {
    let endOfPage =
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight;

    if (endOfPage) {
      axios.get(this.apiCall).then((response) => {
        // new way with ECMAScript 6 spread operator
        this.users.push(...response.data.results);
        // old way ECMAScript 5 concat() method
        // this.users = this.users.concat(response.data.results);
      });
    }
  }

  created(): void {
    this.getUsers();
  }
  // event listener for scrolling
  mounted(): void {
    window.addEventListener("scroll", this.addNewResults);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

.search {
  background: white;
}

.cursor-pointer {
  cursor: pointer;
}
.user-info {
  font-weight: bold;
  text-transform: capitalize;
}

.scrollTop {
  position: fixed;
  bottom: 20px;
  right: 50px;
  z-index: 99;
}

// loader animation section
#loader {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50px;
  width: 50px;
  margin: -25px 0 0 -25px;
  border: 5px solid transparent;
  border-top-color: #000000;
  border-bottom-color: #000000;
  border-radius: 50%;
  -webkit-animation: animateLoader 0.5s linear infinite;
  animation: animateLoader 0.5s linear infinite;
}
#loader:after {
  content: "";
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  border: 5px solid transparent;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  -webkit-animation: animateLoader_after 1s linear infinite;
  animation: animateLoader_after 1s linear infinite;
}

@keyframes animateLoader {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes animateLoader_after {
  0% {
    border-top: 5px solid #000000;
    border-bottom: 5px solid #000000;
  }
  50% {
    border-top: 5px solid rgba(0, 0, 0, 0.25);
    border-bottom: 5px solid rgba(0, 0, 0, 0.25);
  }
  100% {
    border-top: 5px solid #000000;
    border-bottom: 5px solid #000000;
  }
}

@-webkit-keyframes animateLoader {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes animateLoader_after {
  0% {
    border-top: 5px solid #000000;
    border-bottom: 5px solid #000000;
  }
  50% {
    border-top: 5px solid rgba(0, 0, 0, 0.25);
    border-bottom: 5px solid rgba(0, 0, 0, 0.25);
  }
  100% {
    border-top: 5px solid #000000;
    border-bottom: 5px solid #000000;
  }
}
</style>
