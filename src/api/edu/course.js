import request from "@utils/request";

const BASE_URL = "/admin/edu/course";

// 获取所有课程管理列表
export function reqAllCourse() {
	return request({
		url: `${BASE_URL}`,
		method: "GET",
	});
}
