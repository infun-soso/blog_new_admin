const ipUrl = 'http://127.0.0.1:7001/admin/'

const servicePath = {
  checkLogin: ipUrl + 'checkOpenId',
  getTypeInfo: ipUrl + 'getTypeInfo',
  saveArticle: ipUrl + 'addArticle',
  updateArticle: ipUrl + 'updateArticle',
  getArticleList: ipUrl + 'getArticleList',
  delArticle: ipUrl + 'delArticle/',
  getArticleById: ipUrl + 'getArticleById/',
  signUp: ipUrl + 'signUp',
  getUserList: ipUrl + 'getUserList',
  getUploadToken: ipUrl + 'getUploadToken',
}

export default servicePath