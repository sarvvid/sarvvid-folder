import{NativeModules}from"react-native";
const{RNReactNativePing:RNReactNativePing}=NativeModules;
class Ping{
    static async start(t,a){
        return await RNReactNativePing.start(t,a)}
    static async getTrafficStats(){
        return await RNReactNativePing.getTrafficStats()
    }
}
export default Ping;