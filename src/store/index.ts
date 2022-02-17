import { Article } from "@/types/article";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  state: {
    articles: Array<Article>(),
  }, //end state

  actions: {
    async getArticles(content): Promise<void> {
      const response = await axios.get(
        "http://153.127.48.168:8080/ex-bbs-api/bbs/articles"
      );
      console.dir(JSON.stringify(response));
      const payload = response.data;
      content.commit("getArticles", payload);
    },
  }, //end actions

  mutations: {
    getArticles(state, payload) {
      state.articles = payload.articles;
      console.dir(JSON.stringify(state.articles));
    },
  }, //end mutations

  getters: {
    gerArticles(state): Array<Article> {
      return state.articles;
    },
  }, //end getters

  modules: {}, //end modules
});
