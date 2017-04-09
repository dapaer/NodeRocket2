const sio = require('socket.io');
const io:any = null;
class SocketUtil{
    private static io; 
    static init(io){
        SocketUtil.io = io;
    }
    //获取io，将控制权转移
    static getIO(){
        if(!io){
            throw `io has not init`;
        }
        return SocketUtil.io;
    }
}

module.exports = SocketUtil;