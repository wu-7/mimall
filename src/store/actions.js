export default {
  saveUserName(content,userName){
    content.commit('saveUserName',userName)
  },
  saveCartCnt(content,cartCnt){
    content.commit('saveCartCnt',cartCnt)
  }
}