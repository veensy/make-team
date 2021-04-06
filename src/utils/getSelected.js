export const getSelected = (team,currentSunday,role)=>{
   const selected = team.filter(({sunday})=>{ 
        return sunday === currentSunday        
    })
    if(selected[0]?.[role] ){
        return selected[0][role] 
    }
    return
}
export default getSelected