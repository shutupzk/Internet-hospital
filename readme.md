互联网医院接口文档
===========

**修订时间：2018-06-10**


交互方式
-------

双方通过HTTP / POST（application/x-www-form-urlencoded） 接口进行交互。
接口响应结构为JSON字符串：

```
{ code: 200, data:null, msg: '操作成功' }   
```

响应结构中`code`为 200 时为正确码，其他均为错误码。`data`为返回的JSON结构数据

接口说明
-------

**1，用户注册**

```
请求说明：用户采用微信openid登录
请求地址：/api/user/signup
```
| 参数名称 | 参数类型 | 是否必须 | 默认值 | 
| :-: | :-: | :-:  | :--: |
| openId | String | ✅ |  | 
| phone | Nebmer | ❌ |   | 




    

