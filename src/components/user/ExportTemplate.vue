<template>
  <el-button size="small" type="primary" @click="exportTemplate" icon="el-icon-download">
    {{$t('main.download')}}
  </el-button>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
     // 导出模板（多 Sheet 表）
    exportTemplate() {
      let templateData = [
        // sheet 1
        {
          tHeader: [
            'id', 'username', 'password', 'phone', 'avatar', 'gender', 'email', 'age', 'registerTime', 'isAdmin', 'blacklist'
          ],
          filterVal: [],
          data: [],
          sheetName: '导出模板'
        },
        // sheet2
        {
          // 表头
          tHeader: [
            '用户ID', '用户名', '密码', '手机号', '头像', '性别', '邮箱', '年龄', '注册时间', '权限', '状态'
          ],
          // 属性
          filterVal: [
            'id', 'username', 'password', 'phone', 'avatar', 'gender', 'email', 'age', 'registerTime', 'isAdmin', 'blacklist'
          ],
          data: [
            {
              id:'id是用户id, 可不填，自动生成。', 
              username: 'username为必填用户名。', 
              password: 'password为用户密码必填。',
              phone: '用户手机号: 正确的手机格式',
              avatar: 'avater为用户头像url。', 
              gender: 'gender为用户性别（1男、0女）。', 
              email: '用户的邮箱(规范的邮箱格式)',
              age: '用户年龄 0 - 150 之间', 
              registerTime: 'registerTime为注册时间。', 
              isAdmin: 'isAdmin为是否管理员（1是、0否）',
              blacklist: '是否为黑名单（1是、0否）',
            }
            ],
          sheetName: '导入说明'
        }
      ]
      // 调用方法（导出数据, 文件名, 宽度自动, 文件后缀）
      this.json2excel(templateData, '用户模板', true, 'xlsx');
    },
    // tableJson 导出数据 ; filenames导出表的名字; autowidth表格宽度自动 true or false; bookTypes xlsx & csv & txt
    json2excel (tableJson, filenames, autoWidth, bookTypes) {
      var that = this
      //这个是引用插件
      import("@/excel/Export2Excel.js").then(excel => {
        var tHeader = []
        var dataArr = []
        var sheetnames = []
        for (var i in tableJson) {
          tHeader.push(tableJson[i].tHeader)
          dataArr.push(that.formatJson(tableJson[i].filterVal, tableJson[i].data))
          sheetnames.push(tableJson[i].sheetName)
        }
        excel.export_json_to_multiSheet({
          header: tHeader,
          data: dataArr,
          sheetname: sheetnames,
          filename: filenames,
          autoWidth: autoWidth,
          bookType: bookTypes
        });
      });
    },
    // 格式化 json 数据
    formatJson(filterVal, jsonData) {
      // console.log(jsonData);
      // v[j] 获取 jsonData 每个属性(键)对应的值，返回每个 v 为一个对象, 包含每个键值对
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
  }
}
</script>

<style>

</style>