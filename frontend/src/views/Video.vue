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
          ><v-icon large="true" color="rgb(255, 19, 19)"
            >mdi-television-classic</v-icon
          >
          <span v-show="$vuetify.breakpoint.smAndUp" class="ml-2"
            >NicoTube</span
          ></v-toolbar-title
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
        dense
      ></v-text-field>

      <v-btn depressed v-on:click="search_video()">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-spacer> </v-spacer>
    </v-app-bar>

    <div class="maincontent">
      <v-container>
        <v-row>
          <v-col sm="8" cols="12" xs="12">
            <iframe
              width="100%"
              :height="$vuetify.breakpoint.smAndDown ? 220 : 440"
              style="border: none"
              allowfullscreen="allowfullscreen"
              allow="autoplay"
              :src="
                'https://embed.nicovideo.jp/watch/' +
                $route.params.id +
                '?oldScript=1&referer=&from=0&allowProgrammaticFullScreen=1'
              "
            ></iframe>
            <p
              :class="
                $vuetify.breakpoint.smAndDown ? 'text-h6 mt-2' : 'text-h6 mt-2'
              "
            >
              {{ videoTitle }}
            </p>

            <v-row>
              <v-col sm="6" cols="12" xs="12">
                <p
                  :class="
                    $vuetify.breakpoint.smAndDown
                      ? 'mb-0 pb-0 body-2'
                      : 'mb-0 pb-0'
                  "
                >
                  {{ viewCounter }}回視聴・{{ startTime }}
                </p>
              </v-col>

              <v-col
                sm="6"
                :class="$vuetify.breakpoint.smAndDown ? 'mt-0' : 'mt-3'"
                cols="12"
                xs="12"
              >
                <v-row justify="center">
                  <p
                    :class="
                      $vuetify.breakpoint.smAndDown
                        ? 'mr-1 text-h6'
                        : 'ml-0 mr-2 text-h6'
                    "
                  >
                    <v-icon color="primary" class="goodbtn">mdi-comment</v-icon
                    ><span
                      :class="
                        $vuetify.breakpoint.smAndDown
                          ? 'ml-1 font-weight-medium likeCounterNumber primary--text'
                          : 'ml-2 font-weight-medium likeCounterNumber primary--text'
                      "
                      >{{ commentCounter }}</span
                    >
                  </p>

                  <p
                    :class="
                      $vuetify.breakpoint.smAndDown
                        ? 'ml-1 mr-1 text-h6'
                        : 'ml-2 mr-2 text-h6'
                    "
                  >
                    <v-icon color="primary" class="goodbtn"
                      >mdi-playlist-music</v-icon
                    ><span
                      :class="
                        $vuetify.breakpoint.smAndDown
                          ? 'ml-1 font-weight-medium likeCounterNumber primary--text'
                          : 'ml-2 font-weight-medium likeCounterNumber primary--text'
                      "
                      >{{ mylistCounter }}</span
                    >
                  </p>

                  <p
                    :class="
                      $vuetify.breakpoint.smAndDown
                        ? 'ml-1 text-h6'
                        : 'ml-2 text-h6'
                    "
                  >
                    <v-icon color="primary" class="goodbtn">mdi-thumb-up</v-icon
                    ><span
                      :class="
                        $vuetify.breakpoint.smAndDown
                          ? 'ml-0 font-weight-medium likeCounterNumber primary--text'
                          : 'ml-2 font-weight-medium likeCounterNumber primary--text'
                      "
                      >{{ likeCounter }}</span
                    >
                  </p>
                </v-row>
              </v-col>
            </v-row>

            <v-divider></v-divider>
            <v-row :align="align" no-gutters class="mt-6 mb-3">
              <v-col cols="1">
                <v-avatar :size="$vuetify.breakpoint.smAndDown ? '40' : '60'">
                  <img :src="userIconImage" :alt="channelTitle" />
                </v-avatar>
              </v-col>
              <v-col
                cols="9"
                :class="$vuetify.breakpoint.smAndDown ? 'ml-6' : 'ml-4'"
              >
                <p
                  :class="
                    $vuetify.breakpoint.smAndDown
                      ? 'mt-2'
                      : 'mt-4 font-weight-medium channelTitle'
                  "
                >
                  {{ channelTitle }}
                </p>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col v-show="$vuetify.breakpoint.smAndUp" cols="1"></v-col>
              <v-col
                :cols="$vuetify.breakpoint.smAndDown ? '12' : ''"
                :class="
                  $vuetify.breakpoint.smAndDown ? 'ml-0 mt-0 pt-0' : 'ml-4'
                "
              >
                <p
                  :class="$vuetify.breakpoint.smAndDown ? 'mb-4' : 'mb-7'"
                  v-html="videoDescription"
                ></p>
                <v-divider></v-divider>
                <v-chip class="mt-6" :ripple="false" medium>
                  <v-icon left> mdi-label-multiple </v-icon>
                  {{ genre }}
                </v-chip>
                <br />
                <div class="justify-start mt-5 mb-5 tags" flat tile>
                  <v-chip
                    :ripple="false"
                    v-for="tag in tags"
                    :key="tag"
                    class="mb-2 mr-2"
                    small
                  >
                    <v-icon left> mdi-tag </v-icon>
                    {{ tag }}
                  </v-chip>
                </div>
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

function dateFomate(date) {
  console.log("date", date);
  const D = new Date(date);
  console.log("D", D);
  const y = D.getFullYear();
  const month = ("00" + (D.getMonth() + 1)).slice(-2);
  const d = ("00" + D.getDate()).slice(-2);

  const updatedAt = y + "/" + month + "/" + d;
  return updatedAt;
}
function genreNullcheck(genre) {
  if (genre == null) {
    genre = "ジャンル未設定";
  }
  return genre;
}

export default {
  name: "Video",
  data: () => ({
    articles: [],
    vlist: [],
    videoTitle: String,
    videoDescription: String,
    genre: String,
    tags: [],
    userIconImage: String,
    channelTitle: String,
    viewCounter: String,
    likeCounter: String,
    mylistCounter: String,
    commentCounter: String,
    startTime: String,
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
    this.videoDescription = nowVideo.description;
    // 動画のジャンル
    this.genre = genreNullcheck(nowVideo.genre);
    this.tags = nowVideo.tags.split(" ");

    this.likeCounter = nowVideo.likeCounter.toLocaleString();
    this.commentCounter = nowVideo.commentCounter.toLocaleString();
    this.mylistCounter = nowVideo.mylistCounter.toLocaleString();

    this.viewCounter = nowVideo.viewCounter.toLocaleString();
    this.startTime = dateFomate(nowVideo.startTime);
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
      this.videoDescription = nowVideo.description;
      // 動画のジャンル
      this.genre = genreNullcheck(nowVideo.genre);
      this.tags = nowVideo.tags.split(" ");

      this.likeCounter = nowVideo.likeCounter.toLocaleString();
      this.commentCounter = nowVideo.commentCounter.toLocaleString();
      this.mylistCounter = nowVideo.mylistCounter.toLocaleString();

      this.viewCounter = nowVideo.viewCounter.toLocaleString();
      this.startTime = dateFomate(nowVideo.startTime);

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
  font-size: 18px;
}
.goodbtn {
  display: inline-flex;
  vertical-align: middle;
}
.tags {
  display: inline-block;
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
