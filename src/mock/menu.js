const TREE_MAP =
	[{
		"id": 1,
		"parentId": -1,
		"children": [
			{
				"id": 2,
				"parentId": 1,
				"children": [
					{
						"id": 4,
						"parentId": 2,
						"children": [
							{
								"id": 6,
								"parentId": 4,
								"children": [

								],
								"icon": null,
								"name": "行业管理",
								"url": null,
								"spread": false,
								"path": null,
								"component": null,
								"authority": null,
								"redirect": null,
								"code": null,
								"type": null,
								"title": "行业管理",
								"sort": null
							}
						],
						"icon": null,
						"name": "标签管理",
						"url": null,
						"spread": false,
						"path": null,
						"component": null,
						"authority": null,
						"redirect": null,
						"code": null,
						"type": null,
						"title": "标签管理",
						"sort": null
					}
				],
				"icon": null,
				"name": "订单管理",
				"url": null,
				"spread": false,
				"path": null,
				"component": null,
				"authority": null,
				"redirect": null,
				"code": null,
				"type": null,
				"title": "订单管理",
				"sort": null
			},
			{
				"id": 3,
				"parentId": 1,
				"children": [

				],
				"icon": null,
				"name": "免打扰管理",
				"url": null,
				"spread": false,
				"path": null,
				"component": null,
				"authority": null,
				"redirect": null,
				"code": null,
				"type": null,
				"title": "免打扰管理",
				"sort": null
			}
		],
		"icon": null,
		"name": "我的工作台",
		"url": null,
		"spread": false,
		"path": null,
		"component": null,
		"authority": null,
		"redirect": null,
		"code": null,
		"type": null,
		"title": "我的工作台",
		"sort": null
	},  {
		"id": 5,
		"parentId": -1,
		"children": [
		  
		],
		"icon": null,
		"name": "价格管理",
		"url": null,
		"spread": false,
		"path": null,
		"component": null,
		"authority": null,
		"redirect": null,
		"code": null,
		"type": null,
		"title": "价格管理",
		"sort": null
	  },
	  {
		"id": 7,
		"parentId": -1,
		"children": [
		  
		],
		"icon": null,
		"name": "用户管理",
		"url": null,
		"spread": false,
		"path": null,
		"component": null,
		"authority": null,
		"redirect": null,
		"code": null,
		"type": null,
		"title": "用户管理",
		"sort": null
	  },
	  {
		"id": 8,
		"parentId": -1,
		"children": [
		  
		],
		"icon": null,
		"name": "角色管理",
		"url": null,
		"spread": false,
		"path": null,
		"component": null,
		"authority": null,
		"redirect": null,
		"code": null,
		"type": null,
		"title": "角色管理",
		"sort": null
	  },
	  {
		"id": 9,
		"parentId": -1,
		"children": [
		  {
			"id": 10,
			"parentId": 9,
			"children": [
			  
			],
			"icon": null,
			"name": "用户端首页配置",
			"url": null,
			"spread": false,
			"path": null,
			"component": null,
			"authority": null,
			"redirect": null,
			"code": null,
			"type": null,
			"title": "用户端首页配置",
			"sort": null
		  }
		],
		"icon": null,
		"name": "资源管理",
		"url": null,
		"spread": false,
		"path": null,
		"component": null,
		"authority": null,
		"redirect": null,
		"code": null,
		"type": null,
		"title": "资源管理",
		"sort": null
	  }]

export const getMenuTreeData = req => {
	req = JSON.parse(req.body)
	return {
		code: 200,
		data: TREE_MAP,
		msg: ''
	}
}

