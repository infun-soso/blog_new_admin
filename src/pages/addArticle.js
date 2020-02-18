import React, {useState, useEffect} from 'react';
import marked from 'marked';
import '../static/css/addArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import servicePath from '../config/apiUrl';

const { Option } = Select;
const { TextArea } = Input;

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
}); 

function AddArticle(props) {

  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(2) //选择的文章类别

  const changeContent = (e)=>{
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e)=>{
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  useEffect(() => {
    const getTypeInfo = () => {
      axios({
        method: 'get',
        url: servicePath.getTypeInfo,
        header: {
          'Access-Control-Allow-Origin':'*'
        },
        withCredentials: true
      }).then(
        res => {
          console.log(res)
          if (res.data.data === "没有登录") {
            localStorage.removeItem('openId')
            props.history.push('/login')  
          } else {
            setTypeInfo(res.data.data)
          }
        }
      )
    }
    getTypeInfo()
  }, [props.history])
  
  const selectedTypeHandler = (value) => {
    setSelectType(value)
  }


  const saveArticle = ()=>{
    if(!selectedType){
        message.error('必须选择文章类别')
        return false
    }else if(!articleTitle){
        message.error('文章名称不能为空')
        return false
    }else if(!articleContent){
        message.error('文章内容不能为空')
        return false
    }else if(!introducemd){
        message.error('简介不能为空')
        return false
    }else if(!showDate){
        message.error('发布日期不能为空')
        return false
    }
    message.success('检验通过')

    let dataProps = {}
    dataProps.type_id = selectedType 
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd

    let datetext = showDate.replace('-', '/') //把字符串转换成时间戳
    dataProps.addTime = (new Date(datetext).getTime()) / 1000

    if (articleId === 0) {
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
      axios({
        method: 'post',
        url: servicePath.saveArticle,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          setArticleId(res.data.data.insertId)
          if (res.data.code === 0) {
            message.success('文章保存成功')
          } else {
            message.error('文章保存失败')
          }
        }
      )
    } else {
      dataProps.id = articleId 
      axios({
          method: 'post',
          url: servicePath.updateArticle,
          header: { 'Access-Control-Allow-Origin':'*' },
          data: dataProps,
          withCredentials: true
      }).then(
          res=>{
          if(res.data.code === 0){
              message.success('文章修改成功')
          }else{
              message.error('保存失败');
          }


          }
      )
    }
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10} >
            <Col span={20}>
              <Input 
                placeholder="博客标题" 
                size="large"
                onChange={(e) => setArticleTitle(e.target.value)}/>
            </Col>
            <Col span={4}>
              &nbsp;
              <Select style={{width: 150}} defaultValue={selectedType} size="large" onChange={selectedTypeHandler}>
                {
                  typeInfo.map((item,index)=>{
                      return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                  })
                }
              </Select>
            </Col>
          </Row>
          <br/>
          <Row gutter={10} >
            <Col span={12}>
              <TextArea
                  value={articleContent}
                  className="markdown-content" 
                  rows={35}  
                  placeholder="文章内容"
                  onChange={changeContent}
                  onPressEnter={changeContent}
                  />
            </Col>
            <Col span={12}>
              <div 
                className="show-html"
                dangerouslySetInnerHTML={{__html: markdownContent}}
                >
              </div>
            </Col>
          </Row>  
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button  size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>{articleId ? '修改文章' : '发布文章'}</Button>
              <br/>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <br/>
          <TextArea 
              rows={4}
              value={introducemd}  
              onChange={changeIntroduce} 
              onPressEnter={changeIntroduce}
              placeholder="文章简介"
          />
          <br/><br/>
          <div  className="introduce-html" dangerouslySetInnerHTML={{__html: '文章简介：' + introducehtml}}></div>
        </Col>

        <Col span={12}>
          <div className="date-select">
            <DatePicker
              placeholder="发布日期"
              size="large"
              onChange={(date, dateString) => setShowDate(dateString)}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle