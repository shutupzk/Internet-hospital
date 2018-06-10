互联网医院接口文档
===========

**修订时间：2018-06-10**

##9. 收藏模块

###9.1 用户收藏医生
```
请求地址：/api/doctorCollection/create
```
**请求包示例**

```
 {
    "userId": "5b1be1a7230afb14e4bfb3f0",
    "doctorId": "5b1be1a9af32f1debbee94b8",
 }
```
**请求包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| userId | String | ✅ |  用户id | |
| doctorId | String | ✅ |  医生id| |

**应答包示例**

```
{
  "code": 200,
  "data": {
    "_id": "5b1d1ad6f892f04c99dbf222",
    "doctorId": "5b1cc699cbd16bf9d96ae31b",
    "userId": "5b1cbbcfe3d2c87d31bac936",
    "created_at": "2018-06-10T12:34:30.704Z",
    "updated_at": "2018-06-10T12:34:30.704Z"
  },
  "msg": "操作成功"
}
```

**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| userId | String | ✅ |  用户id | |
| doctorId | String | ✅ |  医生id| |
<br>

###9.2 用户查询收藏的医生列表
```
请求地址：/api/doctorCollection/list
```
**请求包示例**

```
 {
    "userId": "5b1cbbcfe3d2c87d31bac936",
 }
```
**请求包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| userId | String | ✅ |  用户id | |

**应答包示例**

```
{
  "code": 200,
  "data": [
    {
      "id": "5b1cf2bb7641890a26af32ee",
      "userId": "5b1cbbcfe3d2c87d31bac936",
      "created_at": "2018-06-10T09:43:23.140Z",
      "updated_at": "2018-06-10T09:43:23.141Z",
      "doctor": {
        "imageAndTextOpen": true,
        "imageAndTextPrice": 1,
        "isHot": true,
        "_id": "5b1cc699cbd16bf9d96ae31b",
        "doctorSn": "00001",
        "doctorName": "华佗",
        "weight": 1,
        "password": "e10adc3949ba59abbe56e057f20f883e",
        "created_at": "2018-06-10T06:35:05.346Z",
        "updated_at": "2018-06-10T06:35:05.346Z",
        "identifier": "doctor-00001",
        "openId": "o1XzUwxrGtfuM-jFfOloc0zxB8Fw",
        "departmentId": "5b1bcc9c72ded1d66685f9c1"
      }
    }
  ],
  "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| userId | String | ✅ |  用户id | |
| doctor | object | ✅ |  医生信息| |

<br>
###9.3 用户取消收藏医生
```
请求地址：/api/doctorCollection/delete
```
**请求包示例**

```
 {
    "id": "5b1d1ad6f892f04c99dbf222",
 }
```
**请求包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| id | String | ✅ |  患者id | 收藏id|

**应答包示例**

```
{
  "code": 200,
  "data": {
    "n": 1,
    "ok": 1
  },
  "msg": "操作成功"
}
```


<br>
<br>
<br>
<br>
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
{
  "code": 200,
  "data": {
    "id": "5b1d0252dd4335457f187cb9",
    "images": [
      "https://a.jpg",
      "https://b.jpg"
    ],
    "evaluated": false,
    "consultationNo": "H0-IWOM0XWT1Y93KHXI",
    "content": "肚子痛",
    "patientId": "5b1d0123aee9ede033ba754d",
    "doctorId": "5b1cc699cbd16bf9d96ae31b",
    "status": "01",
    "consultationReason": "发处方",
    "fee": 1,
    "created_at": "2018-06-10T10:49:54.984Z",
    "updated_at": "2018-06-10T10:49:54.984Z"
  },
  "msg": "操作成功"
}
```

**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| images |[string] | ✅ |  上传的咨询图片| |
| evaluated | boolean | ✅ |  是否已评价| |
| consultationNo |string | ✅ |  订单编号| |
| content | string | ✅ |  咨询内容| |
| patientId | string | ✅ |  患者id| |
| doctorId | string | ✅ |  医生id| |
| status | boolean | ✅ |  状态 01：待支付，02：已取消，03：待执行，04：执行中，05：已过期未退款，06：待执行退款申请，07：已完成，08：过期已退款，09:待执行订单已退款 | |
| consultationReason | string | ✅ |  咨询目的| |
| fee |number | ✅ |  咨询费用 （单位: 分）| |
| created_at | string | ✅ |  创建时间| |
| updated_at | string | ✅ |  修改时间| |
--

