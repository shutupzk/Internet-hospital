互联网医院接口文档
===========

**修订时间：2018-06-10**



1 用户模块
--------

</br>
###1.1 用户注册###

```
请求地址：/api/user/signup
```
**请求包示例**

```
{
    "openId": "8765431278754452356"
}
```
**请求包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| openId | String | ✅ |  用户微信id| |
| phone | Nebmer | ❌ |  手机号 | |

**应答包示例**

```
{
    "code": "200",
    "msg": "注册成功"
}
```

**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
--



</br>

###1.2 用户登录

```
请求地址：/api/user/signin
```
**请求包示例**

```
{
    "openId": "8765431278754452356"
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| openId | String | ✅ |  用户微信id| |

**应答包示例**

```
{
    "code": "200",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1YjFjZmQyOWFlZTllZGUwMzNiYTc1NGMiLCJleHAiOjE1Mjg3MTMyMzF9.KuShzkX9_TZJ9-LHQ6PZGmWHQbNqLWyyfJ62Ox2uNmU",
    "userId": "5b1cfd29aee9ede033ba754c",
    "usersig": "eJxNjV1PgzAYRv8Ltxhp37YUTHbBgGVkoHFgJlcEabdUNtaxurkY-7uEYPT2nOfjyyrS-L5umuNHZypz09J6sJB1N2IlZGfUVsl*gB53GSUYuMcZpQwIc6dYrbUSVW0q0ot-7bNoq1ENDFOEkO9z35uk-NSql1W9NeM4ZozBEJnsRfZndewGAQi7iIKP-qRRBzlWwHPB9Qj*-VO7AWfxc5jEEEWiXNl6nW3KJYS2umUNyS*paBfIpMnbieU8Tjg474GaJ0-XXkCri8PyZV2IsO1O1-K1fAz3*1XCtTN3dkGziLC9CWYz6-sHjmVYQQ__",
    "identifier": "8765431278754452356"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
| token | String | ✅ | 用户登录凭证| |
| userId | String | ✅ |  用户id| |
| usersig | String | ✅ |  云通讯登录 凭证| |
| identifier | String | ✅ |  云通信登录 用户名 | |

--



</br>
</br>
</br>
</br>

##2 就诊人模块


###2.1 创建就诊人

```
请求地址：/api/patient/create
```
**请求包示例**

```
{
	"userId": "5b1cbbcfe3d2c87d31bac936",
    "phone": "13300000001",
    "certificateNo": "620403198410153628",
    "name": "测试",
    "birthday": "19841015",
    "sex": "0",
    "patientIdNo": "123456765"
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| userId | String | ✅ |  用户id| |
| phone | String | ✅ |  手机号| |
| certificateType | String | ❌ |  证件类型 01身份证，02军人证，03户口本，04签证，05护照，06港澳通行证| 01 |
| certificateNo | String | ✅ |  证件号码| |
| name | String | ✅ |  姓名 |  |
| birthday | String | ❌ |  生日 YYYY-MM-DD| 由身份证号算出 |
| sex | String | ❌ |  性别 0-女，1-男| 由身份证号算出|
| patientIdNo |  String | ❌|  就诊卡号 | |

--
**应答包示例**

```
{
    "code": "200",
    "msg": "创建就诊人成功",
    "data": {
        "id": "5b1d0123aee9ede033ba754d",
        "userId": "5b1cbbcfe3d2c87d31bac936",
        "phone": 13300000002,
        "certificateType": "01",
        "certificateNo": "510000197202288471",
        "name": "张三",
        "birthday": "1984-10-15",
        "sex": 0,
        "patientIdNo": "123456765",
        "created_at": "2018-06-10T10:44:51.958Z",
        "updated_at": "2018-06-10T10:44:51.958Z"
    }
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
| data | Object | ❌ |  返回值, 当 code 不 等于 200 时为空 | |
| data.id | String | ✅ | 就诊人id| |
| data.userId | String | ✅ | 用户id| |
| data.phone | String | ✅ | 就诊人手机号| |
| data.certificateType | String | ✅ | 证件类型 01身份证，02军人证，03户口本，04签证，05护照，06港澳通行证| |
| data.certificateNo | String | ✅ | 证件号| |
| data.name | String | ✅ | 姓名 | |
| data.birthday | String | ✅ | 生日 | |
| data.sex | String | ✅ | 性别 0-女，1-男 | |
| data.patientIdNo | String | ❌ | 就诊卡号 | |
| data.created_at | String | ✅ | 创建时间 | |
| data.updated_at | String | ✅ | 修改时间 | |

--


</br>

###2.2 删除就诊人

```
请求地址：/api/patient/delete
```
**请求包示例**

```
{
	"id": "5b1d0123aee9ede033ba754d"
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| id | String | ✅ |  就诊人id| |

--
**应答包示例**

```
{
    "code": 200,
    "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |

--


</br>

###2.3 就诊人列表

```
请求地址：/api/patient/list
```
**请求包示例**

```
{
	"userId": "5b1cbbcfe3d2c87d31bac936"
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| userId | String | ✅ |  用户id| |

--
**应答包示例**

```
{
    "code": 200,
    "data": [
        {
            "id": "5b1cbc00e3d2c87d31bac937",
            "userId": "5b1cbbcfe3d2c87d31bac936",
            "phone": 18701676735,
            "certificateType": "01",
            "certificateNo": "341021199207068398",
            "name": "查康",
            "birthday": "1992-12-28",
            "sex": 1,
            "patientIdNo": "123456765",
            "created_at": "2018-06-10T05:49:52.742Z",
            "updated_at": "2018-06-10T05:49:52.742Z"
        }
    ],
    "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
| data | Array | ❌ |  返回值, 当 code 不 等于 200 时为空 | |
| data.id | String | ✅ | 就诊人id| |
| data.userId | String | ✅ | 用户id| |
| data.phone | String | ✅ | 就诊人手机号| |
| data.certificateType | String | ✅ | 证件类型 01身份证，02军人证，03户口本，04签证，05护照，06港澳通行证| |
| data.certificateNo | String | ✅ | 证件号| |
| data.name | String | ✅ | 姓名 | |
| data.birthday | String | ✅ | 生日 | |
| data.sex | String | ✅ | 性别 0-女，1-男 | |
| data.patientIdNo | String | ❌ | 就诊卡号 | |
| data.created_at | String | ✅ | 创建时间 | |
| data.updated_at | String | ✅ | 修改时间 | |

--
    

</br>

###2.4 就诊人详情

```
请求地址：/api/patient/detail
```
**请求包示例**

```
{
	"id": "5b1cbc00e3d2c87d31bac937"
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| id | String | ✅ |  就诊人id| |

--
**应答包示例**

```
{
    "code": 200,
    "data": {
        "id": "5b1cbc00e3d2c87d31bac937",
        "userId": "5b1cbbcfe3d2c87d31bac936",
        "phone": 18701676735,
        "certificateType": "01",
        "certificateNo": "341021199207068398",
        "name": "查康",
        "birthday": "1992-12-28",
        "sex": 1,
        "patientIdNo": "123456765",
        "created_at": "2018-06-10T05:49:52.742Z",
        "updated_at": "2018-06-10T05:49:52.742Z"
    },
    "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
| data | Object | ❌ |  返回值, 当 code 不 等于 200 时为空 | |
| data.id | String | ✅ | 就诊人id| |
| data.userId | String | ✅ | 用户id| |
| data.phone | String | ✅ | 就诊人手机号| |
| data.certificateType | String | ✅ | 证件类型 01身份证，02军人证，03户口本，04签证，05护照，06港澳通行证| |
| data.certificateNo | String | ✅ | 证件号| |
| data.name | String | ✅ | 姓名 | |
| data.birthday | String | ✅ | 生日 | |
| data.sex | String | ✅ | 性别 0-女，1-男 | |
| data.patientIdNo | String | ❌ | 就诊卡号 | |
| data.created_at | String | ✅ | 创建时间 | |
| data.updated_at | String | ✅ | 修改时间 | |

--



</br>

###2.5 绑定就诊卡

```
请求地址：/api/patient/bindcard
```
**请求包示例**

```
{
	"id": "5b1cbc00e3d2c87d31bac937",
	"patientIdNo": "123456765"
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| id | String | ✅ |  就诊人id| |
| patientIdNo | String | ✅ |  就诊卡号 | |

--
**应答包示例**

```
{
    "code": 200,
    "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |

--



</br>
</br>
</br>
</br>

##5 问诊原因

</br>
###5.1 问诊原因列表

```
请求地址：/api/consultationReason/list
```
**请求包示例**

```
{}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |

--
**应答包示例**

```
{
    "code": 200,
    "data": [
        {
            "id": "5b1c07cc3cd1e8ef566a463d",
            "reason": "在线复诊",
            "created_at": "2018-06-09T17:01:00.902Z",
            "updated_at": "2018-06-09T17:01:00.902Z"
        },
    ],
    "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
| data | Array | ✅ |  返回值 | |
| data.id | String | ✅ |  id | |
| data.reason | String | ✅ |  内容 | |
| data.created_at | Date | ✅ | 创建时间 | |
| data.updated_at | Date | ✅ | 修改时间 | |

--



</br>
</br>
</br>
</br>

##6 评价问题

</br>
###6.1 评价问题列表

```
请求地址：/api/evaluateQuesion/list
```
**请求包示例**

```
{}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |

--
**应答包示例**

```
{
    "code": 200,
    "data": [
        {
            "id": "5b1cc83ab50b51fa5bb955cf",
            "quesion": "您对此次问诊的整体评价是",
            "type": "01",
            "created_at": "2018-06-10T06:42:02.897Z",
            "updated_at": "2018-06-10T06:42:02.897Z"
        }
    ],
    "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
| data | Array | ✅ |  返回值 | |
| data.id | String | ✅ |  id | |
| data.quesion | String | ✅ |  内容 | |
| data.type | String | ✅ |  01, 打分评价， 02，文字评价 | |
| data.created_at | Date | ✅ | 创建时间 | |
| data.updated_at | Date | ✅ | 修改时间 | |

--



</br>
</br>
</br>
</br>

##7 快捷回复

</br>
###7.1 创建快捷回复

```
请求地址：/api/quickReply/create
```
**请求包示例**

```
{
	"doctorId": "5b1cc699cbd16bf9d96ae31b",
    "title": "标题",
    "content": "内容马上大家发快递"
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| doctorId | id | ✅ | 医生id | |
| title | String | ✅ | 标题 | |
| content | content | ✅ | 内容 | |
--
**应答包示例**

```
{
    "code": 200,
    "data": {
        "id": "5b1d1792aee9ede033ba7550",
        "doctorId": "5b1cc699cbd16bf9d96ae31b",
        "title": "标题",
        "content": "内容马上大家发快递",
        "created_at": "2018-06-10T12:20:34.344Z",
        "updated_at": "2018-06-10T12:20:34.344Z"
    },
    "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
| data | Array | ✅ |  返回值 | |
| data._id | String | ✅ |  id | |
| data.doctorId | String | ✅ |  医生id | |
| data.title | String | ✅ |  标题 | |
| data.content | String | ✅ |  内容 | |
| data.created_at | Date | ✅ | 创建时间 | |
| data.updated_at | Date | ✅ | 修改时间 | |

--


</br>
###7.2 删除快捷回复

```
请求地址：/api/quickReply/delete
```
**请求包示例**

```
{
	"id": "5b1d1792aee9ede033ba7550"
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| id | id | ✅ | 快捷回复id | |
--
**应答包示例**

```
{
    "code": 200,
    "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |

--


</br>
###7.3 快捷回复列表

```
请求地址：/api/quickReply/list
```
**请求包示例**

```
{
	"doctorId": "5b1cc699cbd16bf9d96ae31b",
    "skip": "0",
    "limit": "10"
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| doctorId | String | ✅ | 医生id | |
| keyword | String | ❌ | 搜索关键字 | |
| skip | Nunber | ❌ |  从 第 skip 条 开始 | 0 |
| limit | Nunber | ❌ |  拿多少条 | 10 |
--
**应答包示例**

```
{
    "code": 200,
    "data": {
        "items": [
            {
                "_id": "5b1d19c156c4c111e22896d4",
                "doctorId": "5b1cc699cbd16bf9d96ae31b",
                "title": "标题",
                "content": "内容马上大家发快递",
                "created_at": "2018-06-10T12:29:53.877Z",
                "updated_at": "2018-06-10T12:29:53.877Z"
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
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
| data | Object | ✅ |  返回值 | |
| data.items | Array | ✅ |  列表内容 | |
| data.items._id | String | ✅ |  id | |
| data.items.doctorId | String | ✅ |  医生id | |
| data.items.title | String | ✅ |  标题 | |
| data.items.content | String | ✅ |  内容 | |
| data.items.created_at | Date | ✅ | 创建时间 | |
| data.items.updated_at | Date | ✅ | 修改时间 | |
| data.page_info | Object | ✅ |  分页信息 | |
| data.page_info.skip | String | ✅ |  id | |
| data.page_info.limit | String | ✅ |  医生id | |
| data.page_info.total | String | ✅ |  标题 | |

--



</br>
</br>
</br>
</br>

##8 消息模块


###8.1 用户聊天列表

```
请求地址：/api/chat/user/list'
```
**请求包示例**

```
{
	"userId": "5b1cbbcfe3d2c87d31bac936"
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| userId | String | ✅ |  用户id | |

--
**应答包示例**

```
{
    "code": 200,
    "data": [
        {
            "id": "5b1ceb05d6c651987b08f8c9",
            "type": "01",
            "status": true,
            "lastMsgContent": "backargagdrg",
            "lastMsgTime": "2018-06-10T09:59:11.803Z",
            "patient": {
                "patientId": "5b1ce9402e1645c67bbaf723",
                "name": "测试"
            },
            "doctor": {
                "doctorId": "5b1cc699cbd16bf9d96ae31b",
                "doctorName": "华佗"
            }
        },
        {
            "id": "5b1cbd2ed6c651987b086399",
            "type": "02",
            "status": true,
            "lastMsgContent": "",
            "lastMsgTime": null,
            "system": {
                "systemId": "5b1cbcc9ca8d7d7ef948e783",
                "code": "01",
                "name": "系统消息"
            }
        },
    ],
    "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
| data | Array | ✅ |  返回值 | |
| data.id | String | ✅ |  聊天id | |
| data.type | String | ✅ |  聊天类型 01：就诊人和医生, 02: 系统与用户 | |
| data.status | boolean | ✅ |  是否可以交流 true: 可以，false: 不可以 | |
| data.lastMsgContent | String | ✅ |  最后一条聊天消息展示 ，如果是 图片  lastMsgContent = [图片]，</br> 如果是语言 lastMsgContent = [语音] | |
| data.lastMsgTime | Date | ✅ |  最后一条聊天消息发送时间 | |
| data.system | String | ❌ |  系统用户 | |
| data.system.systemId | String | ✅ |  系统用户id | |
| data.system.code | String | ✅ |  系统用户编码 | |
| data.system.name | String | ✅ |  系统用户名称 | |
| data.patient | String | ❌ |  就诊人 | |
| data.patient.patientId | String | ✅ |  就诊人id | |
| data.patient.name | String | ✅ |  就诊人姓名 | |
| data.doctor | String | ❌ |  医生 | |
| data.doctor.doctorId | String | ✅ |  医生id | |
| data.doctor.doctorName | String | ✅ |  医生姓名 | |

--

</br>
###8.2 医生聊天列表

```
请求地址：/api/chat/doctor/list'
```
**请求包示例**

```
{
	"doctorId": "5b1cc699cbd16bf9d96ae31b"
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| doctorId | String | ✅ |  医生id | |

--
**应答包示例**

```
{
    "code": 200,
    "data": [
        {
            "id": "5b1ceb05d6c651987b08f8c9",
            "type": "01",
            "status": true,
            "lastMsgContent": "backargagdrg",
            "lastMsgTime": "2018-06-10T09:59:11.803Z",
            "patient": {
                "patientId": "5b1ce9402e1645c67bbaf723",
                "name": "测试"
            },
            "doctor": {
                "doctorId": "5b1cc699cbd16bf9d96ae31b",
                "doctorName": "华佗"
            }
        },
        {
            "id": "5b1d0b5dd6c651987b094a7e",
            "type": "03",
            "status": true,
            "lastMsgContent": "",
            "lastMsgTime": null,
            "system": {
                "systemId": "5b1cbcc9ca8d7d7ef948e783",
                "code": "01",
                "name": "系统消息"
            }
        }
    ],
    "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
| data | Array | ✅ |  返回值 | |
| data.id | String | ✅ |  聊天id | |
| data.type | String | ✅ |  聊天类型 01：就诊人和医生, 03: 系统与医生 | |
| data.status | boolean | ✅ |  是否可以交流 true: 可以，false: 不可以 | |
| data.lastMsgContent | String | ✅ |  最后一条聊天消息展示 ，如果是 图片  lastMsgContent = [图片]，</br> 如果是语言 lastMsgContent = [语音] | |
| data.lastMsgTime | Date | ✅ |  最后一条聊天消息发送时间 | |
| data.system | String | ❌ |  系统用户 | |
| data.system.systemId | String | ✅ |  系统用户id | |
| data.system.code | String | ✅ |  系统用户编码 | |
| data.system.name | String | ✅ |  系统用户名称 | |
| data.patient | String | ❌ |  就诊人 | |
| data.patient.patientId | String | ✅ |  就诊人id | |
| data.patient.name | String | ✅ |  就诊人姓名 | |
| data.doctor | String | ❌ |  医生 | |
| data.doctor.doctorId | String | ✅ |  医生id | |
| data.doctor.doctorName | String | ✅ |  医生姓名 | |

--


</br>
###8.3 获取单条聊天，聊天详情

```
请求地址：/api/chat/detail'
```
**请求包示例**

```
{
	"id": "5b1cc699cbd16bf9d96ae31b"
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| id | String | ✅ |  聊天id | |

--
**应答包示例**

```
{
    "code": 200,
    "data": {
        "id": "5b1ccc2fd6c651987b089d4c",
        "type": "01",
        "status": true,
        "lastMsgContent": "hahahahhahaahah",
        "lastMsgTime": "2018-06-10T07:52:27.084Z",
        "patient": {
            "patientId": "5b1cbc00e3d2c87d31bac937",
            "name": "查康"
        },
        "doctor": {
            "doctorId": "5b1cc699cbd16bf9d96ae31b",
            "doctorName": "华佗"
        }
    },
    "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
| data | Array | ✅ |  返回值 | |
| data.id | String | ✅ |  聊天id | |
| data.type | String | ✅ |  聊天类型 01：就诊人和医生, 03: 系统与医生 | |
| data.status | boolean | ✅ |  是否可以交流 true: 可以，false: 不可以 | |
| data.lastMsgContent | String | ✅ |  最后一条聊天消息展示 ，如果是 图片  lastMsgContent = [图片]，</br> 如果是语言 lastMsgContent = [语音] | |
| data.lastMsgTime | Date | ✅ |  最后一条聊天消息发送时间 | |
| data.system | String | ❌ |  系统用户 | |
| data.system.systemId | String | ✅ |  系统用户id | |
| data.system.code | String | ✅ |  系统用户编码 | |
| data.system.name | String | ✅ |  系统用户名称 | |
| data.patient | String | ❌ |  就诊人 | |
| data.patient.patientId | String | ✅ |  就诊人id | |
| data.patient.name | String | ✅ |  就诊人姓名 | |
| data.doctor | String | ❌ |  医生 | |
| data.doctor.doctorId | String | ✅ |  医生id | |
| data.doctor.doctorName | String | ✅ |  医生姓名 | |

--


</br>
###8.4 获取聊天消息

```
请求地址：/api/chat/message/list
```
**请求包示例**

```
{
	"chatId": "5b1cc699cbd16bf9d96ae31b",
	"skip": 0,
	"limit": 10
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| chatId | String | ✅ |  聊天id | |
| skip | Nunber | ❌ |  从 第 skip 条 开始 | 0 |
| limit | Nunber | ❌ |  拿多少条 | 10 |

--
**应答包示例**

```
{
    "code": 200,
    "data": [
        {
            "id": "5b1cf581a7ed45dc98157484",
            "chatId": "5b1ceb05d6c651987b08f8c9",
            "consultationId": "5b1cf53fa7ed45dc9815747e",
            "type": "06",
            "text": {
                "doctorMsg": {
                    "text": "因不能面诊患者，无法全面了解病情，以下建议仅供参考，具体诊疗请一定到院在医生指导下进行！"
                },
                "userMsg": {
                    "text": "因不能面诊患者，无法全面了解病情，以下建议仅供参考，具体诊疗请一定到院在医生指导下进行！"
                }
            },
            "direction": "user->doctor",
            "created_at": "2018-06-10T09:55:13.734Z",
            "updated_at": "2018-06-10T09:55:13.734Z"
        },
        {
            "id": "5b1cf564a7ed45dc98157480",
            "chatId": "5b1ceb05d6c651987b08f8c9",
            "consultationId": "5b1cf53fa7ed45dc9815747e",
            "type": "06",
            "text": {
                "doctorMsg": {
                    "type": "咨询开始",
                    "text": "患者于06月10日 17:54购买了您的咨询服务，请在48小时内回复。"
                },
                "userMsg": {
                    "type": "咨询开始",
                    "text": "您提交的病历信息已经发送给医生，请等待回复。"
                }
            },
            "direction": "user->doctor",
            "created_at": "2018-06-10T09:54:44.512Z",
            "updated_at": "2018-06-10T09:54:44.512Z"
        },
        {
            "id": "5b1cf564a7ed45dc98157481",
            "chatId": "5b1ceb05d6c651987b08f8c9",
            "consultationId": "5b1cf53fa7ed45dc9815747e",
            "type": "06",
            "text": {
                "userMsg": {
                    "text": "温馨提示\n1. 订单在48小时内自动结束。如医生未在48小时之内回复，您所支付的费用将原路退还。\n2. 在48小时内，医生最多回复三次。"
                }
            },
            "direction": "doctor->user",
            "created_at": "2018-06-10T09:54:44.593Z",
            "updated_at": "2018-06-10T09:54:44.593Z"
        },
        {
            "id": "5b1cf581a7ed45dc98157483",
            "chatId": "5b1ceb05d6c651987b08f8c9",
            "consultationId": "5b1cf53fa7ed45dc9815747e",
            "type": "01",
            "text": "backargagdrg",
            "direction": "doctor->user",
            "created_at": "2018-06-10T09:55:13.724Z",
            "updated_at": "2018-06-10T09:57:27.840Z",
            "isRetract": true
        },
        {
            "id": "5b1cf564a7ed45dc98157482",
            "chatId": "5b1ceb05d6c651987b08f8c9",
            "consultationId": "5b1cf53fa7ed45dc9815747e",
            "type": "01",
            "text": "垃圾啊发几个； 啊；历史课戴假发；看",
            "direction": "user->doctor",
            "created_at": "2018-06-10T09:54:44.637Z",
            "updated_at": "2018-06-10T09:54:44.637Z"
        },
    ],
    "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
| data | Array | ✅ |  返回值 | |
| data.id | String | ✅ |  消息id | |
| data.chatId | String | ✅ |  聊天id | |
| data.consultationId | String | ❌ |  订单 | |
| data.type | String | ✅ |  01: 图文，02： 处方, 03: 检查 04 检验， 06: 咨询申明 | |
| data.text | String 或 Object | ❌ | 文本消息内容, 当type = 06时，text 类型为 Object，其余类型 text 为String。 | |
| data.text.doctorMsg | Object | ❌ | 当type = 06 时，医生端需要显示的内容， 如果为空，则表示医生端不需要显示该条数据 | |
| data.text.doctorMsg.type | Object | ❌ |  当type =06 时， 医生端显示内容 类型 | |
| data.text.doctorMsg.text | Object | ✅ |  当type =06 时， 医生端显示内容 信息 | |
| data.text.userMsg | Object | ❌ | 当type = 06 时，患者需要显示的内容， 如果为空，则表示患者端不需要显示该条数据。 | |
| data.text.userMsg.type | Object | ❌ | 当type =06 时， 患者端显示内容 类型  | |
| data.text.userMsg.text | Object | ✅ | 当type =06 时， 患者端显示内容 信息 | |
| data.image | String | ❌ | 图片消息 网络地址， （type 只能 01） | |
| data.audio | String | ❌ | 语音消息 网络地址 （type 只能 01） | |
| data.direction | String | ✅ | 消息发送方向 ：</br>user->doctor, </br>doctor->user, </br>system->user, </br>system->doctor | |
| data.created_at | Date | ✅ | 消息创建时间 | |
| data.updated_at | Date | ✅ | 消息修改时间 | |
| data.isRetract | booleam | ❌ | 是否撤回, true 表示被撤回，false 或者 null 或者 wu 表示 未被撤回 | |

--


</br>
###8.5 发送订单聊天消息

```
请求地址：/api/consultation/chat/message/create
```
**请求包示例**

```
{
	"chatId": "5b1ceb05d6c651987b08f8c9",
    "type": "01",
    "text": "backargagdrg",
    "direction": "doctor->user",
    "consultationId": "5b1cf53fa7ed45dc9815747e",
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| chatId | String | ✅ |  聊天id | |
| type | String | ✅ |  消息类型 （暂时只能传 01： 图文） | |
| text | String | ❌ |  文本内容，（text，image，audio 有 且 只有 一个不为空） | |
| image | String | ❌ |  图片消息 网络地址（text，image，audio 有 且 只有 一个不为空） | |
| audio | String | ❌ |  语音消息 网络地址 （text，image，audio 有 且 只有 一个不为空） | |
| direction | String | ✅ |  消息发送方向 ：</br>user->doctor, </br>doctor->user, | |
| consultationId | String | ✅ |  咨询订单id | |

--
**应答包示例**

```
{
    "code": 200,
    "data": {
        "id": "5b1d1494aee9ede033ba754e",
        "chatId": "5b1ceb05d6c651987b08f8c9",
        "consultationId": "5b1cf53fa7ed45dc9815747e",
        "type": "01",
        "text": "backargagdrg",
        "direction": "doctor->user",
        "created_at": "2018-06-10T12:07:48.086Z",
        "updated_at": "2018-06-10T12:07:48.086Z"
    },
    "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
| data | Object | ✅ |  返回值 | |
| data.id | String | ✅ |  消息id | |
| data.chatId | String | ✅ |  聊天id | |
| data.consultationId | String | ❌ |  订单 | |
| data.type | String | ✅ |  01: 图文，02： 处方, 03: 检查 04 检验， 06: 咨询申明 | |
| data.text | String 或 Object | ❌ | 文本消息内容, 当type = 06时，text 类型为 Object，其余类型 text 为String。 | |
| data.text.doctorMsg | Object | ❌ | 当type = 06 时，医生端需要显示的内容， 如果为空，则表示医生端不需要显示该条数据 | |
| data.text.doctorMsg.type | Object | ❌ |  当type =06 时， 医生端显示内容 类型 | |
| data.text.doctorMsg.text | Object | ✅ |  当type =06 时， 医生端显示内容 信息 | |
| data.text.userMsg | Object | ❌ | 当type = 06 时，患者需要显示的内容， 如果为空，则表示患者端不需要显示该条数据。 | |
| data.text.userMsg.type | Object | ❌ | 当type =06 时， 患者端显示内容 类型  | |
| data.text.userMsg.text | Object | ✅ | 当type =06 时， 患者端显示内容 信息 | |
| data.image | String | ❌ | 图片消息 网络地址， （type 只能 01） | |
| data.audio | String | ❌ | 语音消息 网络地址 （type 只能 01） | |
| data.direction | String | ✅ | 消息发送方向 ：</br>user->doctor, </br>doctor->user, </br>system->user, </br>system->doctor | |
| data.created_at | Date | ✅ | 消息创建时间 | |
| data.updated_at | Date | ✅ | 消息修改时间 | |
| data.isRetract | booleam | ❌ | 是否撤回, true 表示被撤回，false 或者 null 或者 wu 表示 未被撤回 | |

--


</br>
###8.6 订单聊天消息 撤回

```
请求地址：/api/consultation/chat/message/retract
```
**请求包示例**

```
{
	"id": "5b1d1494aee9ede033ba754e"
}
```

**请求包字段说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| id | String | ✅ |  消息id | |

--
**应答包示例**

```
{
    "code": 200,
    "data": {
        "id": "5b1d1494aee9ede033ba754e",
        "chatId": "5b1ceb05d6c651987b08f8c9",
        "consultationId": "5b1cf53fa7ed45dc9815747e",
        "type": "01",
        "text": "backargagdrg",
        "direction": "doctor->user",
        "created_at": "2018-06-10T12:07:48.086Z",
        "updated_at": "2018-06-10T12:08:31.951Z",
        "isRetract": true
    },
    "msg": "操作成功"
}
```
**应答包参数说明**

| 参数名称 | 参数类型 | 是否必须 | 说明 | 默认值 |
| :-: | :-: | :-:  | :--: | :--: |
| code | String | ✅ |  返回码， 200 成功| |
| msg | String | ✅ |  返回信息 | |
| data | Object | ✅ |  返回值 | |
| data.id | String | ✅ |  消息id | |
| data.chatId | String | ✅ |  聊天id | |
| data.consultationId | String | ❌ |  订单 | |
| data.type | String | ✅ |  01: 图文，02： 处方, 03: 检查 04 检验， 06: 咨询申明 | |
| data.text | String 或 Object | ❌ | 文本消息内容, 当type = 06时，text 类型为 Object，其余类型 text 为String。 | |
| data.text.doctorMsg | Object | ❌ | 当type = 06 时，医生端需要显示的内容， 如果为空，则表示医生端不需要显示该条数据 | |
| data.text.doctorMsg.type | Object | ❌ |  当type =06 时， 医生端显示内容 类型 | |
| data.text.doctorMsg.text | Object | ✅ |  当type =06 时， 医生端显示内容 信息 | |
| data.text.userMsg | Object | ❌ | 当type = 06 时，患者需要显示的内容， 如果为空，则表示患者端不需要显示该条数据。 | |
| data.text.userMsg.type | Object | ❌ | 当type =06 时， 患者端显示内容 类型  | |
| data.text.userMsg.text | Object | ✅ | 当type =06 时， 患者端显示内容 信息 | |
| data.image | String | ❌ | 图片消息 网络地址， （type 只能 01） | |
| data.audio | String | ❌ | 语音消息 网络地址 （type 只能 01） | |
| data.direction | String | ✅ | 消息发送方向 ：</br>user->doctor, </br>doctor->user, </br>system->user, </br>system->doctor | |
| data.created_at | Date | ✅ | 消息创建时间 | |
| data.updated_at | Date | ✅ | 消息修改时间 | |
| data.isRetract | booleam | ❌ | 是否撤回, true 表示被撤回，false 或者 null 或者 wu 表示 未被撤回 | |

--

<br>
<br>
<br>
<br>

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

