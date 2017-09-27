export function getNewObj(obj){
	var newObj = Array.isArray(obj)?[]:{};
	for(var property in obj){
		if(typeof obj[property] == 'object'){
			newObj[property] = getNewObj(obj[property])
		} else {
			newObj[property] = obj[property]
		}
	}
	return newObj
}