<template>
  <div class="systemHeader">
    <div class="left"></div>
    <div class="right">
      <span>{{ desensitization(userInfo?.username) || "管理员" }}</span
      >&nbsp;&nbsp;|&nbsp;&nbsp;<span>{{
        userInfo?.deptName || "备用名称"
      }}</span
      >&nbsp;&nbsp;|&nbsp;&nbsp;
      <span class="exit" @click="exit">退出</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { USER_INfO } from '@/constants';;
// import { useRouter } from 'vue-router/composables';
import { onMounted, ref } from "vue";
// import { logout } from "@/apis/common";
import { ElMessageBox } from "element-plus";

// const router = useRouter();
// const messageCenter = ref();
// const noReadCounts = ref(0);
// const open = ref<boolean>(false);
const userInfo = ref<any>({});

// const title = ref('事项中心');

onMounted(() => {
  // @ts-ignore
  // userInfo.value = JSON.parse(window.localStorage.getItem('USER_INfO'));
  // userInfo.value.deptName = JSON.parse(window.localStorage.getItem('currentDeptMessage') || '').deptName;

  // default
  userInfo.value = {
    username: "admin",
    deptName: "部门名称",
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  };
});
// const emits = defineEmits(['open']);

// const changeMenu = () => {
//   open.value = !open.value;
//   emits('open', open.value);
// };

// const handleCommand = (command: string) => {
//   switch (command) {
//     case 'center':
//       router.push('/center');
//       break;
//     default:
//       break;
//   }
// };

// const showMessage = () => {
//   messageCenter.value.showDrawer();
// };

// const getNoReads = (count: number) => {
//   noReadCounts.value = count;
// };

// 名字脱敏
const desensitization = (str: any) => {
  if (!str || str.length == 0) {
    return "";
  }
  const dl = Math.floor(str.length * 0.6);
  let dlstr = "";
  for (let i = 0; i < dl; i++) {
    dlstr += "*";
  }
  let front = Math.floor((str.length - dl) / 2);
  if (front === 0) {
    front = 1;
  }
  return str.substr(0, front) + dlstr + str.substr(front + dl, str.length - 1);
};

const exit = async () => {
  ElMessageBox.confirm("是否确认退出?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      // let { code } = await logout();
      // if (code === 200) {
      //   window.open(`${window.location.origin}/login`, "_self");
      //   //清除缓存
      //   localStorage.clear();
      // }
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>

<style lang="scss" scoped>
.systemHeader {
  text-align: left;
  height: 72px;
  line-height: 67px;
  background-color: #fff;
  // padding: 0 20px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 6px 0 rgb(0 10 32 / 8%);

  .left {
    img {
      width: 41px;
      height: 41px;
      vertical-align: middle;
      margin-top: -13px;
      margin-right: 10px;
    }

    span {
      font-weight: 700;
      font-size: 30px;
    }
  }

  .right {
    text-align: right;
    margin-right: 20px;
    .exit {
      cursor: pointer;
    }
  }
}
</style>
