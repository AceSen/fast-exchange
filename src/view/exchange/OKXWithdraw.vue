<template>
  <el-divider content-position="left">交易所配置</el-divider>
  <el-row>
    <el-col :span="2"><el-text class="mx-1">API KEY </el-text></el-col>
    <el-col :span="4"
      ><el-input v-model="apiKey" placeholder="请输入api key"
    /></el-col>

    <el-col :span="1"><el-text class="mx-1">secret</el-text></el-col>
    <el-col :span="4"
      ><el-input v-model="secret" placeholder="请输入secret"
    /></el-col>

    <el-col :span="2"><el-text class="mx-1">password</el-text></el-col>
    <el-col :span="4"
      ><el-input v-model="password" placeholder="请输入密码"
    /></el-col>

    <el-col :span="2"><el-text class="mx-1" >间隔时常(秒) :</el-text></el-col>
    <el-col :span="2"
      ><el-input v-model="timeDuration" type="number" placeholder="请输入间隔时常,默认随机系数1 - 1.5"
    /></el-col>

  </el-row>

  <el-divider content-position="left">资金分发配置</el-divider>
  <el-row>
    <el-col :span="3">
      <el-button type="primary" @click="withdraw" :disabled="disabled">资金分发</el-button>
    </el-col>
    <el-col :span="2">
      <el-tooltip
        class="box-item"
        effect="dark"
        placement="top-start"
      >
        <template #content> 
          1.确认提币网络字段准确
          <br/>
          2.确保余额充足
          <br/>
          3.间隔时间上浮0~0.5倍
        </template>
        <el-tag class="ml-2" type="danger" size="large">使用说明</el-tag>
      </el-tooltip>
    </el-col>
  </el-row>

  <el-row>
    <el-input
    v-model="textarea"
    :rows="4"
    type="textarea"
    placeholder="请严格按照该格式输入数据 : '钱包地址----币种----提币网络----金额'"
    />
  </el-row>

  <el-divider content-position="left">资金发放日志</el-divider>
  <el-col :span="24">
    <LogText :log="log"></LogText>
  </el-col>

</template>

<script>
import DateUtils from '@/utils/DateUtils';
import NumberUtils from '@/utils/NumberUtils';
import request from "../../request/okReq";
import LogText from '@/components/LogText'

