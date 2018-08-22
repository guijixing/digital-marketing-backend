const TREE_MAP =
[
    {
        "id": 1,
        "parentId": -1,
        "children": [
            {
                "id": 2,
                "parentId": 1,
                "children": [
                    {
                        "id": 11,
                        "parentId": 2,
                        "children": [],
                        "icon": "icon_url11",
                        "name": "ceshi",
                        "url": "houtai_url21",
                        "spread": false,
                        "path": "qianduan_url11",
                        "component": null,
                        "authority": null,
                        "redirect": null,
                        "code": "ceshi",
                        "type": null,
                        "sort": 1,
                        "title": "ceshi"
                    }
                ],
                "icon": "icon_url2",
                "name": "订单管理",
                "url": "houtai_url12",
                "spread": false,
                "path": "qianduan_url2",
                "component": null,
                "authority": null,
                "redirect": null,
                "code": "dingdan",
                "type": null,
                "sort": 2,
                "title": "订单管理"
            },
            {
                "id": 3,
                "parentId": 1,
                "children": [],
                "icon": "icon_url3",
                "name": "免打扰管理",
                "url": "houtai_url13",
                "spread": false,
                "path": "qianduan_url3",
                "component": null,
                "authority": null,
                "redirect": null,
                "code": "miandarao",
                "type": null,
                "sort": 3,
                "title": "免打扰管理"
            }
        ],
        "icon": "icon_url1",
        "name": "我的工作台",
        "url": "houtai_url1",
        "spread": false,
        "path": "qianduan_url1",
        "component": null,
        "authority": null,
        "redirect": null,
        "code": "gongzuo",
        "type": null,
        "sort": 1,
        "title": "我的工作台"
    },
    {
        "id": 4,
        "parentId": -1,
        "children": [],
        "icon": "icon_url4",
        "name": "标签管理",
        "url": "houtai_url14",
        "spread": false,
        "path": "qianduan_url4",
        "component": null,
        "authority": null,
        "redirect": null,
        "code": "biaoqian",
        "type": null,
        "sort": 4,
        "title": "标签管理"
    },
    {
        "id": 5,
        "parentId": -1,
        "children": [],
        "icon": "icon_url5",
        "name": "价格管理",
        "url": "houtai_url15",
        "spread": false,
        "path": "qianduan_url5",
        "component": null,
        "authority": null,
        "redirect": null,
        "code": "jiage",
        "type": null,
        "sort": 5,
        "title": "价格管理"
    },
    {
        "id": 6,
        "parentId": -1,
        "children": [],
        "icon": "icon_url6",
        "name": "行业管理",
        "url": "houtai_url16",
        "spread": false,
        "path": "qianduan_url6",
        "component": null,
        "authority": null,
        "redirect": null,
        "code": "hangye",
        "type": null,
        "sort": 6,
        "title": "行业管理"
    },
    {
        "id": 7,
        "parentId": -1,
        "children": [],
        "icon": "icon_url7",
        "name": "用户管理",
        "url": "houtai_url17",
        "spread": false,
        "path": "qianduan_url7",
        "component": null,
        "authority": null,
        "redirect": null,
        "code": "yonghu",
        "type": null,
        "sort": 7,
        "title": "用户管理"
    },
    {
        "id": 8,
        "parentId": -1,
        "children": [],
        "icon": "icon_url8",
        "name": "角色管理",
        "url": "houtai_url18",
        "spread": false,
        "path": "qianduan_url8",
        "component": null,
        "authority": null,
        "redirect": null,
        "code": "juese",
        "type": null,
        "sort": 8,
        "title": "角色管理"
    },
    {
        "id": 9,
        "parentId": -1,
        "children": [
            {
                "id": 10,
                "parentId": 9,
                "children": [],
                "icon": "icon_url10",
                "name": "用户端首页配置",
                "url": "houtai_url20",
                "spread": false,
                "path": "qianduan_url10",
                "component": null,
                "authority": null,
                "redirect": null,
                "code": "peizhi",
                "type": null,
                "sort": 10,
                "title": "用户端首页配置"
            }
        ],
        "icon": "icon_url9",
        "name": "资源管理",
        "url": "houtai_url19",
        "spread": false,
        "path": "qianduan_url9",
        "component": null,
        "authority": null,
        "redirect": null,
        "code": "ziyuan",
        "type": null,
        "sort": 9,
        "title": "资源管理"
    }
]

export const getMenuTreeData = req => {
	req = JSON.parse(req.body)
	return {
		code: 200,
		data: TREE_MAP,
		msg: ''
	}
}

