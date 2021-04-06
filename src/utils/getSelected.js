export const getSelected = (team,currentSunday,role)=>{
   const selected = team.filter(({sunday})=>{ 
        return sunday === currentSunday        
    })
    return selected[0][role]
}
export default getSelected