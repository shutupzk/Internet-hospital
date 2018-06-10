互联网医院接口文档
===========

**修订时间：2018-06-10**

##10. 订单模块

###10.1 创建咨询订单

```
请求地址：/consultation/create
```
**请求包示例**

```
 {
    "content": "肚子痛",
    "patientId": "5b1be1a7230afb14e4bfb3f0",
    "doctorId": "5b1be1a9af32f1debbee94b8",
    "consultationReason": "发处方",
    "images": "[\"https://a.jpg\",\"https://b.jpg\"]"
 }
```
**请求包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| content | String | ✅ |  咨询内容| |
| patientId | String | ✅ |  患者id | |
| doctorId | String | ✅ |  医生id| |
| consultationReason | String | ✅ |  问诊原因 | |
| images |[string] | ❌ |  咨询图片| []|

**应答包示例**

```
{ code: '200', msg: '注册成功' }
```

**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| openId | String | ✅ |  用户微信id| |
| phone | Nebmer | ❌ |  手机号 | |
--


    

