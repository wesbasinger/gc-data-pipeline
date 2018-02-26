const funcs = {
    getCourses: (callback) => {
        const getPageOfCourses = (request, result) => {
            request.execute((resp) => {
                result = result.concat(resp.courses);
                const nextPageToken = resp.nextPageToken;
                if (nextPageToken) {
                    request = window.gapi.client.classroom.courses.list({
                        'pageToken': nextPageToken
                    });
                    getPageOfCourses(request, result);
                } else {
                    callback(result);
                }
            });
        };
        const request = window.gapi.client.classroom.courses.list();
        getPageOfCourses(request, []);
    }
}

export default funcs;