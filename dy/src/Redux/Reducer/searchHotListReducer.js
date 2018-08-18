// 管理列表的reducer
const searchHotListReducer = (prevState=[],action={})=>{
   let {type,payload} = action;//解构赋值 拿到对应value值
   // console.log(action)
   switch(type){
   		case "searchHotList":
   			return [...prevState,...payload];
   		default :
   			return prevState;
   }

}

export default searchHotListReducer