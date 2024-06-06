import store from '@/store'

var websock;
function initWebSocket(regionId) {
    const wsuri = `ws://140.249.209.176:8084/LightningDetection/webSocketService?userId=${regionId}`;
    websock = new WebSocket(wsuri)
    //初始化websocket
    websock.onmessage = function (event) {
        /* alert(event.data) */
        if (event.data == '1') {
            store.commit('app/REFRESH', true)
        } else if (event.data == '2') {
            store.commit('app/REFRESH2', true)
        } else if (event.data == '3') {
            setTimeout(() => {
                store.commit('app/REFRESH3', false)
            }, 6000);
        }else if(event.data == '4'){
            store.commit('app/REFRESH4', true)
        }
    };
    websock.onopen = websocketonopen;
    websock.onerror = websocketonerror;
    websock.onclose = websocketclose;
}
function websocketonopen() {
   
}
function websocketonerror() {
    //连接建立失败重连
    this.initWebSocket();
    console.log('失败重连')
}

function websocketsend(Data) {
    //数据发送
    websock.send(JSON.stringify(Data));
}
function websocketclose(e) {
    //关闭
    /* console.log('关闭') */
}
export { initWebSocket, websocketonopen, websocketonerror, websocketsend, websocketclose }