<br>
###10.2 修改订单信息

```
请求地址：/consultation/update
```
**请求包示例**

```
 {
    "consultationId": "5b1d0252dd4335457f187cb9",
    "status": "02",
 }
```

**请求包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| consultationId | String | ✅ |  订单id| |
| status | String | ✅ |  状态 01：待支付，02：已取消，03：待执行，04：执行中，05：已过期未退款，06：待执行退款申请，07：已完成，08：过期已退款，09:待执行订单已退款 | |

**应答包示例**

```
{
  "code": 200,
  "data": {
    "id": "5b1d0252dd4335457f187cb9",
    "images": [
      "https://a.jpg",
      "https://b.jpg"
    ],
    "evaluated": false,
    "consultationNo": "H0-IWOM0XWT1Y93KHXI",
    "content": "肚子痛",
    "patientId": "5b1d0123aee9ede033ba754d",
    "doctorId": "5b1cc699cbd16bf9d96ae31b",
    "status": "02",
    "consultationReason": "发处方",
    "fee": 1,
    "created_at": "2018-06-10T10:49:54.984Z",
    "updated_at": "2018-06-10T10:49:54.984Z"
  },
  "msg": "操作成功"
}
```

**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| images |[string] | ✅ |  上传的咨询图片| |
| evaluated | boolean | ✅ |  是否已评价| |
| consultationNo |string | ✅ |  订单编号| |
| content | string | ✅ |  咨询内容| |
| patientId | string | ✅ |  患者id| |
| doctorId | string | ✅ |  医生id| |
| status | boolean | ✅ |  状态 01：待支付，02：已取消，03：待执行，04：执行中，05：已过期未退款，06：待执行退款申请，07：已完成，08：过期已退款，09:待执行订单已退款 | |
| consultationReason | string | ✅ |  咨询目的| |
| fee |number | ✅ |  咨询费用 （单位: 分）| |
| created_at | string | ✅ |  创建时间| |
| updated_at | string | ✅ |  修改时间| |
--

<br>
###10.3 订单列表查询

```
请求地址：/consultation/list
```
**请求包示例**

```
 {
    "consultationId": "5b1d0252dd4335457f187cb9",
    "status": "02",
 }
```

**请求包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| doctorId | String | ❌ |  医生id| |
| patientId | String | ❌ |  患者id| |
| status | String | ❌ |  状态 01：待支付，02：已取消，03：待执行，04：执行中，05：已过期未退款，06：待执行退款申请，07：已完成，08：过期已退款，09:待执行订单已退款 | |
| skip |number | ❌ |  查询跳过条数| 0|
| limit | number | ❌ |  查询限制返回条数| 10 |

**应答包示例**

```
{
  "code": 200,
  "data": {
    "items": [
      {
        "id": "5b1d0252dd4335457f187cb9",
        "images": [
          "https://a.jpg",
          "https://b.jpg"
        ],
        "evaluated": false,
        "consultationNo": "H0-IWOM0XWT1Y93KHXI",
        "content": "肚子痛",
        "status": "01",
        "consultationReason": "发处方",
        "fee": 1,
        "created_at": "2018-06-10T10:49:54.984Z",
        "updated_at": "2018-06-10T10:49:54.984Z",
        "patient": {
          "_id": "5b1d0123aee9ede033ba754d",
          "userId": "5b1cbbcfe3d2c87d31bac936",
          "phone": 13300000002,
          "certificateType": "01",
          "certificateNo": "510000197202288471",
          "name": "张三",
          "birthday": "1984-10-15",
          "sex": 0,
          "patientIdNo": "123456765",
          "created_at": "2018-06-10T10:44:51.958Z",
          "updated_at": "2018-06-10T10:44:51.958Z",
          "deleted_at": "2018-06-10T10:52:55.358Z"
        },
        "doctor": {
          "imageAndTextOpen": true,
          "imageAndTextPrice": 1,
          "isHot": true,
          "_id": "5b1cc699cbd16bf9d96ae31b",
          "doctorSn": "00001",
          "doctorName": "华佗",
          "weight": 1,
          "password": "e10adc3949ba59abbe56e057f20f883e",
          "created_at": "2018-06-10T06:35:05.346Z",
          "updated_at": "2018-06-10T06:35:05.346Z",
          "identifier": "doctor-00001",
          "openId": "o1XzUwxrGtfuM-jFfOloc0zxB8Fw",
          "departmentId": "5b1bcc9c72ded1d66685f9c1"
        }
      }
    ],
    "page_info": {
      "skip": 0,
      "limit": 1,
      "total": 4
    }
  },
  "msg": "操作成功"
}
```

