export default {
    
    getAllCourses : async () => {
        
        const results = []
        
        const options = {pageSize:10}
        
        do {
            const request = await window.gapi.client.classroom.courses.list(options)
            
            request.result.courses.forEach((course) => {
                
                if(course.courseState === "ACTIVE") {
                    results.push(course);    
                }
                
            })
            options.pageToken = request.result.nextPageToken;
        } while(options.pageToken);
        
        return results;
    }
}