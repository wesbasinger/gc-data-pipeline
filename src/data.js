import stats from 'stats-lite';

export default {
    analyseStates : (submissions) => {
        
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
        
        const percentNew = Math.round((states['NEW'] / submissions.length)*100);
        const percentCreated = Math.round((states['CREATED'] / submissions.length)*100);
        const percentTurnedIn = Math.round((states['TURNED_IN'] / submissions.length)*100);
        const percentReturned = Math.round((states['RETURNED'] / submissions.length)*100);
        const percentUnsubmitted = Math.round((states['RECLAIMED_BY_STUDENT'] / submissions.length)*100);
        
        const summary = `
            ${percentNew}% of assignments have not been accessed.  
            ${percentCreated}% of assignments have been opened, but not submitted.
            ${percentTurnedIn}% of assignments have been turned in, but not graded.
            ${percentReturned}% of assignments have been returned, most likely with a grade.
            ${percentUnsubmitted}% of assignments have been unsubmitted.`
            
        
        return summary;
        
    },
    
    analyseGrades: (submissions) => {
        
        const gradedSubmissions = submissions.filter((submission) => {
            return(submission.hasOwnProperty('assignedGrade'))
        })
        
        if(gradedSubmissions.length === 0) {
            
            return {
                success: false,
                message: 'There are no graded submissions available for analysis.'
            }
            
        } else {
            
            const extractedGrades = [];
            
            gradedSubmissions.forEach((submission) => {
                extractedGrades.push(submission.assignedGrade);
            })
            
            return {
                success: true,
                mean: stats.mean(extractedGrades),
                median: stats.median(extractedGrades),
                mode: stats.mode(extractedGrades),
                variance: stats.variance(extractedGrades),
                values: extractedGrades
            }
            
        }
        
    }
}