<template>
  <v-navigation-drawer permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">站点管理 </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item-group mandatory color="green darken-3">
        <v-list-item
          v-for="(item, index) in links"
          :key="index"
          :to="item.to"
          :exact="true"
        >
          <v-list-item-content v-text="item.name"></v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AdminNav',
  data() {
    return {
      links: [
        { name: '首页', to: '/admin' },
        { name: '文章', to: '/admin/articles' },
        { name: '分类', to: '/admin/categories' },
        { name: '图片', to: '/admin/images' },
        { name: '用户', to: '/admin/users' },
      ],
    }
  },
}
</script>
