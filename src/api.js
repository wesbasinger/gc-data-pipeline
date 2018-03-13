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
    },
    
    getAllCourseWork : async (courseId) => {
        
        const results = [];
        
        const options = {courseId: courseId, pageSize: 50}
        
        do {
            
            const request = await window.gapi.client.classroom.courses.courseWork.list(options);
            
            request.result.courseWork.forEach((cw) => {
                if(cw.assigneeMode === 'ALL_STUDENTS' && cw.state === 'PUBLISHED' && cw.workType === 'ASSIGNMENT') {
                    results.push(cw);
                }
            })
            
            options.pageToken = request.result.nextPageToken;
        } while(options.pageToken);
        
        return results
    }
}