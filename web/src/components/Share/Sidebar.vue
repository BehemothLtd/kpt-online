<template>
  <sidebar-menu :menu="menu" />
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Home",
          hiddenOnCollapse: true
        },
        {
          href: "/",
          title: "Home",
          icon: "fa fa-home"
        },
        {
          href: "/board",
          title: "Board",
          icon: "fa fa-th-list",
        }
      ]
    };
  }
};
</script>

<style>
</style>