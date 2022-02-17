<template>
  <div>
    <div>
      投稿者名：<input type="text" v-model="articleName" /><br />
      投稿内容：<textarea
        cols="30"
        rows="10"
        v-model="articleContent"
      ></textarea
      ><br />
      <button type="button" @click="addArticle">記事投稿</button>
      <hr />
    </div>
    <!-- ここから記事一覧 -->
    <div v-for="article of currentArticleList" :key="article.id">
      投稿者名：{{ article.name }} <br />
      投稿内容：{{ article.content }} <br />
      <delete-article
        @delete-article="updateArticles"
        :article-id="article.id"
      ></delete-article>
      <!-- ここからコメント一覧 -->
      <div v-for="comment of article.commentList" :key="comment.id">
        コメント者名：{{ comment.name }} <br />
        コメント内容：{{ comment.content }}
      </div>
      <!-- ここからコメント投稿 -->
      <post-comment
        @add-comment="updateArticles"
        :article-id="article.id"
      ></post-comment>
    </div>
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Component, Vue } from "vue-property-decorator";
import postComment from "@/components/postComment.vue";
import deleteArticle from "@/components/deleteArticle.vue";
import axios from "axios";

@Component({
  components: {
    postComment,
    deleteArticle,
  },
})
export default class XXXComponent extends Vue {
  private currentArticleList = new Array<Article>();
  private articleName = "";
  private articleContent = "";

  async created(): Promise<void> {
    this.updateArticles();
  }

  async addArticle(): Promise<void> {
    await axios.post("http://153.127.48.168:8080/ex-bbs-api/bbs/article", {
      name: this.articleName,
      content: this.articleContent,
    });
    this.updateArticles();
  }

  async updateArticles(): Promise<void> {
    await this.$store.dispatch("getArticles");
    this.currentArticleList = this.$store.getters.gerArticles;
  }
}
</script>

<style scoped></style>