**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| items |[object] | ✅ |  返回的数组结构体| |
| items.images |[string] | ✅ |  上传的咨询图片| |
| items.evaluated | boolean | ✅ |  是否已评价| |
| items.consultationNo |string | ✅ |  订单编号| |
| items.content | string | ✅ |  咨询内容| |
| items.patientId | string | ✅ |  患者id| |
| items.doctorId | string | ✅ |  医生id| |
| items.status |string | ✅ |  状态 01：待支付，02：已取消，03：待执行，04：执行中，05：已过期未退款，06：待执行退款申请，07：已完成，08：过期已退款，09:待执行订单已退款 | |
| items.consultationReason | string | ✅ |  咨询目的| |
| items.fee |number | ✅ |  咨询费用 （单位: 分）| |
| items.created_at | string | ✅ |  创建时间| |
| items.updated_at | string | ✅ |  修改时间| |
| items.patient | object | ✅ |  用户信息| |
| items.doctor | object | ✅ |  医生信息| |
| page_info |[object] | ✅ |  返回页码标签| |
| page_info.skip | number | ✅ |  数据跳过数量| |
| page_info.limit| number | ✅ |  数据限制的返回条数| |
| page_info.total | number | ✅ |  查询到的总条数| |
--

<br>
###10.4 查询订单的聊天消息

```
请求地址：/consultation/chatmessage
```
**请求包示例**

```
 {
    "consultationId": "5b1ce9472e1645c67bbaf724",
 }
```

**请求包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| consultationId | String | ✅ |  订单id| |

**应答包示例**

```
{
  "code": 200,
  "data": [
    {
      "id": "5b1cf16fd3bca5d5aa4b3471",
      "chatId": "5b1ceb05d6c651987b08f8c9",
      "consultationId": "5b1ce9472e1645c67bbaf724",
      "type": "06",
      "text": {
        "doctorMsg": {
          "type": "咨询开始",
          "text": "患者于06月10日 17:37购买了您的咨询服务，请在48小时内回复。"
        },
        "userMsg": {
          "type": "咨询开始",
          "text": "您提交的病历信息已经发送给医生，请等待回复。"
        }
      },
      "direction": "user->doctor",
      "created_at": "2018-06-10T09:37:51.953Z",
      "updated_at": "2018-06-10T09:37:51.953Z"
   }
 ],
 "msg": "操作成功"
```

**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| chatId | string | ✅ |  聊天id | |
| consultationId | string | ✅ |  咨询id| |
| type | string | ✅ |  消息类型| |
| text | object | ✅ |  消息内容| |
| direction |string | ✅ |  消息方向| |

<br>
###10.5 创建订单的支付订单

```
请求地址：/consultation/payment/create
```
**请求包示例**

```
 {
    "consultationId": "5b1ce9472e1645c67bbaf724",
 }
```
**请求包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| consultationId | String | ✅ |  订单id| |

**应答包示例**

```
{
  "code": 200,
  "data": {
    "_id": "5b1d0c886d6b4c479fe9c613",
    "totalFee": 1,
    "outTradeNo": "20180610193328224617837295647",
    "status": "WAIT_FOR_PAY",
    "consultationId": "5b1cd449cb062d004316ca12",
    "orderInfo": "{\"appid\":\"wxe291762653c64caa\",\"partnerid\":\"1490235832\"}",
    "created_at": "2018-06-10T11:33:28.568Z",
    "updated_at": "2018-06-10T11:33:28.568Z"
  },
  "msg": "操作成功"
}
```

**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| totalFee | string | ✅ |  支付金额 | |
| outTradeNo | string | ✅ |  支付订单号| |
| status | string | ✅ |  支付状态| |
| consultationId | object | ✅ |  订单id| |
| orderInfo | object | ✅ |  微信相关信息，前端用以吊起微信| |

