<template>
  <v-app>
    <v-app-bar
      fixed
      elevate-on-scroll
      color="white"
      scroll-target="#scrolling-techniques-7"
    >
      <HelloWorld></HelloWorld>

      <router-link to="/" class="title">
        <v-toolbar-title
          ><v-icon large="true" color="rgb(255, 19, 19)">mdi-youtube</v-icon>
          NicoTube</v-toolbar-title
        >
      </router-link>

      <v-spacer> </v-spacer>

      <v-text-field
        class="text"
        id="searchTextId"
        v-model="searchText"
        hide-details
        single-line
        outlined
      ></v-text-field>

      <v-btn depressed v-on:click="search_video()">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-spacer> </v-spacer>
    </v-app-bar>

    <div class="maincontent">
      <v-container>
        <v-row>
          <v-col sm="8">
            <iframe
              width="100%"
              height="440"
              style="border: none"
              allowfullscreen="allowfullscreen"
              allow="autoplay"
              :src="
                'https://embed.nicovideo.jp/watch/' +
                $route.params.id +
                '?oldScript=1&referer=&from=0&allowProgrammaticFullScreen=1'
              "
            ></iframe>
            <p class="text-h6 mt-2">{{ videoTitle }}</p>
            <v-divider></v-divider>

            <v-row class="mb-1 mt-3">
              <v-col sm="1">
                <v-avatar size="60">
                  <img :src="userIconImage" :alt="channelTitle" />
                </v-avatar>
              </v-col>
              <v-col sm="10" class="ml-5">
                <p class="mt-4 font-weight-medium channelTitle">
                  {{ channelTitle }}
                </p>
                <p class="mt-1">{{ videoDescription }}</p>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </v-col>
          <v-col sm="4">
            <div v-for="article in articles" :key="article.contentId">
              <v-row>
                <v-col sm="7">
                  <router-link :to="'/video/' + article.contentId">
                    <figure>
                      <img
                        width="100%"
                        height="115"
                        :src="article.thumbnailUrl"
                        @click="$vuetify.goTo(0)"
                      />
                    </figure>
                  </router-link>
                </v-col>
                <v-col sm="5">
                  <p v-if="article.title.length < 35">
                    {{ article.title }}
                  </p>
                  <p v-else>
                    {{ article.title.substring(0, 35) + "..." }}
                  </p>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "Video",
  data: () => ({
    articles: [],
    vlist: [],
    videoTitle: String,
    videoDescription: String,
    userIconImage: String,
    channelTitle: String,
    error: String,
  }),
  components: {
    HelloWorld,
  },
  async mounted() {
    this.$vuetify.goTo(0);
    // 記事を取得する
    this.articles = JSON.parse(localStorage.getItem("videolist"));
    console.log(JSON.parse(localStorage.getItem("videolist")));
    //
    const JSONDATA = JSON.parse(localStorage.getItem("videolist"));
    const getFruitById = (id) => {
      const fruitIndex = JSONDATA.findIndex((data) => data.contentId === id);
      return JSONDATA[fruitIndex];
    };

    console.log(this.$route.params.id);
    const nowVideo = getFruitById(this.$route.params.id);
    console.log(nowVideo); // display title
    console.log("タイトル", nowVideo.title);
    this.videoTitle = nowVideo.title;
    this.videoDescription = nowVideo.description.replace(
      /<("[^"]*"|'[^']*'|[^'">])*>/g,
      ""
    );
    // ---
    const response = await axios
      .get(
        process.env.VUE_APP_API_BASEURL +
          "/niconicoUserinfo?userId=" +
          nowVideo.userId
      )
      .catch((error) => {
        //window.alert("取得に失敗しました。\n" + error);
        console.log(error);
      });
    console.log("152", response.data.niconico_response.user);
    const userinfo = response.data.niconico_response.user;
    this.userIconImage = userinfo.thumbnail_url;
    this.channelTitle = userinfo.nickname;
  },
  methods: {
    search_video: function () {
      //console.log('検索！！');
      const ta3 = document.getElementById("searchTextId").value;
      console.log(ta3);
      this.$router.push("/?q=" + ta3);
    },
  },
  watch: {
    async $route(to) {
      //遷移先のpathを取得

      console.log("watch : " + to.path);
      console.log("watch :" + this.$route.params.id);
      //
      const JSONDATA = JSON.parse(localStorage.getItem("videolist"));
      const getFruitById = (id) => {
        const fruitIndex = JSONDATA.findIndex((data) => data.contentId === id);
        return JSONDATA[fruitIndex];
      };

      console.log(this.$route.params.id);
      const nowVideo = getFruitById(this.$route.params.id);
      console.log(nowVideo); // display title
      console.log("タイトル", nowVideo.title);
      this.videoTitle = nowVideo.title;
      this.videoDescription = nowVideo.description.replace(
        /<("[^"]*"|'[^']*'|[^'">])*>/g,
        ""
      );

      // ---
      const response = await axios
        .get(
          process.env.VUE_APP_API_BASEURL +
            "/niconicoUserinfo?userId=" +
            nowVideo.userId
        )
        .catch((error) => {
          //window.alert("取得に失敗しました。\n" + error);
          console.log(error);
        });
      console.log("152", response.data.niconico_response.user);
      const userinfo = response.data.niconico_response.user;
      this.userIconImage = userinfo.thumbnail_url;
      this.channelTitle = userinfo.nickname;

      this.detectPath(to.path);
    },
  },
};
</script>

<style scoped>
.maincontent {
  padding-top: 70px;
  background-color: rgb(245, 245, 245);
}
.leftcontent {
  margin-right: 15px;
}
.card {
  margin: 4px;
}
.errormsg {
  margin-right: 30px;
}
.title {
  text-decoration: none;
  color: black;
}
.channelTitle {
  font-size: 20px;
}

figure {
  margin: 0;
  padding: 0;
  background: rgb(245, 245, 245);
  overflow: hidden;
}

figure img {
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
}
figure:hover img {
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
}
</style>
