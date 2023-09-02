<template>
    <div class="logTextContainer">
        <p v-for="(log, index) in logList" :key="index" class="logText">{{ log }}</p>
    </div>
</template>

<script>

export default {
    name:"LogText",
    data() {
        return {
            logList:[],
        }
    },
    props: ['log'],
    watch: {
        log: {
            immediate: true,
            handler (newValue) {
                this.logList.push(newValue);
                console.log(newValue)
            },
        }
    },
}

</script>

<style>

.logTextContainer {
    border-style: solid;
    border-width: thin;
    overflow:auto;
    height:250px;
    padding: 15px;
}

.logText {
    text-align: left;
    font-size: 16px;
    font-weight: normal;
    color: #848c8a;
    margin: 5px 0;
}

</style>