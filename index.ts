import { isObject, isString } from 'lodash-es'

export function isJSON(str: any, pass_object?: boolean) {
	if (pass_object && isObject(str)) return true

	if (!isString(str)) return false

	str = str.replace(/\s/g, '').replace(/\n|\r/, '')

	if (/^\{(.*?)\}$/.test(str)) return /"(.*?)":(.*?)/g.test(str)

	if (/^\[(.*?)\]$/.test(str)) {
		return str
			.replace(/^\[/, '')
			.replace(/\]$/, '')
			.replace(/},{/g, '}\n{')
			.split(/\n/)
			.map(function (s: any) {
				return isJSON(s)
			})
			.reduce(function (prev: any, curr: any): boolean {
				return !!curr
			})
	}

	return false
}

isJSON.strict = strict

function strict(str: string) {
	if (isObject(str)) {
		return true
	}

	try {
		return JSON.parse(str) && true
	} catch (ex) {
		return false
	}
}
