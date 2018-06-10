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
请求地址：/api/user/signup
```
| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| openId | String | ✅ |  用户微信id| |
| phone | Nebmer | ❌ |  手机号 | |
--

**用户登录**

```
请求地址：/api/user/signup
```
| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| openId | String | ✅ |  用户微信id| |
--

**创建就诊人**

```
请求地址：/api/patient/create
```
| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| userId | String | ✅ |  用户id| |
| phone | String | ✅ |  手机号| |
| certificateType | String | ❌ |  证件类型 01身份证，02军人证，03户口本，04签证，05护照，06港澳通行证| 01 |
| certificateNo | String | ✅ |  证件号码| |
| name | String | ✅ |  姓名 YYYY-MM-DD|  |
| birthday | String | ❌ |  生日| 由身份证号算出|
| sex | String | ❌ |  性别 0-女，1-男| 由身份证号算出|
| patientIdNo |  String | ❌|  就诊卡号| |

--



    