export default {
  name: "OKXExchange",
  data() {
    return {
      textarea: "",
      apiKey: "",
      secret: "",
      password: "",
      timeDuration: 180,
      log: "",
      disabled: false,
      ccyList: [],
    };
  },
  components: {
    LogText,
  },
  methods: {

    /**
     * 记录日志
     * @param {*string} logMsg 
     */
    pushLog(logMsg) {
      let dateStr = DateUtils.formatDateTime(new Date());
      this.log = "[" + dateStr + "]" + "  :  " + logMsg;
    },
    
    async getDepositAddr() {
      if (!this.apiKey || !this.secret) {
        this.$message({
          showClose: true,
          message: "请填写配置信息",
          type: "error",
        });
        return;
      }
      const headers = {
        "OK-ACCESS-KEY": this.apiKey,
        "OK-ACCESS-PASSPHRASE": this.password,
      }
      await request.getDepositAddr('ETH', headers, this.secret).then(res => {
        console.log(res)
      })
    },

    async getDepositHis() {
      if (!this.apiKey || !this.secret) {
        this.$message({
          showClose: true,
          message: "请填写配置信息",
          type: "error",
        });
        return;
      }
      const headers = {
        "OK-ACCESS-KEY": this.apiKey,
        "OK-ACCESS-PASSPHRASE": this.password,
      }
      await request.getDepositHis('', headers, this.secret).then(res => {
        console.log(res)
      })

      this.getDepositAddr();
    },

    async queryCcyList() {
      if (!this.apiKey || !this.secret || !this.password) {
        this.$message({
          showClose: true,
          message: "请填写配置信息",
          type: "error",
        });
        return;
      }
      const headers = {
        "OK-ACCESS-KEY": this.apiKey,
        "OK-ACCESS-PASSPHRASE": this.password,
      }

      // 获取全部币种
      await request.getCcyList('', headers, this.secret)
      .then(res => {
        if (res && res.code == 0) {
          console.dir(res.data);
          this.ccyList = res.data;
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: "获取币种失败",
          })
          return;
        }
      })
    },

    /**
     * 提币
     */
    async withdraw() {
      if (!this.textarea || !this.apiKey || !this.secret || !this.password) {
        this.$message({
          showClose: true,
          message: "请填写配置信息",
          type: "error",
        });
        return;
      }
      this.disabled = true;
      const headers = {
        "OK-ACCESS-KEY": this.apiKey,
        "OK-ACCESS-PASSPHRASE": this.password,
      }
      // 获取账户余额
      let balances = [];
      await request.getBalance('', headers, this.secret)
      .then(res => {
        if (res && res.code == 0) {
          balances = res.data;
          console.dir(res.data);
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: "获取账户余额失败",
          })
          return;
        }    
      })

      // 获取全部币种
      let ccyList = [];
      await request.getCcyList('', headers, this.secret)
      .then(res => {
        if (res && res.code == 0) {
          console.dir(res.data);
          ccyList = res.data;
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: "获取币种失败",
          })
          return;
        }
      })

      // 余额,币种数组转换对象
      const feeSeparator = '@';
      let balanceObj = {};
      let ccyFee = {};
      balances.forEach(item => {
        balanceObj[item.ccy] = item.availBal;
      });
      ccyList.forEach(item => {
        let key = item.ccy + feeSeparator + item.chain;
        ccyFee[key] = item.minFee;
      })

      console.log(balanceObj);
      console.log(ccyFee);

      // 开始提币
      let rows = this.textarea.split('\n');
      let idx = 0;
      for (const row of rows) {
        let cells = row.split('----');
        let address = cells[0];
        let ccy = cells[1];
        let chain = cells[2];
        let amount = cells[3];

        // 自增记录
        ++idx;

        amount = (amount * NumberUtils.floatRate(0.08)).toFixed(4);
        
        let balance = balanceObj[ccy];
        let fee = ccyFee[ccy + feeSeparator + chain];

        this.pushLog(`地址:${address},提币币种:${ccy}, 提币网络:${chain}, 提币金额:${amount}`);
        
        if (balance < amount + fee) {
          // 提币超出余额
          this.pushLog(`地址:${address},余额不足,提币失败,余额:${balance}`);
          continue;
        }
        let data = {
          ccy: ccy,
          amt: amount,
          dest: 4,
          toAddr: address,
          fee: fee,
          chain: chain,
        }
        console.log(data)
        await request.withdrawal(data, headers, this.secret)
        .then(res => {
          if (res && res.code == 0) {
            console.log(res);
            this.pushLog(`地址:${address},提币成功.`);
          } else {
            this.pushLog(`地址:${address},提币失败, 错误信息:${res.msg}`);
            console.log(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.pushLog(`地址:${address},提币失败, 错误信息:${err}`);
        })

        if (idx === rows.length) {
          break;
        }

        // 睡眠等待
        let sleepSecond = Math.floor(this.timeDuration * NumberUtils.floatRate(0.5));
        this.pushLog(`等待:${sleepSecond}秒后,执行下一个地址提币......`);
        await DateUtils.sleep(sleepSecond * 1000);
      }

      this.pushLog('所有提币任务处理完毕!!!');

    },
    /**
     * 连接交易所
     */
    connectExchange() {
      if (!this.apiKey || !this.secret || !this.password) {
        this.$message({
          showClose: true,
          message: "请填写配置信息",
          type: "error",
        });
        return;
      }

      const headers = {
        "OK-ACCESS-KEY": this.apiKey,
        "OK-ACCESS-PASSPHRASE": this.password,
      }

      request.getBalance('', headers, this.secret)
      .then(res => {
        if (res && res.code == 0) {
          this.$message({
            type: "success",
            message: "连接成功",
          })
           console.dir(res.data)
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: "连接失败",
          })
          return;
        }    
      })

    },


    /**
     * 获取全部币种信息
     */
    getCcyList() {
      const headers = {
        "OK-ACCESS-KEY": this.apiKey,
        "OK-ACCESS-PASSPHRASE": this.password,
      }
      request.getCcyList('', headers, this.secret)
      .then(res => {
        if (res && res.code == 0) {
          this.$message({
            type: "success",
            message: "连接成功",
          })
        }     
        
        console.dir(res);
        console.log(res);
      })
      .catch(err => {
        console.dir(err.message);
      })
    },
  },
};
</script>
