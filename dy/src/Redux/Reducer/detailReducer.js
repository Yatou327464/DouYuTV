// 管理列表的reducer
const DetailReducer = (prevState={},action={})=>{
   let {type,payload} = action;//解构赋值 拿到对应value值
   switch(type){
   		case "detailPage":
   			// console.log("listReducer",payload);
   			return {...prevState,...payload};
   		default :
   			return prevState;
   }

   // return action.payload;
   // reducer 返回值是什么， store 存的状态就是什么
}

export default DetailReducer