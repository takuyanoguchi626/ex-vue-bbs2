<template>
  <div>
    <button type="button" @click="deleteArticle">記事削除</button>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Emit, Prop, Component, Vue } from "vue-property-decorator";
@Component
export default class deleteArticle extends Vue {
  @Prop()
  //記事ID
  private articleId!: number;

  @Emit()
  async deleteArticle(): Promise<void> {
    await axios.delete(
      "http://153.127.48.168:8080/ex-bbs-api/bbs/article/" + this.articleId
    );
  }
}
</script>

<style scoped></style>
