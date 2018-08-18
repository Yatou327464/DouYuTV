const searchValueReducer = (prevState=[],action={}) =>{
	
	// console.log('这是action')
	let{type,payload} = action;
	switch(type){
   		case "searchValueList":
   			console.log(11111)
   			return {...prevState,...payload};
   		default :
   			return prevState;
   }
}
export default searchValueReducer