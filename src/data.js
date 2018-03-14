export default {
    getStatus : (submissions) => {
        
        const states = {
            // The student has never accessed this submission. Attachments are not returned and timestamps is not set.
            'NEW' : 0,
            // Has been created.
            'CREATED': 0,
            // Has been turned in to the teacher.
            'TURNED_IN' : 0,
            // Has been returned to the student.
            'RETURNED' : 0,
            // Student chose to "unsubmit" the assignment.
            'RECLAIMED_BY_STUDENT' : 0
        }
        
        submissions.forEach((submission) => {
            states[submission.state] ++
        })
        
        return states;
    }
}