<br>
<br>
<br>
<br>
##11. 诊断模块

###11.1 查询诊断字典

```
请求地址：/dictionary/diagnosis/list
```
**请求包示例**

```
 {
    "keyword": "疼",
 }
```

**请求包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| keyword | String | ❌ |  查询关键字| |
|skip | String | ❌ |  查询关键字| |
|limit | String | ❌ |  查询关键字| |

**应答包示例**

```
{
  "code": 200,
  "data": {
    "items": [
      {
        "_id": "5b1d0f1e6d6b4c479fe9c614",
        "name": "头疼",
        "created_at": "2018-06-10T11:44:30.090Z"
      }
    ],
    "page_info": {
      "skip": 0,
      "limit": 10,
      "total": 1
    }
  },
  "msg": "操作成功"
}

```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| items | [object] | ✅ |  返回数据节点 | |
| items.name | string | ✅ |  诊断名称| |
| page_info | object | ✅ |  页签节点| |
| page_info.skip |number | ✅ | 跳过条数 | |
| page_info.limit | number | ✅ |  返回数据限制条数| | 
| page_info.limit | number | ✅ |  总数| | 


<br>
###11.1 开诊断

```
请求地址：/treatment/diagnisis/upsert
```
**请求包示例**

```
{
    "consultationId": "5b1cd449cb062d004316ca12",
    "mainDiagnosis": "偏头痛",
    "secondDiagnosis": "[\"痛\",\"痒\"]",
    "chiefComplaint": "我的头好疼",
    "historyOfPastIllness": "没什么既往史"
 }
```

**请求包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| consultationId | String | ✅ |  订单id| |
| mainDiagnosis | String | ✅ |  主诊断| |
| secondDiagnosis | [String] | ❌ |  副诊断|  []|
| chiefComplaint | String | ✅ |  主诉| |
| historyOfPastIllness | String | ✅ |  既往史| |

**应答包示例**

```
{
  "code": 200,
  "data": {
    "secondDiagnosis": [
      "痛",
      "痒"
    ],
    "created_at": "2018-06-10T12:06:01.665Z",
    "_id": "5b1d13cfd6c651987b095ca6",
    "consultationId": "5b1cd449cb062d004316ca12",
    "chiefComplaint": "我的头好疼",
    "doctorId": "5b1cc699cbd16bf9d96ae31b",
    "historyOfPastIllness": "没什么既往史",
    "mainDiagnosis": "偏头痛",
    "patientId": "5b1cbc00e3d2c87d31bac937"
  },
  "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| consultationId | String | ✅ |  订单id| |
| mainDiagnosis | String | ✅ |  主诊断| |
| secondDiagnosis | [String] | ✅ |  副诊断|  []|
| chiefComplaint | String | ✅ |  主诉| |
| historyOfPastIllness | String | ✅ |  既往史| |
| patientId | String | ✅ |  患者id| |
| doctorId | String | ✅ |  医生id| |

<br>
###11.2 诊断查询
```
请求地址：/treatment/diagnisis/queryByConsultation
```
**请求包示例**

```
{
    "consultationId": "5b1cd449cb062d004316ca12",
}
```

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| consultationId | String | ✅ |  订单id| |
 
**应答包示例**

```
{
  "code": 200,
  "data": {
    "secondDiagnosis": [
      "痛",
      "痒"
    ],
    "created_at": "2018-06-10T12:06:01.665Z",
    "_id": "5b1d13cfd6c651987b095ca6",
    "consultationId": "5b1cd449cb062d004316ca12",
    "chiefComplaint": "我的头好疼",
    "doctorId": "5b1cc699cbd16bf9d96ae31b",
    "historyOfPastIllness": "没什么既往史",
    "mainDiagnosis": "偏头痛",
    "patientId": "5b1cbc00e3d2c87d31bac937"
  },
  "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| consultationId | String | ✅ |  订单id| |
| mainDiagnosis | String | ✅ |  主诊断| |
| secondDiagnosis | [String] | ✅ |  副诊断|  []|
| chiefComplaint | String | ✅ |  主诉| |
| historyOfPastIllness | String | ✅ |  既往史| |
| patientId | String | ✅ |  患者id| |
| doctorId | String | ✅ |  医生id| |

